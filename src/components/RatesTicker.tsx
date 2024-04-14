import React, { CSSProperties, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Marquee from 'react-fast-marquee';
import { Alert, Flex, Typography } from 'antd';
import { userStore } from 'utils/userStore';

const RatesTicker: React.FC = observer(() => {
	const { currencyRates, logged } = userStore;

	const { EURUSD, EURRUB, USDRUB } = useMemo(() => {
		const { EUR, USD, RUB } = currencyRates;
		return {
			EURUSD: Math.round((USD / EUR) * 1000) / 1000,
			EURRUB: Math.round((USD / EUR) * RUB * 1000) / 1000,
			USDRUB: Math.round(RUB * 1000) / 1000,
		};
	}, [currencyRates]);

	const text = useMemo(() => {
		const textStyle: CSSProperties = {
			color: '#fffa',
			textAlign: 'center',
			inlineSize: '15em',
		};

		return (
			<Flex justify='space-around'>
				<Typography.Text
					style={textStyle}
				>{`USD/RUB: ${USDRUB}`}</Typography.Text>
				<Typography.Text
					style={textStyle}
				>{`EUR/RUB: ${EURRUB}`}</Typography.Text>
				<Typography.Text
					style={textStyle}
				>{`EUR/USD: ${EURUSD}`}</Typography.Text>
			</Flex>
		);
	}, [EURUSD, EURRUB, USDRUB]);

	return (
		<>
			{logged && (
				<Alert
					style={{ color: '#fffa', background: '#0000' }}
					showIcon={false}
					banner
					message={<Marquee>{text}</Marquee>}
				/>
			)}
		</>
	);
});

export default RatesTicker;
