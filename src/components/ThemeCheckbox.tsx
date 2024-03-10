import React from 'react';
import { Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';

const ThemeCheckbox: React.FC = observer(() => {
	const { theme, toggleTheme } = userStore;

	return (
		<Switch
			checked={theme === 'dark'}
			onChange={toggleTheme}
		/>
	);
});

export default ThemeCheckbox;
