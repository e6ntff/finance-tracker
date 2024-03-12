import React from 'react';
import { Flex } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const Links: React.FC = () => (
	<Flex gap={16}>
		<Link
			href='https://github.com/e6ntff'
			target='_blank'
		>
			<GithubOutlined
				style={{
					color: '#fff',
					fontSize: '2em',
				}}
			/>
		</Link>
	</Flex>
);

export default Links;
