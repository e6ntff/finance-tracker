import React, { useCallback, useMemo, useState } from 'react';
import { getTodayDate } from 'utils/utils';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { listStore } from 'utils/listStore';
import constants from 'settings/constants';
import ItemModal from './ItemModal';

const NewItemButton: React.FC = observer(() => {
	const { addItem } = listStore;

	const emptyItem: ExpenseItem = useMemo(
		() => constants.getEmptyItem(getTodayDate),
		[]
	);
	
	const [newItem, setNewItem] = useState<ExpenseItem>(emptyItem);
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	const clearItem = useCallback(() => {
		setNewItem({ ...emptyItem, id: Math.random() });
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
			<Button onClick={toggleIsModalOpened}>123</Button>
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
