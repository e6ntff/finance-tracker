import React from 'react';
import AddForm from '../components/AddForm';
import ItemList from '../components/ItemList';
import { Flex } from 'antd';

const Expenses: React.FC = () => {
	return (
		<Flex
			vertical
			gap={16}
			align='center'
		>
			<AddForm />
			<ItemList />
		</Flex>
	);
};

export default Expenses;
