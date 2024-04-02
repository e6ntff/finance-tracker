import { DatabaseOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import uniqid from 'uniqid';
import dayjs from 'dayjs';
import calculatePrices from 'utils/calculatePrices';
import { ExpenseItem, category } from 'settings/interfaces';
import constants from 'settings/constants';

const RandomizeButton: React.FC = observer(() => {
	const { isSmallScreen, currencyRates } = userStore;
	const { userOptions } = optionsStore;
	const { setList } = listStore;
	const { setCategories } = categoryStore;

	const { language } = userOptions;

	const getRandomColor = useCallback(() => {
		const [r, g, b] = new Array(3).fill(undefined).map(() =>
			Math.floor(Math.random() * 256)
				.toString(16)
				.padStart(2, '0')
		);
		return `#${r}${g}${b}`;
	}, []);

	const getRandomCategoryId = useCallback(
		(categories: { [key: string]: category }) => {
			const ids = Object.keys(categories);

			const randomId = ids[Math.floor(Math.random() * ids.length)];

			return categories[randomId].deleted ? '0' : randomId;
		},
		[]
	);

	const addRandomData = useCallback(() => {
		const itemsValue = 500;
		const categoriesValue = 10;
		const deletedItemsValue = 15;
		const deletedCategoriesValue = 3;

		const newItems: { [key: string]: ExpenseItem } = {};
		const newCategories: { [key: string]: category } = {
			'0': constants.defaultCategory,
		};

		new Array(categoriesValue)
			.fill(undefined)
			.forEach((_: undefined, index: number) => {
				const id = uniqid();

				const name = `Category ${index}`;

				const color = getRandomColor();

				newCategories[id] = {
					name: name,
					color: color,
					deleted: categoriesValue - index - 1 < deletedCategoriesValue,
				};
			});

		new Array(itemsValue)
			.fill(undefined)
			.forEach((_: undefined, index: number) => {
				const categoryId = getRandomCategoryId(newCategories);

				const date: number =
					Math.random() *
						(dayjs('2023-12-31').valueOf() - dayjs('2021-01-01').valueOf()) +
					dayjs('2020-01-01').valueOf();

				const prices = calculatePrices(
					{ USD: Math.random() * 1501, EUR: 0, RUB: 0 },
					currencyRates,
					'USD'
				);

				const id = uniqid();

				newItems[id] = {
					deleted: index < deletedItemsValue,
					title: '',
					price: prices,
					categoryId: categoryId,
					date: date,
					createdAt: date,
				};
			});

		setList(newItems);
		setCategories(newCategories);
	}, [
		setList,
		setCategories,
		currencyRates,
		getRandomCategoryId,
		getRandomColor,
	]);

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
