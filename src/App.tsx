import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppHeader from './components/Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './utils/firebase';
import AppRoutes from './components/AppRoutes';
import { observer } from 'mobx-react-lite';
import { Flex, Layout, Spin } from 'antd';
import { userStore } from 'utils/userStore';
import getCurrencyRates from 'utils/getCurrencyRates';
import { Content, Header } from 'antd/es/layout/layout';

const auth = getAuth(firebaseApp);

const App: React.FC = observer(() => {
	const { logged } = userStore;
	const { loading } = userStore;
	const { setCurrencyRates, setCurrency, setUser } = userStore;

	useEffect(() => {
		getCurrencyRates().then(setCurrencyRates);
		setCurrency(localStorage.getItem('currency') || 'USD');

		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			setUser(JSON.parse(JSON.stringify(authUser)) || {});
		});

		return () => unsubscribe();
	}, [setCurrency, setCurrencyRates, setUser]);

	return (
		<>
			{loading ? (
				<Flex
					justify='center'
					align='center'
				>
					<Flex
						style={{
							inlineSize: '100%',
							blockSize: '100%',
							position: 'absolute',
							inset: 0,
						}}
						justify='center'
						align='center'
					>
						<Spin />
					</Flex>
				</Flex>
			) : (
				<Router>
					<Layout>
						{logged && (
							<Header
								style={{
									position: 'sticky',
									inset: 0,
									zIndex: 1,
									marginInline: '2em',
									borderEndEndRadius: '0.5em',
									borderEndStartRadius: '0.5em',
								}}
							>
								<AppHeader />
							</Header>
						)}
						<Layout>
							<Layout
								style={{
									padding: '2em',
								}}
							>
								<Content
									style={{
										padding: '2em',
										margin: 'auto',
										inlineSize: `${logged ? '100%' : 'max-content'}`,
										background: '#fff',
										borderRadius: '0.5em',
									}}
								>
									<AppRoutes />
								</Content>
							</Layout>
						</Layout>
					</Layout>
				</Router>
			)}
		</>
	);
});

export default App;
