import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction } from 'react';
import { userStore } from 'utils/userStore';

interface Props {
	value: string;
	onChange: (event: any) => void;
	setCurrency?: Dispatch<SetStateAction<string>>;
}

const CurrencySelect: React.FC<Props> = observer(({ value, onChange }) => {
	const { isSmallScreen } = userStore;

	return (
		<Select
			size={isSmallScreen ? 'small' : 'middle'}
			value={value}
			onChange={onChange}
		>
			<Select.Option value='USD'>USD</Select.Option>
			<Select.Option value='EUR'>EUR</Select.Option>
			<Select.Option value='RUB'>RUB</Select.Option>
		</Select>
	);
});

export default CurrencySelect;
