import React, { useCallback, useMemo } from 'react';
import LanguageSelect from '../components/LanguageSelect';
import CurrencySelect from '../components/CurrencySelect';
import { Button, Flex, Form, Popconfirm, Segmented } from 'antd';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';
import constants from 'settings/constants';
import { useNavigate } from 'react-router-dom';
import tour from 'settings/tour';
import RandomizeButton from 'components/RandomizeButton';
import LogOutButton from 'components/LogOutButton';
import Links from 'components/Links';

interface Props {
	close: () => void;
}

const Settings: React.FC<Props> = observer(({ close }) => {
	const navigate = useNavigate();
	const { userOptions, setCurrency, setTheme } = optionsStore;
	const { isSmallScreen, tourRefs, setIsTourStarted } = userStore;
	const { setUserList, list } = listStore;
	const { setUserCategories, categories } = categoryStore;

	const { language, currency, theme } = userOptions;

	const removeData = useCallback(() => {
		setUserList({});
		setUserCategories({ '0': constants.defaultCategory });
	}, [setUserCategories, setUserList]);

	const isButtonDisabled = useMemo(
		() =>
			Object.keys(list).length === 0 && Object.keys(categories).length === 1,
		[list, categories]
	);

	const startTour = useCallback(() => {
		setIsTourStarted(true);
		close();
		navigate(tour[0].page);
	}, [setIsTourStarted, close, navigate]);

	return (
		<Flex
			justify='center'
			ref={tourRefs[6]}
		>
			<Form
				size={isSmallScreen ? 'small' : 'middle'}
				layout='vertical'
				style={{ inlineSize: '50%' }}
			>
				<Form.Item>
					<Button onClick={startTour}>{languages.runTour[language]}</Button>
				</Form.Item>
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
				<Form.Item>
					<Popconfirm
						title={languages.removeAllConfirm[language]}
						onConfirm={removeData}
					>
						<Button
							size={isSmallScreen ? 'small' : 'middle'}
							disabled={isButtonDisabled}
						>
							{languages.removeAll[language]}
						</Button>
					</Popconfirm>
				</Form.Item>
				<Form.Item>
					<RandomizeButton />
				</Form.Item>
				<Form.Item>
					<LogOutButton close={close} />
				</Form.Item>
				<Form.Item>
					<Links />
				</Form.Item>
			</Form>
		</Flex>
	);
});

export default Settings;
