import { SettingOutlined } from '@ant-design/icons';
import { Drawer, FloatButton } from 'antd';
import { observer } from 'mobx-react-lite';
import Settings from 'pages/Settings';
import React, { useCallback, useState } from 'react';
import { optionsStore } from 'utils/optionsStore';

const SettingsPanel: React.FC = observer(() => {
	const { userOptions } = optionsStore;

	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

	const toggleIsMenuOpened = useCallback(() => {
		setIsMenuOpened((prevValue: boolean) => !prevValue);
	}, [setIsMenuOpened]);

	return (
		<>
			<Drawer
				destroyOnClose
				open={isMenuOpened}
				onClose={toggleIsMenuOpened}
			>
				<Settings />
			</Drawer>
			<FloatButton
				type={userOptions.theme === 'default' ? 'default' : 'primary'}
				onClick={toggleIsMenuOpened}
				icon={<SettingOutlined />}
			/>
		</>
	);
});

export default SettingsPanel;
