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
		>
			<AddCategory />
			<Divider />
			<CategoryList />
		</Flex>
	);
};

export default Categories;
