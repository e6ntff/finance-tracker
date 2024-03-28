import React from 'react';
import LanguageSelect from '../components/LanguageSelect';
import CurrencySelect from '../components/CurrencySelect';
import { Flex, Form, Segmented } from 'antd';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

const Settings: React.FC = observer(() => {
	const { userOptions, setCurrency, setTheme } = optionsStore;
	const { isSmallScreen } = userStore;

	const { language, currency, theme } = userOptions;

	return (
		<Flex justify='center'>
			<Form
				size={isSmallScreen ? 'small' : 'middle'}
				layout='vertical'
				style={{ inlineSize: '50%' }}
			>
				<Form.Item label={languages.theme[language]}>
					<Segmented
						size={isSmallScreen ? 'small' : 'middle'}
						value={theme}
						onChange={setTheme}
						options={[
							{ label: <BulbOutlined />, value: 'default' },
							{ label: <BulbFilled />, value: 'dark' },
						]}
					/>
				</Form.Item>
				<Form.Item label={languages.language[language]}>
					<LanguageSelect />
				</Form.Item>
				<Form.Item label={languages.currency[language]}>
					<CurrencySelect
						value={currency}
						onChange={setCurrency}
					/>
				</Form.Item>
				<Form.Item label={languages.deleteDelay[language]}></Form.Item>
			</Form>
		</Flex>
	);
});

export default Settings;
