import React from 'react';
import { Flex } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import { userStore } from 'utils/userStore';
import { observer } from 'mobx-react-lite';

const Links: React.FC = observer(() => {
	const { isSmallScreen } = userStore;

	return (
		<Flex gap={32}>
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
		</Flex>
	);
});

export default Links;
