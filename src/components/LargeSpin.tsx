import { Flex, Spin } from 'antd';
import React from 'react';

const LargeSpin: React.FC = () => (
	<Flex
		style={{ inlineSize: '100%', blockSize: '100%' }}
		justify='center'
		align='center'
	>
		<Spin />
	</Flex>
);

export default LargeSpin;
