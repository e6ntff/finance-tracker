import { QuestionOutlined, SettingOutlined } from '@ant-design/icons';
import { Drawer, FloatButton, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import Settings from 'pages/Settings';
import React, { useCallback, useState } from 'react';
import { optionsStore } from 'utils/optionsStore';
import Ticker from './Ticker';
import AppTour from './AppTour';

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
				<Settings toggleOpened={toggleIsMenuOpened} />
			</Drawer>
			<FloatButton.Group>
				<Tooltip
					title={<Ticker />}
					placement='left'
					color='#aaa3'
				>
					<FloatButton
						type={userOptions.theme === 'default' ? 'default' : 'primary'}
						icon={<QuestionOutlined />}
					/>
				</Tooltip>
				<FloatButton
					type={userOptions.theme === 'default' ? 'default' : 'primary'}
					onClick={toggleIsMenuOpened}
					icon={<SettingOutlined />}
				/>
			</FloatButton.Group>
			<AppTour toggleOpened={toggleIsMenuOpened} />
		</>
	);
});

export default SettingsPanel;
