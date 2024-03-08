import React, { useMemo, useState, useCallback } from 'react';
import getSymbol from '../utils/getSymbol';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { listStore } from 'utils/listStore';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import Title from 'antd/es/typography/Title';
import DiagramBar from 'components/DiagramBar';
import { Flex } from 'antd';
import DiagramPie from 'components/DiagramPie';

const Home: React.FC = observer(() => {
	const { list } = listStore;
	const { currency, language } = userStore;

	const [year, setYear] = useState<string | null>(null);

	const handleYearChanging = useCallback(
		(value: string | null) => {
			setYear(value);
		},
		[setYear]
	);

	const total = useMemo(
		() =>
			list.reduce(
				(acc: number, item: ExpenseItem) => acc + item.price[currency],
				0
			),
		[list, currency]
	);

	return (
		<Flex
			vertical
			gap={16}
		>
			<Title level={3}>{`${languages.total[language]}: ${getSymbol(
				currency
			)}${Math.round(total)}`}</Title>
			<Flex
				align='center'
				justify='space-between'
			>
				<DiagramBar
					list={list}
					interval='year'
					setInterval={handleYearChanging}
				/>
				<DiagramPie
					list={list}
					interval='year'
					intervalBig={null}
					intervalSmall={year}
				/>
			</Flex>
		</Flex>
	);
});

export default Home;
