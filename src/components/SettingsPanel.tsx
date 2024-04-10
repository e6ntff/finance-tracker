import { SettingOutlined } from '@ant-design/icons';
import { Drawer, FloatButton } from 'antd';
import { observer } from 'mobx-react-lite';
import Settings from 'pages/Settings';
import React, { useCallback, useState } from 'react';
import { optionsStore } from 'utils/optionsStore';
import AppTour from './AppTour';

const SettingsPanel: React.FC = observer(() => {
	const { userOptions } = optionsStore;

	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

	const openMenu = useCallback(() => {
		setIsMenuOpened(true);
	}, [setIsMenuOpened]);

	const closeMenu = useCallback(() => {
		setIsMenuOpened(false);
	}, [setIsMenuOpened]);

	return (
		<>
			<Drawer
				destroyOnClose
				open={isMenuOpened}
				onClose={closeMenu}
			>
				<Settings close={closeMenu} />
			</Drawer>
			<FloatButton
				type={userOptions.theme === 'default' ? 'default' : 'primary'}
				onClick={openMenu}
				icon={<SettingOutlined />}
			/>
			<AppTour
				open={openMenu}
				close={closeMenu}
			/>
		</>
	);
});

export default SettingsPanel;
