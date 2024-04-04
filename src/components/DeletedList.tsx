import { Avatar, Col, Flex, Image, List, Tooltip, Typography } from 'antd';
import Item from 'antd/es/list/Item';
import Title from 'antd/es/typography/Title';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import languages from 'settings/languages';
import { listStore } from 'utils/listStore';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import dayjs from 'dayjs';
import {
	ExportOutlined,
	FrownOutlined,
	InfoCircleOutlined,
	UndoOutlined,
} from '@ant-design/icons';
import ListItem from './ListItem';
import { categoryStore } from 'utils/categoryStore';
import CategoryItem from './CategoryItem';
import { MyCheckbox, MyDelete } from './Items';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface DeletedItems {
	list: string[];
	categories: string[];
}

interface Props {
	mode: 'item' | 'category';
	ids: string[];
}

const DeletedList: React.FC<Props> = observer(({ mode, ids }) => {
	const { userList, restoreItem, deleteItem, listTemplate } = listStore;
	const {
		userCategories,
		restoreCategory,
		deleteCategory,
		categoriesTemplate,
	} = categoryStore;
	const { isSmallScreen, isTourStarted } = userStore;
	const { userOptions } = optionsStore;

	const { language } = userOptions;

	const list = useMemo(
		() => (isTourStarted ? listTemplate : userList),
		[isTourStarted, listTemplate, userList]
	);

	const categories = useMemo(
		() => (isTourStarted ? categoriesTemplate : userCategories),
		[isTourStarted, userCategories, categoriesTemplate]
	);

	const [selectedItemIds, setSelectedItemIds] = useState<DeletedItems>({
		list: [],
		categories: [],
	});

	const deleteSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: DeletedItems) => {
			prevSelected.list.forEach((key: string) => {
				deleteItem(key);
			});
			prevSelected.categories.forEach((key: string) => {
				deleteCategory(key);
			});
			return { list: [], categories: [] };
		});
	}, [deleteItem, deleteCategory]);

	const restoreSelectedItems = useCallback(() => {
		setSelectedItemIds((prevSelected: DeletedItems) => {
			prevSelected.list.forEach((key: string) => {
				restoreItem(key);
			});
			prevSelected.categories.forEach((key: string) => {
				restoreCategory(key);
			});
			return { list: [], categories: [] };
		});
	}, [restoreItem, restoreCategory]);

	const handleItemSelection = useCallback(
		(id: string) => (event: CheckboxChangeEvent) => {
			const value = event.target.checked;
			value
				? setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						list: [...prevSelected.list, id],
				  }))
				: setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						list: prevSelected.list.filter((item: string) => item !== id),
				  }));
		},
		[setSelectedItemIds]
	);

	const handleCategorySelection = useCallback(
		(id: string) => (event: CheckboxChangeEvent) => {
			const value = event.target.checked;
			value
				? setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						categories: [...prevSelected.categories, id],
				  }))
				: setSelectedItemIds((prevSelected: DeletedItems) => ({
						...prevSelected,
						categories: prevSelected.categories.filter(
							(item: string) => item !== id
						),
				  }));
		},
		[setSelectedItemIds]
	);

	const TooltipJSX = (deletedAt: number | undefined) => (
		<Tooltip
			title={`${languages.deletedAt[language]} ${dayjs(deletedAt).format(
				'HH:mm:ss DD.MM.YY'
			)}`}
		>
			<InfoCircleOutlined
				style={{
					scale: isSmallScreen ? '1' : '1.5',
				}}
			/>
		</Tooltip>
	);

	const RestoreJSX = (key: string, restore: (arg0: string) => void) => (
		<Tooltip title={languages.restore[language]}>
			<UndoOutlined
				onClick={() => restore(key)}
				style={{ scale: isSmallScreen ? '1' : '1.5' }}
			/>
		</Tooltip>
	);

	const ViewJSX = (key: string) => (
		<Tooltip
			placement='left'
			color='#0005'
			title={
				mode === 'item' ? (
					<ListItem
						disabled
						mode='grid'
						initialItemId={key}
						handleSelection={handleItemSelection(key)}
						deleteAll={deleteSelectedItems}
						selected={selectedItemIds.list.includes(key)}
					/>
				) : (
					<CategoryItem
						initialCategoryId={key}
						disabled
					/>
				)
			}
		>
			<ExportOutlined style={{ scale: isSmallScreen ? '1' : '1.5' }} />
		</Tooltip>
	);

	const ImageJSX = (image: string | undefined) => (
		<Avatar
			style={{ background: mode === 'category' ? image : '' }}
			icon={
				mode === 'item' &&
				(image ? (
					<Flex
						style={{
							inlineSize: '100%',
							blockSize: '100%',
							objectFit: 'cover',
						}}
					>
						<Image
							preview={false}
							src={image}
							style={{
								inlineSize: '100%',
								blockSize: '100%',
								objectFit: 'cover',
							}}
						/>
					</Flex>
				) : (
					<FrownOutlined />
				))
			}
		/>
	);

	const TitleJSX = (title: string) => (
		<Flex
			justify='center'
			style={{
				opacity: !title ? '.5' : '1',
			}}
		>
			{isSmallScreen ? (
				<Typography.Text
					strong
					ellipsis
				>
					{title || languages.noTitle[language]}
				</Typography.Text>
			) : (
				<Title
					ellipsis
					level={3}
					style={{ margin: 0 }}
				>
					{title || languages.noTitle[language]}
				</Title>
			)}
		</Flex>
	);

	switch (mode) {
		case 'item':
			return (
				<List style={{ inlineSize: '100%' }}>
					{ids.map((key: string) => {
						const currentItem = isTourStarted ? listTemplate[key] : list[key];

						return (
							<Item key={key}>
								<Col span={1}>
									{MyCheckbox(
										selectedItemIds.list.includes(key),
										language,
										isSmallScreen,
										handleItemSelection(key),
										deleteSelectedItems,
										restoreSelectedItems
									)}
								</Col>
								<Col span={1}>{ImageJSX(currentItem?.image)}</Col>
								<Col span={10}>{TitleJSX(currentItem?.title)}</Col>
								<Col span={2}>{ViewJSX(key)}</Col>
								<Col span={2}>{TooltipJSX(currentItem?.deletedAt)}</Col>
								<Col span={2}>{RestoreJSX(key, restoreItem)}</Col>
								<Col span={2}>
									{MyDelete(
										languages.delete[userOptions.language],
										isSmallScreen,
										() => deleteItem(key)
									)}
								</Col>
							</Item>
						);
					})}
				</List>
			);

		case 'category':
			return (
				<List style={{ inlineSize: '100%' }}>
					{ids.map((key: string) => {
						const currentCategory = isTourStarted
							? categoriesTemplate[key]
							: categories[key];

						return (
							<Item key={key}>
								{MyCheckbox(
									selectedItemIds.categories.includes(key),
									language,
									isSmallScreen,
									handleCategorySelection(key),
									deleteSelectedItems,
									restoreSelectedItems
								)}
								<Col span={1}>{ImageJSX(currentCategory.color)}</Col>
								<Col span={10}>{TitleJSX(currentCategory.name)}</Col>
								<Col span={2}>{ViewJSX(key)}</Col>
								<Col span={2}>{TooltipJSX(currentCategory.deletedAt)}</Col>
								<Col span={2}>{RestoreJSX(key, restoreCategory)}</Col>
								<Col span={2}>
									{MyDelete(
										languages.delete[userOptions.language],
										isSmallScreen,
										() => deleteCategory(key)
									)}
								</Col>
							</Item>
						);
					})}
				</List>
			);
	}
});

export default DeletedList;
