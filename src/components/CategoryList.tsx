import React, { memo, useEffect, useMemo, useState } from 'react';
import CategoryItem from './CategoryItem';
import { category } from '../settings/interfaces';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { Col, Flex, Row, Spin } from 'antd';
import { userStore } from 'utils/userStore';

const CategoryList: React.FC = observer(() => {
	const { categories, loading } = categoryStore;
	const { width } = userStore;

	const [colNumber, setColNumber] = useState<number>(4);

	useEffect(() => {
		if (width < 300) {
			setColNumber(1);
			return;
		}
		if (width < 400) {
			setColNumber(2);
			return;
		}
		if (width < 600) {
			setColNumber(3);
			return;
		}
		setColNumber(4);
	}, [setColNumber, width]);

	const splittedCategories = useMemo(() => {
		const result: category[][] = [];
		let row = -1;

		categories
			.slice(1)
			.reverse()
			.forEach((item: category, col: number) => {
				if (col % colNumber === 0) {
					row++;
					result.push([]);
				}
				result[row].push(item);
			});

		return result;
	}, [colNumber, categories]);

	return (
		<Flex
			style={{ inlineSize: '100%' }}
			vertical
			gap={16}
		>
			{loading ? (
				<Spin />
			) : (
				splittedCategories.map((categories: category[]) => (
					<Row
						style={{ inlineSize: '100%' }}
						key={categories[0].id}
						gutter={16}
					>
						{categories.map((category: category) => (
							<Col
								key={category.id}
								span={24 / colNumber}
							>
								<CategoryItem initialCategory={category} />
							</Col>
						))}
					</Row>
				))
			)}
		</Flex>
	);
});

export default memo(CategoryList);
