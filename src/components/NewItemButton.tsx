import React, { useCallback, useState } from 'react';
import { ExpenseItem } from '../settings/interfaces';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { listStore } from 'utils/listStore';
import ItemModal from './ItemModal';
import { PlusOutlined } from '@ant-design/icons';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';

const NewItemButton: React.FC = observer(() => {
	const { addItem } = listStore;
	const { isSmallScreen } = userStore;
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const toggleIsModalOpened = useCallback(() => {
		setIsModalOpened((prevValue: boolean) => !prevValue);
	}, [setIsModalOpened]);

	const addNewItem = useCallback(
		(item: ExpenseItem) => {
			const date = dayjs().valueOf();
			addItem({ ...item, createdAt: date });
			toggleIsModalOpened();
		},
		[addItem, toggleIsModalOpened]
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
				toggleOpened={toggleIsModalOpened}
				submitItem={addNewItem}
			/>
		</>
	);
});

export default NewItemButton;
