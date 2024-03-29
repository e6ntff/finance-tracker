import React from 'react';
import { Flex, Tooltip } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';
import languages from 'settings/languages';
import { optionsStore } from 'utils/optionsStore';

const Links: React.FC = observer(() => {
	const { isSmallScreen } = userStore;
	const { userOptions } = optionsStore;

	return (
		<Flex gap={32}>
			<Tooltip title={languages.gitHub[userOptions.language]}>
				<Link
					href='https://github.com/e6ntff'
					target='_blank'
				>
					<GithubOutlined
						style={{
							color: '#fff',
							fontSize: isSmallScreen ? '1.5em' : '2em',
						}}
					/>
				</Link>
			</Tooltip>
		</Flex>
	);
});

export default Links;
