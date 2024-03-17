import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from 'utils/userStore';
import { language } from 'settings/interfaces';
import { Select } from 'antd';

interface Props {
	value: language;
	onChange: (arg0: language) => void;
}

const LanguageSelect: React.FC<Props> = observer(() => {
	const { language, setLanguage, isSmallScreen } = userStore;

	useEffect(() => {
		const storedLanguage = localStorage.getItem('lang');
		if (storedLanguage !== null) {
			setLanguage(storedLanguage as language);
		}
	}, [setLanguage]);

	const handleLanguageChange = useCallback(
		(value: language) => {
			setLanguage(value);
			localStorage.setItem('lang', value);
		},
		[setLanguage]
	);

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			value={language}
			onChange={handleLanguageChange}
		>
			<Select.Option value='en'>English</Select.Option>
			<Select.Option value='ru'>Русский</Select.Option>
		</Select>
	);
});

export default LanguageSelect;
