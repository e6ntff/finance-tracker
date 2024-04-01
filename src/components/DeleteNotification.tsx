import { UndoOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import constants from 'settings/constants';
import languages from 'settings/languages';
import { categoryStore } from 'utils/categoryStore';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

const DeleteNotification: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const {
		lastDeletedItemIds,
		clearListFromCategory,
		removeItem,
		setLastDeletedItemIds,
	} = listStore;
	const { lastDeletedCategoryId, removeCategory, setLastDeletedCategoryId } =
		categoryStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const [isDeleting, setIsDeleting] = useState<boolean>(true);

	const [api, contextHolder] = notification.useNotification({
		maxCount: 1,
	});

	const deleteCategory = useCallback(() => {
		removeCategory(lastDeletedCategoryId);
		clearListFromCategory(lastDeletedCategoryId);
		setIsDeleting(true);
	}, [removeCategory, clearListFromCategory, lastDeletedCategoryId]);

	const deleteItem = useCallback(() => {
		lastDeletedItemIds.forEach((key: string) => {
			removeItem(key);
		});
		setIsDeleting(true);
	}, [removeItem, lastDeletedItemIds]);

	const cancelDeleting = useCallback(() => {
		setIsDeleting(false);
		api.destroy();
		setLastDeletedCategoryId('');
		setLastDeletedItemIds([]);
	}, [setIsDeleting, api, setLastDeletedCategoryId, setLastDeletedItemIds]);

	const openNotification = useCallback(
		(text: string, deleteFunction: () => void) => {
			api.open({
				onClose: () => {
					isDeleting && deleteFunction();
				},
				message: <Typography.Text strong>{text}</Typography.Text>,
				description: (
					<Tooltip
						title={languages.undo[language]}
						zIndex={3000}
						placement='right'
					>
						<Button
							size={isSmallScreen ? 'small' : 'middle'}
							onClick={cancelDeleting}
						>
							<UndoOutlined />
						</Button>
					</Tooltip>
				),
				duration: constants.deleteDelay / 1000,
				type: 'warning',
				role: 'status',
				placement: 'bottomRight',
			});
		},
		[api, isSmallScreen, cancelDeleting, isDeleting, language]
	);

	useEffect(() => {
		setIsDeleting(true);
		lastDeletedItemIds.length &&
			openNotification(
				`${languages.itemsDeleted[language]}: ${lastDeletedItemIds.length}`,
				deleteItem
			);
		// eslint-disable-next-line
	}, [lastDeletedItemIds]);

	useEffect(() => {
		setIsDeleting(true);
		lastDeletedCategoryId &&
			openNotification(languages.categoryDeleted[language], deleteCategory);
		// eslint-disable-next-line
	}, [lastDeletedCategoryId]);

	return <>{contextHolder}</>;
});

export default DeleteNotification;