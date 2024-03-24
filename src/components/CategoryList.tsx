import React, { memo, useEffect, useMemo, useState } from 'react';
import CategoryItem from './CategoryItem';
import { categoryStore } from 'utils/categoryStore';
import { observer } from 'mobx-react-lite';
import { Col, Empty, Flex, Row } from 'antd';
import { userStore } from 'utils/userStore';
import LargeSpin from './LargeSpin';

const CategoryList: React.FC = observer(() => {
	const { categories } = categoryStore;
	const { width, loading } = userStore;

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
		const result: string[][] = [];
		let row = -1;

		Object.keys(categories)
			.slice(1)
			.forEach((key: string, col: number) => {
				if (col % colNumber === 0) {
					row++;
					result.push([]);
				}
				result[row].push(key);
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
				<LargeSpin />
			) : Object.values(categories).length > 1 ? (
				splittedCategories.map((keys: string[]) => (
					<Row
						style={{ inlineSize: '100%' }}
						key={keys[0]}
						gutter={16}
					>
						{keys.map((key: string) => (
							<Col
								key={key}
								span={24 / colNumber}
							>
								<CategoryItem initialCategoryId={key} />
							</Col>
						))}
					</Row>
				))
			) : (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={''}
				/>
			)}
		</Flex>
	);
});

export default memo(CategoryList);
