import { FallOutlined, MinusOutlined, RiseOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { SegmentedOptions } from 'antd/es/segmented';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { ListType } from 'settings/interfaces';
import { userStore } from 'utils/userStore';

interface Props {
	type: ListType;
	onChange: (arg0: ListType) => void;
	extra?: boolean;
}

const TypeSelect: React.FC<Props> = observer(({ type, onChange, extra }) => {
	const { isSmallScreen } = userStore;

	const options: SegmentedOptions<ListType> = useMemo(() => {
		const options = [
			{
				label: <FallOutlined />,
				value: 'expense' as ListType,
			},
			{
				label: <RiseOutlined />,
				value: 'income' as ListType,
			},
		];

		extra &&
			options.splice(1, 0, {
				label: <MinusOutlined />,
				value: 'all' as ListType,
			});

		return options;
	}, [extra]);

	return (
		<Segmented
			size={isSmallScreen ? 'small' : 'middle'}
			value={type}
			onChange={onChange}
			options={options}
		/>
	);
});

export default TypeSelect;
