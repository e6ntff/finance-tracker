import React from 'react';
import { observer } from 'mobx-react-lite';
import { categoryStore } from 'utils/categoryStore';
import { Select } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { userStore } from 'utils/userStore';

interface Props {
	id: string;
	onChange: (arg0: string) => void;
}

const CategorySelect: React.FC<Props> = observer(({ id, onChange }) => {
	const { categories } = categoryStore;
	const { isSmallScreen } = userStore;

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			allowClear
			style={{ minInlineSize: '7em' }}
			onChange={onChange}
			value={id}
			suffixIcon={<EditFilled style={{ color: categories[id].color }} />}
		>
			{Object.keys(categories).map((key: string) => (
				<Select.Option
					key={key}
					value={key}
				>
					{categories[key].name}
				</Select.Option>
			))}
		</Select>
	);
});

export default CategorySelect;
