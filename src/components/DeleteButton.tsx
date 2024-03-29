import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

interface Props {
	remove: () => void;
}

const DeleteButton: React.FC<Props> = observer(({ remove }) => {
	const { userOptions } = optionsStore;
	const { isSmallScreen } = userStore;

	return (
		<Tooltip title={languages.delete[userOptions.language]}>
			<DeleteOutlined
				onClick={remove}
				style={{ scale: isSmallScreen ? '1' : '1.5' }}
			/>
		</Tooltip>
	);
});

export default DeleteButton;
