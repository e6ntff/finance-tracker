import React, { useCallback, useMemo, useState } from 'react';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { listStore } from 'utils/listStore';
import constants from 'settings/constants';
import ItemModal from './ItemModal';
import { PlusOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';

const NewItemButton: React.FC = observer(() => {
	const { addItem } = listStore;
	const { isSmallScreen } = userStore;

	const emptyItem: ExpenseItem = useMemo(() => constants.emptyItem, []);

	const [newItem, setNewItem] = useState<ExpenseItem>(emptyItem);
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	const clearItem = useCallback(() => {
		setNewItem(emptyItem);
	}, [setNewItem, emptyItem]);

	const addNewItem = useCallback(
		(item: ExpenseItem) => {
			addItem(item);
			clearItem();
			toggleIsModalOpened();
		},
		[addItem, toggleIsModalOpened, clearItem]
	);

	return (
		<>
			<Button
				onClick={toggleIsModalOpened}
				size={isSmallScreen ? 'small' : 'middle'}
			>
				<PlusOutlined />
			</Button>
			<ItemModal
				opened={isModalOpened}
				initialItem={newItem}
				toggleOpened={toggleIsModalOpened}
				submitItem={addNewItem}
			/>
		</>
	);
});

export default NewItemButton;
