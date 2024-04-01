import React from 'react';
import { observer } from 'mobx-react-lite';
import Marquee from 'react-fast-marquee';
import { Alert } from 'antd';
import { optionsStore } from 'utils/optionsStore';
import languages from 'settings/languages';

const Ticker: React.FC = observer(() => {
	const { userOptions } = optionsStore;

	return (
		<Alert
			showIcon={false}
			style={{background: '#0000'}}
			banner
			message={
				<Marquee pauseOnHover>
					{languages.mayNotWorkText[userOptions.language]}
				</Marquee>
			}
		/>
	);
});

export default Ticker;
