import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './utils/firebase';
import AppRoutes from './components/AppRoutes';
import { observer } from 'mobx-react-lite';
import { ConfigProvider, Layout, theme } from 'antd';
import { userStore } from 'utils/userStore';
import getCurrencyRates from 'utils/getCurrencyRates';
import { Content, Header } from 'antd/es/layout/layout';
import { Scrollbars } from 'react-custom-scrollbars';
import constants from 'settings/constants';
import { getConfig } from 'settings/getConfig';
import { optionsStore } from 'utils/optionsStore';
import LargeSpin from 'components/LargeSpin';
import SettingsPanel from 'components/SettingsPanel';
import getData from 'utils/getData';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';

const auth = getAuth(firebaseApp);

const App: React.FC = observer(() => {
	const { logged, isSmallScreen, setWidth, setCurrencyRates, setUser } =
		userStore;
	const { userOptions, setCurrency, setTheme } = optionsStore;

	const { themeAlgorithm, currency } = userOptions;

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setWidth(
				window.innerWidth,
				window.innerWidth < constants.windowBreakpoint
			);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [setWidth]);

	useEffect(() => {
		if (logged) setIsLoaded(true);
		const loadingTimer = setTimeout(() => {
			setIsLoaded(true);
		}, constants.spinDelay);

		return () => clearTimeout(loadingTimer);
	}, [logged]);

	useEffect(() => {
		getCurrencyRates().then(setCurrencyRates);
		setCurrency(currency || 'USD');
		setTheme(
			(localStorage.getItem('theme') as 'default' | 'dark') || 'default'
		);

		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			setUser(JSON.parse(JSON.stringify(authUser)) || {});
			if (authUser && authUser.uid) {
				getData(authUser).then((data) => {
					if (data) {
						listStore.setList(data.list);
						categoryStore.setCategories(data.categories);
						categoryStore.setLoading(false);
						listStore.setLoading(false);
					}
				});
			}
		});

		return () => unsubscribe();
	}, [setCurrency, setCurrencyRates, setUser, setTheme, currency]);

	const { paddingLG, borderRadiusLG } = theme.useToken().token;

	return (
		<ConfigProvider theme={getConfig(isSmallScreen, themeAlgorithm)}>
			<Scrollbars autoHide>
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
												? `min(100%, ${
														constants.maxAppWidthSmall - paddingLG
												  }px)`
												: `min(100%, ${
														constants.maxAppWidthLarge - paddingLG
												  }px)`,
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
											? `min(100%, ${constants.maxAppWidthSmall - paddingLG}px)`
											: `min(100%, ${
													constants.maxAppWidthLarge - paddingLG
											  }px)`,
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
								<LargeSpin />
							</Layout>
						)}
					</Layout>
					<SettingsPanel />
				</Router>
			</Scrollbars>
		</ConfigProvider>
	);
});

export default App;
