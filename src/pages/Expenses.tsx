import React from 'react';
import NewItemButton from '../components/NewItemButton';
import ItemList from '../components/ItemList';
import { Divider, Flex } from 'antd';

const Expenses: React.FC = () => (
	<Flex
		vertical
		gap={16}
		align='center'
	>
		<NewItemButton />
		<Divider />
		<ItemList />
	</Flex>
);

export default Expenses;
