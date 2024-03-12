import React from 'react';
import LanguageSelect from '../components/LanguageSelect';
import CurrencySelect from '../components/CurrencySelect';
import { Flex, Typography } from 'antd';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';

const Settings: React.FC = observer(() => {
	const { language, setLanguage, currency, setCurrency } = userStore;

	return (
		<Flex justify='center'>
			<Flex
				vertical
				gap={16}
				style={{ inlineSize: '10em' }}
			>
				<Flex
					vertical
					justify='space-between'
					align='stretch'
					gap={8}
				>
					<Typography.Text>{languages.language[language]}</Typography.Text>
					<LanguageSelect
						value={language}
						onChange={setLanguage}
					/>
				</Flex>
				<Flex
					vertical
					justify='space-between'
					align='stretch'
					gap={8}
				>
					<Typography.Text>{languages.currency[language]}</Typography.Text>
					<CurrencySelect
						value={currency}
						onChange={setCurrency}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
});

export default Settings;
