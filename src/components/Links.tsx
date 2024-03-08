import React from 'react';
import { Flex } from 'antd';
import telegramLogo from '../media/telegram.svg';
import githubLogo from '../media/github.svg';

const Links: React.FC = () => {
	return (
		<Flex gap={16}>
			<a
				href='https://github.com/e6ntff'
				target='_blank'
				rel='noreferrer'
			>
				<div
					style={{
						blockSize: '2em',
						inlineSize: '2em',
						background: `url(${githubLogo})`,
						backgroundSize: 'cover',
					}}
				></div>
			</a>

			<a
				href='https://t.me/e6ntff'
				target='_blank'
				rel='noreferrer'
			>
				<div
					style={{
						blockSize: '2em',
						inlineSize: '2em',
						background: `url(${telegramLogo})`,
						backgroundSize: 'cover',
					}}
				></div>
			</a>
		</Flex>
	);
};

export default Links;
