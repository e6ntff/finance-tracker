import React from 'react';
import AddForm from '../components/AddForm';
import ItemList from '../components/ItemList';
import { Divider, Flex } from 'antd';

const Expenses: React.FC = () => {
	return (
		<Flex
			vertical
			gap={16}
			align='center'
		>
			<AddForm />
			<Divider />
			<ItemList />
		</Flex>
	);
};

export default Expenses;
