import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './utils/firebase';
import AppRoutes from './components/AppRoutes';
import { observer } from 'mobx-react-lite';
import { ConfigProvider, Flex, Layout, Spin, theme } from 'antd';
import { userStore } from 'utils/userStore';
import getCurrencyRates from 'utils/getCurrencyRates';
import { Content, Header } from 'antd/es/layout/layout';
import { Scrollbars } from 'react-custom-scrollbars';
import constants from 'settings/constants';
import { getConfig } from 'settings/getConfig';

const auth = getAuth(firebaseApp);

const App: React.FC = observer(() => {
	const { logged, setTheme, isSmallScreen, setIsSmallScreen } = userStore;
	const { themeAlgorithm } = userStore;
	const { setCurrencyRates, setCurrency, setUser } = userStore;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < constants.windowBreakpoint);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [setIsSmallScreen]);

	useEffect(() => {
		if (logged) setIsLoaded(true);
		const loadingTimer = setTimeout(() => {
			setIsLoaded(true);
		}, constants.spinDelay);

		return () => clearTimeout(loadingTimer);
	}, [logged]);

	useEffect(() => {
		getCurrencyRates().then(setCurrencyRates);
		setCurrency(localStorage.getItem('currency') || 'USD');
		setTheme(
			(localStorage.getItem('theme') as 'default' | 'dark') || 'default'
		);

		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			setUser(JSON.parse(JSON.stringify(authUser)) || {});
		});

		return () => unsubscribe();
	}, [setCurrency, setCurrencyRates, setUser, setTheme]);

	const { paddingLG, borderRadiusLG } = theme.useToken().token;

	return (
		<ConfigProvider theme={getConfig(isSmallScreen, themeAlgorithm)}>
			<Scrollbars
				autoHide
				autoHideTimeout={1000}
				autoHideDuration={200}
			>
				<Router>
					<Layout
						style={{
							margin: 'auto',
							minBlockSize: '100%',
							inlineSize: '100%',
							paddingInline: paddingLG,
						}}
					>
						{isLoaded ? (
							<>
								{logged && (
									<Header
										style={{
											inlineSize: isSmallScreen
												? 'min(100%, 560px)'
												: 'min(100%, 960px)',
											blockSize: 'unset',
											lineHeight: '3.5em',
											margin: 'auto',
											position: 'sticky',
											inset: 0,
											zIndex: 1,
											borderEndEndRadius: borderRadiusLG,
											borderEndStartRadius: borderRadiusLG,
											paddingInline: paddingLG,
										}}
									>
										<AppHeader />
									</Header>
								)}
								<Layout
									style={{
										inlineSize: isSmallScreen
											? 'min(100%, 560px)'
											: 'min(100%, 960px)',
										blockSize: '100%',
										margin: 'auto',
									}}
								>
									<Layout
										style={{
											padding: isSmallScreen ? 0 : paddingLG,
										}}
									>
										<Content
											style={{
												padding: paddingLG,
												margin: 'auto',
												inlineSize: `${logged ? '100%' : 'max-content'}`,
												blockSize: 'min-content',
												borderRadius: '0.5em',
											}}
										>
											<AppRoutes />
										</Content>
									</Layout>
								</Layout>
							</>
						) : (
							<Layout
								style={{
									position: 'absolute',
									inset: 0,
									zIndex: 1,
								}}
							>
								<Flex
									style={{ inlineSize: '100%', blockSize: '100%' }}
									justify='center'
									align='center'
								>
									<Spin />
								</Flex>
							</Layout>
						)}
					</Layout>
				</Router>
			</Scrollbars>
		</ConfigProvider>
	);
});

export default App;
