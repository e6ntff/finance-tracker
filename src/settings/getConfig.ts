import type { ThemeConfig } from 'antd';
import { ThemeAlgorithm } from './interfaces';

export const getConfig: (
	isSmallScreen: boolean,
	themeAlgorithm: ThemeAlgorithm
) => ThemeConfig = (
	isSmallScreen: boolean,
	themeAlgorithm: ThemeAlgorithm
) => ({
	algorithm: themeAlgorithm,
	components: {
		Card: {
			paddingLG: 10,
		},
		Menu: {
			iconMarginInlineEnd: isSmallScreen ? 0 : 10,
			itemPaddingInline: 14,
		},
		Progress: {
			motionDurationSlow: '0s',
			motionEaseInOutCirc: 'linear',
			motionEaseOutQuint: 'linear',
		},
	},
});
