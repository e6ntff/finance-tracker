import { Col, Flex, List, Modal, Statistic } from 'antd';
import Item from 'antd/es/list/Item';
import { observer } from 'mobx-react-lite';
import React, { memo, useCallback } from 'react';
import { listStore } from 'utils/listStore';
import dayjs from 'dayjs';
import { userStore } from 'utils/userStore';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import constants from 'settings/constants';
import Scrollbars from 'react-custom-scrollbars';
import { MyIcon, MyTitle } from './Items';
import { DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import ListItem from './ListItem';

interface Props {
	opened: boolean;
	setOpened: (arg0: boolean) => void;
	itemIds: string[];
}

const ItemsModal: React.FC<Props> = observer(
	({ opened, setOpened, itemIds }) => {
		const { list, replaceItem } = listStore;
		const { isSmallScreen } = userStore;
		const { userOptions } = optionsStore;

		const { language } = userOptions;

		const deleteCategoryFromItem = useCallback(
			(key: string) => {
				replaceItem(key, {
					...list[key],
					categoryId: constants.emptyItem.categoryId,
				});
			},
			[list, replaceItem]
		);

		return (
			<Modal
				open={opened}
				onCancel={() => {
					setOpened(false);
				}}
				okButtonProps={{ style: { display: 'none' } }}
				cancelButtonProps={{ style: { display: 'none' } }}
			>
				<Scrollbars
					autoHide
					style={{ blockSize: '75vh' }}
				>
					<List>
						{itemIds.map((key: string) => (
							<Item key={key}>
								<Col span={5}>
									<Statistic
										value={dayjs(list[key].date).format('DD.MM.YY')}
										style={{
											scale: isSmallScreen ? '.75' : '1',
										}}
									/>
								</Col>
								<Col span={10}>
									<Flex
										justify='center'
										style={{
											opacity: !list[key].title ? '.5' : '1',
										}}
									>
										{MyTitle(
											list[key].title,
											list[key].type,
											isSmallScreen,
											language,
											false
										)}
									</Flex>
								</Col>
								<Col span={2}>
									{MyIcon(ExportOutlined, isSmallScreen, {
										light: true,
										title: (
											<ListItem
												initialItem={{ id: key, overlaps: [] as number[][] }}
												mode='grid'
											/>
										),
									})}
								</Col>
								<Col span={2}>
									{MyIcon(
										DeleteOutlined,
										isSmallScreen,

										{
											onClick: () => deleteCategoryFromItem(key),
											title: languages.delete[language],
										}
									)}
								</Col>
							</Item>
						))}
					</List>
				</Scrollbars>
			</Modal>
		);
	}
);

export default memo(ItemsModal);
