import React, { memo, useEffect, useMemo, useState } from 'react';
import ListItem from './ListItem';
import { ExpenseItem, ListOptions } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Button, Col, Empty, List, Row } from 'antd';
import { getListToShowOnCurrentPageIds } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import { optionsStore } from 'utils/optionsStore';
import useDebounce from 'hooks/useDebounce';
import LargeSpin from './LargeSpin';
import { categoryStore } from 'utils/categoryStore';
import calculatePrices from 'utils/calculatePrices';
import { listStore } from 'utils/listStore';

interface Props {
	filteredListIds: string[];
}

const ItemList: React.FC<Props> = observer(({ filteredListIds }) => {
	const { width, loading } = userStore;
	const { listOptions } = optionsStore;

	const debouncedOptions: ListOptions = useDebounce(listOptions);

	const [colNumber, setColNumber] = useState<number>(4);

	useEffect(() => {
		if (width < 350) {
			setColNumber(1);
			return;
		}
		if (width < 450) {
			setColNumber(2);
			return;
		}
		if (width < 850) {
			setColNumber(3);
			return;
		}
		setColNumber(4);
	}, [setColNumber, width]);

	const listToShowOnCurrentPageIds = useMemo(
		() => getListToShowOnCurrentPageIds(debouncedOptions, filteredListIds),
		[filteredListIds, debouncedOptions]
	);

	const splittedListIds = useMemo(() => {
		const result: string[][] = [];
		let row = -1;

		listToShowOnCurrentPageIds.forEach((key: string, col: number) => {
			if (col % colNumber === 0) {
				row++;
				result.push([]);
			}
			result[row].push(key);
		});

		return result;
	}, [colNumber, listToShowOnCurrentPageIds]);

	return (
		<>
			<Button
				onClick={() => {
					const data: { [key: string]: ExpenseItem } = {};
					new Array(500).fill(undefined).forEach(() => {
						const categoryId = Object.keys(categoryStore.categories)[
							Math.floor(
								Math.random() * Object.keys(categoryStore.categories).length
							)
						];

						const date: number =
							Math.random() *
								(new Date('2023-12-31').getTime() -
									new Date('2022-01-01').getTime()) +
							new Date('2020-01-01').getTime();

						const prices = calculatePrices(
							{ USD: Math.random() * 1501, EUR: 0, RUB: 0 },
							userStore.currencyRates,
							'USD'
						);

						const id = Math.random();

						data[id] = {
							title: '',
							price: prices,
							categoryId: categoryId,
							date: date,
							createdAt: date,
						};
					});

					listStore.setList(data);
				}}
			></Button>

			{loading ? (
				<LargeSpin />
			) : (
				!filteredListIds.length && (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={''}
					/>
				)
			)}
			{debouncedOptions.mode === 'list' ? (
				<List style={{ inlineSize: '100%' }}>
					{listToShowOnCurrentPageIds.map((key: string) => (
						<ListItem
							key={key}
							mode={debouncedOptions.mode}
							initialItemId={key}
						/>
					))}
				</List>
			) : (
				splittedListIds.map((keys: string[]) => (
					<Row
						key={keys[0]}
						gutter={16}
						style={{ inlineSize: '100%' }}
					>
						{keys.map((key: string) => (
							<Col
								key={key}
								span={24 / colNumber}
							>
								<ListItem
									mode={debouncedOptions.mode}
									initialItemId={key}
								/>
							</Col>
						))}
					</Row>
				))
			)}
		</>
	);
});

export default memo(ItemList);
