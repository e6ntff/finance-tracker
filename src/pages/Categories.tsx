import React from 'react';
import CategoryList from '../components/CategoryList';
import AddCategory from '../components/AddCategory';
import { Flex } from 'antd';

const Categories: React.FC = () => {
	return (
		<Flex
			vertical
			align='center'
			gap={16}
		>
			<AddCategory />
			<CategoryList />
		</Flex>
	);
};

export default Categories;
