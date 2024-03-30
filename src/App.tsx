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
import Notification from 'components/Notification';
import DeleteNotification from 'components/DeleteNotification';
import languages from 'settings/languages';

const auth = getAuth(firebaseApp);

const App: React.FC = observer(() => {
	const {
		logged,
		isSmallScreen,
		setIsSmallScreen,
		setCurrencyRates,
		setUser,
		setLoading,
		setStatus,
	} = userStore;
	const { setList } = listStore;
	const { setCategories } = categoryStore;
	const { userOptions, setCurrency, setTheme } = optionsStore;

	const { themeAlgorithm, currency, language } = userOptions;

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < constants.windowBreakpoint);
		};

		const handleOffline = () => {
			setStatus({ status: 'error', text: languages.offline[language] });
			window.addEventListener('online', handleOnline);
		};

		const handleOnline = () => {
			setStatus({ status: 'success', text: languages.online[language] });
		};

		window.addEventListener('offline', handleOffline);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
		// eslint-disable-next-line
	}, []);

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
				getData(authUser, setStatus).then((data) => {
					if (data) {
						setList(data.list, false);
						setCategories(data.categories, false);
						setLoading(false);
					}
				});
			}
		});

		return () => unsubscribe();
		// eslint-disable-next-line
	}, [setCurrency, setCurrencyRates, setUser, setTheme]);

	const { paddingLG, borderRadiusLG } = theme.useToken().token;

	return (
		<ConfigProvider theme={getConfig(isSmallScreen, themeAlgorithm)}>
			<Scrollbars autoHide>
				<Router>
					<Notification />
					<DeleteNotification />
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
											lineHeight: isSmallScreen ? '3.5em' : '4.5em',
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
