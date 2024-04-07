import { FrownOutlined } from '@ant-design/icons';
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
import React, { ComponentType, RefAttributes } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Search from 'antd/es/input/Search';
import uniqid from 'uniqid';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { TooltipPlacement } from 'antd/es/tooltip';

const getTitleComponents = (
	title: string,
	isInOverlaps: boolean,
	isSmallScreen: boolean,
	editable: any,
	index?: number
): React.ReactNode => {
	return title === ' ' ? (
		<>&nbsp;</>
	) : (
		<Typography.Text
			style={{ fontSize: isSmallScreen ? '1em' : '1.25em' }}
			key={index || 0}
			editable={editable}
			ellipsis
			strong={isInOverlaps}
		>
			{title}
		</Typography.Text>
	);
};

export const MyTitle = (
	title: string,
	isSmallScreen: boolean,
	language: language,
	editable: any,
	overlaps?: number[][]
) => {
	const markedTitles: React.ReactNode[] = overlaps
		? title.split('').map((char, index) => {
				const isInOverlaps = overlaps.some(
					([start, end]) => index >= start && index <= end
				);
				return getTitleComponents(
					char,
					isInOverlaps,
					isSmallScreen,
					editable,
					index
				);
		  })
		: [
				getTitleComponents(
					title || languages.noTitle[language],
					false,
					isSmallScreen,
					editable
				),
		  ];

	return (
		<Flex
			key={uniqid()}
			justify='center'
			style={{
				inlineSize: '100%',
				opacity: !title ? '.5' : '1',
			}}
		>
			{markedTitles}
		</Flex>
	);
};

export const MyImage = (
	image: string | undefined,
	isSmallScreen: boolean,
	language: language,
	toggleOpened?: () => void
) =>
	image ? (
		<Tooltip
			color='#0005'
			placement='right'
			title={
				!image.startsWith('#') && (
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
				)
			}
		>
			<Avatar
				style={{
					cursor: 'pointer',
					background: image.startsWith('#') ? image : 'unset',
				}}
				size={isSmallScreen ? 'small' : 'default'}
				icon={
					<Flex
						style={{
							inlineSize: '100%',
							blockSize: '100%',
							objectFit: 'cover',
						}}
					>
						{!image.startsWith('#') && (
							<Image
								preview={false}
								src={image}
								style={{
									inlineSize: '100%',
									blockSize: '100%',
									objectFit: 'cover',
								}}
							/>
						)}
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

export const MyIconWithTooltip = (
	title: string | React.JSX.Element,
	isSmallScreen: boolean,
	Icon: ComponentType<
		Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
	>,
	light: boolean,
	onClick?: () => void,
	placement?: TooltipPlacement
) => (
	<Tooltip
		placement={placement}
		title={title}
		color={light ? '#0005' : undefined}
	>
		<Icon
			onClick={onClick}
			style={{ scale: isSmallScreen ? '1' : '1.25' }}
		/>
	</Tooltip>
);

export const MyCheckbox = (
	selected: boolean = false,
	language: language,
	isSmallScreen: boolean,
	handleSelection: (event: CheckboxChangeEvent) => void = () => {},
	deleteAll?: () => void,
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

export const MySearch = (
	onChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
	value: string,
	loading: boolean,
	isSmallScreen: boolean
) => (
	<Search
		size={isSmallScreen ? 'small' : 'middle'}
		allowClear
		onChange={onChange}
		value={value}
		loading={loading}
	/>
);
