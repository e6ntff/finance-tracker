import React from 'react';
import { Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';

const ThemeCheckbox: React.FC = observer(() => {
	const { theme, toggleTheme, isSmallScreen } = userStore;

	return (
		<Switch
			size={isSmallScreen ? 'small' : 'default'}
			checked={theme === 'dark'}
			onChange={toggleTheme}
		/>
	);
});

export default ThemeCheckbox;
