import React from 'react';
import { Switch, theme } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';

const { defaultAlgorithm, darkAlgorithm } = theme;

const ThemeCheckbox: React.FC = observer(() => {
	const { theme, toggleTheme } = userStore;

	return (
		<Switch
			checked={theme.theme === 'dark'}
			onChange={toggleTheme}
		/>
	);
});

export default ThemeCheckbox;
