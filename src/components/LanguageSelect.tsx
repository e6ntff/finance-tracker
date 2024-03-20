import React from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { Select } from 'antd';
import { optionsStore } from 'utils/optionsStore';

const LanguageSelect: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { userOptions, setLanguage } = optionsStore;

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			value={userOptions.language}
			onChange={setLanguage}
		>
			<Select.Option value='en'>English</Select.Option>
			<Select.Option value='ru'>Русский</Select.Option>
		</Select>
	);
});

export default LanguageSelect;
