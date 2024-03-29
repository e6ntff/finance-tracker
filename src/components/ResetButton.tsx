import { ReloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';

interface Props {
	disabled?: boolean;
	reset: () => void;
}

const ResetButton: React.FC<Props> = observer(({ disabled, reset }) => {
	const { userOptions } = optionsStore;
	const { isSmallScreen } = userStore;

	return (
		<Tooltip title={languages.reset[userOptions.language]}>
			<Button
				disabled={disabled}
				onClick={reset}
				size={isSmallScreen ? 'small' : 'middle'}
			>
				<ReloadOutlined />
			</Button>
		</Tooltip>
	);
});

export default ResetButton;
