import React, { useCallback } from 'react';
import firebaseApp from '../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import constants from '../settings/constants';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';
import { Avatar, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const LogOutButton: React.FC = observer(() => {
	const { setLogged, isSmallScreen, setLoading } = userStore;
	const { setList } = listStore;
	const { setCategories } = categoryStore;
	const { resetOptions, userOptions } = optionsStore;
	const auth = getAuth(firebaseApp);

	const logOut = useCallback(async () => {
		try {
			await signOut(auth);
			setLogged(false);
			setLoading(true);
			setList({});
			setCategories({ 0: constants.defaultCategory });
			resetOptions();
			sessionStorage.clear();
		} catch (error: any) {
			alert(error.message);
		}
	}, [auth, setCategories, setList, setLogged, resetOptions, setLoading]);

	return (
		<Tooltip title={languages.logOut[userOptions.language]}>
			<Avatar
				style={{ background: '#0000', cursor: 'pointer' }}
				size={isSmallScreen ? 'small' : 'default'}
				onClick={logOut}
				icon={<LogoutOutlined />}
			/>
		</Tooltip>
	);
});

export default LogOutButton;
