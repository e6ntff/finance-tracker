import { FrownOutlined } from '@ant-design/icons';
import {
	Avatar,
	Button,
	Checkbox,
	Flex,
	Image,
	Select,
	Statistic,
	Tag,
	Tooltip,
	Typography,
} from 'antd';
import {
	Chat,
	ListType,
	category,
	currencies,
	language,
} from 'settings/interfaces';
import languages from 'settings/languages';
import dayjs from 'dayjs';
import { getSymbolAndPrice } from 'utils/utils';
import React, { ComponentType, RefAttributes } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Search from 'antd/es/input/Search';
import uniqid from 'uniqid';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { TooltipPlacement, TooltipProps } from 'antd/es/tooltip';

const getTitleComponents = (
	title: string,
	type: ListType | null,
	isInOverlaps: boolean,
	isSmallScreen: boolean,
	editable: any,
	index?: number
): React.ReactNode => {
	return title === ' ' ? (
		<>&nbsp;</>
	) : (
		<Typography.Text
			type={type ? (type === 'expense' ? 'danger' : 'success') : undefined}
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
	title: string | undefined,
	type: ListType | null,
	isSmallScreen: boolean,
	language?: language,
	editable?: any,
	overlaps?: number[][]
) => {
	const markedTitles: React.ReactNode[] | undefined = overlaps
		? title?.split('').map((char, index) => {
				const isInOverlaps = overlaps.some(
					([start, end]) => index >= start && index <= end
				);
				return getTitleComponents(
					char,
					type,
					isInOverlaps,
					isSmallScreen,
					editable,
					index
				);
		  })
		: [
				getTitleComponents(
					title || (language && languages.noTitle[language]),
					type,
					false,
					isSmallScreen,
					editable
				),
		  ];

	return (
		<Flex
			key={uniqid()}
			style={{
				inlineSize: 'min-content',
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
	language?: language,
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
		<Tooltip title={language ? languages.noImage[language] : ''}>
			<Avatar
				style={{ cursor: 'pointer' }}
				onClick={toggleOpened}
				icon={<FrownOutlined />}
			/>
		</Tooltip>
	);

export const MyDate = (
	date: number,
	isSmallScreen: boolean,
	extra?: number
) => (
	<Flex align='center'>
		<Statistic
			value={dayjs(date).format('DD.MM.YY')}
			style={{
				scale: isSmallScreen ? '.67' : '.75',
			}}
		/>
		{extra && (
			<>
				<Typography.Text strong>-</Typography.Text>
				<Statistic
					value={dayjs(extra).format('DD.MM.YY')}
					style={{
						scale: isSmallScreen ? '.67' : '.75',
					}}
				/>
			</>
		)}
	</Flex>
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
	type: ListType,
	isSmallScreen: boolean,
	currency: string,
	extra?: currencies
) => (
	<Flex justify='center'>
		<Typography.Text
			strong
			type={type === 'expense' ? 'danger' : 'success'}
			style={{ fontSize: isSmallScreen ? '1.25em' : '1.5em' }}
		>
			{getSymbolAndPrice(currency)}
			{Math.round(price[currency])}
		</Typography.Text>
		{extra && (
			<>
				<Typography.Text
					strong
					type={type === 'expense' ? 'danger' : 'success'}
					style={{ fontSize: isSmallScreen ? '1.25em' : '1.5em' }}
				>
					/
				</Typography.Text>
				<Typography.Text
					strong
					type={type === 'expense' ? 'danger' : 'success'}
					style={{ fontSize: isSmallScreen ? '1.25em' : '1.5em' }}
				>
					{getSymbolAndPrice(currency)}
					{Math.round(extra[currency])}
				</Typography.Text>
			</>
		)}
	</Flex>
);

export const MyIcon = (
	Icon: ComponentType<
		Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
	>,
	isSmallScreen: boolean,
	extra: {
		onClick?: () => void;
		small?: boolean;
		title?: string | React.JSX.Element;
		light?: boolean;
		placement?: TooltipPlacement;
		trigger?: TooltipProps['trigger'];
		avatar?: boolean;
	}
) => {
	const { onClick, small, title, light, placement, trigger, avatar } = extra;
	return (
		<Tooltip
			trigger={trigger}
			placement={placement}
			title={title}
			color={light ? '#0000' : undefined}
			overlayInnerStyle={{ padding: light ? '0' : '', boxShadow: 'none' }}
		>
			{avatar ? (
				<Avatar
					style={{ cursor: 'pointer' }}
					size={isSmallScreen ? 'small' : 'default'}
					onClick={onClick}
					icon={<Icon />}
				/>
			) : (
				<Icon
					onClick={onClick}
					style={{
						scale: small
							? isSmallScreen
								? '.75'
								: '1'
							: isSmallScreen
							? '1'
							: '1.25',
					}}
				/>
			)}
		</Tooltip>
	);
};

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

export const tooltipTitle = (
	createdAt: number | undefined,
	updatedAt: number | undefined,
	language: language
) => {
	if (!updatedAt) {
		return (
			<>
				{`${languages.createdAt[language]} ${dayjs(createdAt).format(
					'HH:mm:ss DD.MM.YY'
				)}`}
			</>
		);
	} else {
		return (
			<>
				{`${languages.createdAt[language]} ${dayjs(createdAt).format(
					'HH:mm:ss DD.MM.YY'
				)}`}
				<br></br>
				{`${languages.updatedAt[language]} ${dayjs(updatedAt).format(
					'HH:mm:ss DD.MM.YY'
				)}`}
			</>
		);
	}
};

export const addFriendToChatSelect = (
	isSmallScreen: boolean,
	handleChange: (
		value: null | string[],
		option:
			| {
					value: string;
					label: any;
			  }
			| {
					value: string;
					label: any;
			  }[]
	) => void,
	friends: { [key: string]: true },
	value: string[] | null,
	chatInfo?: Chat['info']
) => {
	const friendsToShow = chatInfo
		? Object.keys(friends).filter(
				(key: string) =>
					chatInfo?.members && !Object.keys(chatInfo?.members).includes(key)
		  )
		: Object.keys(friends);

	return (
		<Select
			mode='multiple'
			size={isSmallScreen ? 'small' : 'middle'}
			labelInValue
			onChange={handleChange}
			showSearch
			value={value}
			style={{ inlineSize: isSmallScreen ? '10em' : '15em' }}
			options={friendsToShow.map((key: string) => ({
				value: key,
				// label: usersInfo[key]?.nickname,
				label: key,
			}))}
		/>
	);
};
