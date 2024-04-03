import { DatabaseOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import { getRandomData } from 'utils/transformData';

const RandomizeButton: React.FC = observer(() => {
	const { isSmallScreen, currencyRates } = userStore;
	const { userOptions } = optionsStore;
	const { setList } = listStore;
	const { setCategories } = categoryStore;

	const { language } = userOptions;

	const addRandomData = useCallback(() => {
		const itemsValue = 500;
		const categoriesValue = 10;
		const deletedItemsValue = 15;
		const deletedCategoriesValue = 3;

		const data = getRandomData(
			itemsValue,
			categoriesValue,
			deletedItemsValue,
			deletedCategoriesValue,
			currencyRates
		);

		setList(data.items);
		setCategories(data.categories);
	}, [setList, setCategories, currencyRates]);

	return (
		<Tooltip title={languages.randomize[language]}>
			<Popconfirm
				title={languages.randomizeConfirm[language]}
				onConfirm={addRandomData}
			>
				<Avatar
					size={isSmallScreen ? 'small' : 'default'}
					style={{ cursor: 'pointer', background: '#0000' }}
				>
					<DatabaseOutlined />
				</Avatar>
			</Popconfirm>
		</Tooltip>
	);
});

export default RandomizeButton;
