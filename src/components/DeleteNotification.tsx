import { UndoOutlined } from '@ant-design/icons';
import { Button, Typography, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import constants from 'settings/constants';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

const DeleteNotification: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { lastDeletedItem, addItem, list, setList } = listStore;
	const { lastDeletedCategory, addCategory } = categoryStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [api, contextHolder] = notification.useNotification({
		maxCount: 1,
	});

	const closeNotification = useCallback(() => {
		api.destroy();
	}, [api]);

	const restoreItem = useCallback(() => {
		addItem(lastDeletedItem.item, lastDeletedItem.id);
		closeNotification();
	}, [lastDeletedItem, addItem, closeNotification]);

	const restoreCategory = useCallback(() => {
		addCategory(lastDeletedCategory.category, lastDeletedCategory.id);
		const newList = list;
		lastDeletedCategory.itemsWithCategoryIds.forEach((key: string) => {
			newList[key].categoryId = lastDeletedCategory.id;
		});
		setList(newList);
		closeNotification();
	}, [lastDeletedCategory, addCategory, closeNotification, list, setList]);

	const openNotification = useCallback(
		(text: string, title: string, restore: () => void) => {
			api.open({
				message: (
					<Typography.Text strong>{`${text}: ${title}`}</Typography.Text>
				),
				description: (
					<Button
						size={isSmallScreen ? 'small' : 'middle'}
						onClick={restore}
					>
						<UndoOutlined />
					</Button>
				),
				duration: constants.deleteDelay / 1000,
				type: 'warning',
				role: 'status',
				placement: 'bottomRight',
			});
		},
		[api, isSmallScreen]
	);

	useEffect(() => {
		lastDeletedItem.id &&
			openNotification(
				languages.itemDeleted[language],
				lastDeletedItem.item.title,
				restoreItem
			);
		// eslint-disable-next-line
	}, [lastDeletedItem]);

	useEffect(() => {
		lastDeletedCategory.id &&
			openNotification(
				languages.categoryDeleted[language],
				lastDeletedCategory.category.name,
				restoreCategory
			);
		// eslint-disable-next-line
	}, [lastDeletedCategory]);

	return <>{contextHolder}</>;
});

export default DeleteNotification;
