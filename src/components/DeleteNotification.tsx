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
	const { lastDeletedCategoryIds, removeCategory, setLastDeletedCategoryIds } =
		categoryStore;
	const { userOptions } = optionsStore;

	const { language, deleteConfirmation } = userOptions;

	const [isDeleting, setIsDeleting] = useState<boolean>(true);

	const [api, contextHolder] = notification.useNotification({
		maxCount: 1,
	});

	const deleteCategory = useCallback(() => {
		lastDeletedCategoryIds.forEach((key: string) => {
			removeCategory(key);
			clearListFromCategory(key);
		});
		setIsDeleting(true);
	}, [removeCategory, clearListFromCategory, lastDeletedCategoryIds]);

	const deleteItem = useCallback(() => {
		lastDeletedItemIds.forEach((key: string) => {
			removeItem(key);
		});
		setIsDeleting(true);
	}, [removeItem, lastDeletedItemIds]);

	const cancelDeleting = useCallback(() => {
		setIsDeleting(false);
		api.destroy();
		setLastDeletedCategoryIds([]);
		setLastDeletedItemIds([]);
	}, [setIsDeleting, api, setLastDeletedCategoryIds, setLastDeletedItemIds]);

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
		if (deleteConfirmation) {
			setIsDeleting(true);
			lastDeletedItemIds.length &&
				openNotification(
					`${languages.itemsDeleted[language]}: ${lastDeletedItemIds.length}`,
					deleteItem
				);
		} else {
			deleteItem();
		}
		// eslint-disable-next-line
	}, [lastDeletedItemIds]);

	useEffect(() => {
		if (deleteConfirmation) {
			setIsDeleting(true);
			lastDeletedCategoryIds.length &&
				openNotification(
					`${languages.categoriesDeleted[language]}: ${lastDeletedCategoryIds.length}`,
					deleteCategory
				);
		} else {
			deleteCategory();
		}
		// eslint-disable-next-line
	}, [lastDeletedCategoryIds]);

	return <>{contextHolder}</>;
});

export default DeleteNotification;
