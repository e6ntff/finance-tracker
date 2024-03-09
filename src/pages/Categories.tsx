import React from 'react';
import CategoryList from '../components/CategoryList';
import AddCategory from '../components/AddCategory';
import { Divider, Flex } from 'antd';

const Categories: React.FC = () => {
	return (
		<Flex
			vertical
			align='center'
			gap={16}
			style={{ inlineSize: 'min(100%, 560px)', margin: 'auto' }}
		>
			<AddCategory />
			<Divider />
			<CategoryList />
		</Flex>
	);
};

export default Categories;
