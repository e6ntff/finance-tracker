import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Segmented } from 'antd';
import { MenuOutlined, TableOutlined } from '@ant-design/icons';
import { Mode } from 'settings/interfaces';
import { userStore } from 'utils/userStore';

interface Props {
	value: Mode;
	onChange: (arg0: Mode) => void;
}

const ModeSelect: React.FC<Props> = observer(({ value, onChange }) => {
	const { isSmallScreen } = userStore;

	const [lastSelectedOption, setLastSelectedOption] = useState<Mode>(value);

	useEffect(() => {
		if (isSmallScreen) {
			onChange('grid');
			setLastSelectedOption(value);
		} else {
			onChange(lastSelectedOption);
		}
	}, [isSmallScreen]);

	return (
		<Flex
			gap={8}
			style={{ alignSelf: 'start' }}
		>
			<Segmented
				size={isSmallScreen ? 'small' : 'middle'}
				value={value}
				onChange={onChange}
				options={[
					{ label: <MenuOutlined />, value: 'list', disabled: isSmallScreen },
					{ label: <TableOutlined />, value: 'grid' },
				]}
			/>
		</Flex>
	);
});

export default ModeSelect;
