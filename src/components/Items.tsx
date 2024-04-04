import {
	DeleteOutlined,
	EditOutlined,
	FrownOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Button,
	Checkbox,
	Flex,
	Image,
	Statistic,
	Tag,
	Tooltip,
	Typography,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { category, currencies, language } from 'settings/interfaces';
import languages from 'settings/languages';
import dayjs from 'dayjs';
import { getSymbolAndPrice } from 'utils/utils';
import React from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

export const MyInfoTooltip = (
	title: string | React.JSX.Element,
	isSmallScreen: boolean,
	onClick?: () => void
) => (
	<Tooltip title={title}>
		<InfoCircleOutlined
			onClick={onClick}
			style={{
				scale: isSmallScreen ? '1' : '1.5',
			}}
		/>
	</Tooltip>
);

export const MyTitle = (
	title: string,
	isSmallScreen: boolean,
	language: language,
	editable: any
) => (
	<Flex
		justify='center'
		style={{
			inlineSize: '100%',
			opacity: !title ? '.5' : '1',
		}}
	>
		{isSmallScreen ? (
			<Typography.Text
				strong
				ellipsis
				editable={editable || false}
			>
				{title || languages.noTitle[language]}
			</Typography.Text>
		) : (
			<Title
				editable={editable || false}
				ellipsis
				level={3}
				style={{ margin: 0 }}
			>
				{title || languages.noTitle[language]}
			</Title>
		)}
	</Flex>
);

export const MyImage = (
	image: string | undefined,
	isSmallScreen: boolean,
	toggleOpened: () => void,
	language: language
) =>
	image ? (
		<Tooltip
			color='#0005'
			placement='right'
			title={
				<Image
					preview={false}
					src={image}
					style={{
						borderRadius: '50%',
						inlineSize: '100%',
						blockSize: '100%',
						objectFit: 'cover',
					}}
				/>
			}
		>
			<Avatar
				style={{ cursor: 'pointer' }}
				size={isSmallScreen ? 'small' : 'default'}
				icon={
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
				}
			/>
		</Tooltip>
	) : (
		<Tooltip title={languages.noImage[language]}>
			<Avatar
				style={{ cursor: 'pointer' }}
				onClick={toggleOpened}
				icon={<FrownOutlined />}
			/>
		</Tooltip>
	);

export const MyDate = (date: number, isSmallScreen: boolean) => (
	<Statistic
		value={dayjs(date).format('DD.MM.YY')}
		style={{
			scale: isSmallScreen ? '.67' : '.75',
		}}
	/>
);

export const MyCategory = (category: category) => (
	<Flex
		vertical
		align='stretch'
	>
		{category && (
			<Tag color={category.color}>
				<span
					style={{
						margin: 'auto',
						color: category.color,
						filter: 'invert(1)',
					}}
				>
					{category.name}
				</span>
			</Tag>
		)}
	</Flex>
);

export const MyPrice = (
	price: currencies,
	isSmallScreen: boolean,
	currency: string
) => (
	<Flex justify='center'>
		{isSmallScreen ? (
			<Typography.Text strong>
				{getSymbolAndPrice(currency)}
				{Math.round(price[currency])}
			</Typography.Text>
		) : (
			<Title
				level={3}
				style={{ margin: 0 }}
			>
				{getSymbolAndPrice(currency, price[currency])}
			</Title>
		)}
	</Flex>
);

export const MyEdit = (
	title: string,
	isSmallScreen: boolean,
	toggleOpened: () => void
) => (
	<Tooltip title={title}>
		<EditOutlined
			onClick={toggleOpened}
			style={{ scale: isSmallScreen ? '1' : '1.5' }}
		/>
	</Tooltip>
);

export const MyDelete = (
	title: string,
	isSmallScreen: boolean,
	onClick: () => void
) => (
	<Tooltip title={title}>
		<DeleteOutlined
			onClick={onClick}
			style={{ scale: isSmallScreen ? '1' : '1.5' }}
		/>
	</Tooltip>
);

export const MyCheckbox = (
	selected: boolean,
	language: language,
	isSmallScreen: boolean,
	handleSelection: (event: CheckboxChangeEvent) => void,
	deleteAll: () => void,
	restoreAll?: () => void
) => (
	<Tooltip
		color='#0000'
		title={
			selected ? (
				<Flex
					vertical
					gap={isSmallScreen ? 4 : 8}
				>
					<Button
						onClick={deleteAll}
						size={isSmallScreen ? 'small' : 'middle'}
					>
						{languages.deleteSelected[language]}
					</Button>
					{restoreAll && (
						<Button
							onClick={restoreAll}
							size={isSmallScreen ? 'small' : 'middle'}
						>
							{languages.restoreSelected[language]}
						</Button>
					)}
				</Flex>
			) : (
				''
			)
		}
	>
		<Checkbox
			onChange={handleSelection}
			checked={selected}
		/>
	</Tooltip>
);
