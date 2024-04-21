import { Button, Popconfirm } from 'antd';
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
	const { setUserList } = listStore;
	const { setUserCategories } = categoryStore;

	const { language } = userOptions;

	const addRandomData = useCallback(() => {
		const itemsValue = { expense: 200, income: 50 };
		const categoriesValue = { expense: 5, income: 5 };
		const deletedItemsValue = { expense: 20, income: 5 };
		const deletedCategoriesValue = { expense: 2, income: 2 };

		const data = getRandomData(
			itemsValue,
			categoriesValue,
			deletedItemsValue,
			deletedCategoriesValue,
			currencyRates
		);

		setUserList(data.items);
		setUserCategories(data.categories);
	}, [setUserList, setUserCategories, currencyRates]);

	return (
		<Popconfirm
			title={languages.randomizeConfirm[language]}
			onConfirm={addRandomData}
		>
			<Button size={isSmallScreen ? 'small' : 'middle'}>
				{languages.randomize[language]}
			</Button>
		</Popconfirm>
	);
});

export default RandomizeButton;
