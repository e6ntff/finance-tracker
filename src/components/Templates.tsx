import { Flex, List, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { getRandomData } from 'utils/transformData';
import { userStore } from 'utils/userStore';
import ListItem from './ListItem';
import CategoryItem from './CategoryItem';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';

interface Props {
	list: 'item' | 'category';
	mode?: 'list' | 'grid';
}

const Templates: React.FC<Props> = observer(({ list, mode }) => {
	const { tourRefs, currencyRates, isSmallScreen } = userStore;
	const { setListTemplate, listTemplate } = listStore;
	const { setCategoriesTemplate, categoriesTemplate } = categoryStore;

	useEffect(() => {
		const data = getRandomData(10, 10, 5, 3, currencyRates);
		setListTemplate(data.items);
		setCategoriesTemplate(data.categories);
	}, [currencyRates, setCategoriesTemplate, setListTemplate]);

	switch (list) {
		case 'item':
			return (
				<Flex
					ref={tourRefs[1]}
					style={{ inlineSize: '100%' }}
				>
					{mode === 'list' ? (
						<List style={{ inlineSize: '100%' }}>
							{Object.keys(listTemplate).map((key: string) => (
								<ListItem
									key={key}
									initialItemId={key}
									item={listTemplate[key]}
									mode={mode}
								/>
							))}
						</List>
					) : (
						<Space
							wrap
							size={isSmallScreen ? 8 : 16}
						>
							{Object.keys(categoriesTemplate).map((key: string) => (
								<ListItem
									key={key}
									initialItemId={key}
									item={listTemplate[key]}
									mode={mode || 'grid'}
								/>
							))}
						</Space>
					)}
				</Flex>
			);
		case 'category':
			return (
				<Flex
					ref={tourRefs[3]}
					style={{ inlineSize: '100%' }}
				>
					<Space
						wrap
						size={isSmallScreen ? 8 : 16}
					>
						{Object.keys(categoriesTemplate)
							.slice(1)
							.map((key: string) =>
								!categoriesTemplate[key].deleted ? (
									<CategoryItem
										key={key}
										initialCategoryId={key}
										category={categoriesTemplate[key]}
									/>
								) : (
									<></>
								)
							)}
					</Space>
				</Flex>
			);
	}
});

export default Templates;
