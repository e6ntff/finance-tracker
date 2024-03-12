import type { ThemeConfig } from 'antd';
import { Theme } from './interfaces';

export const getConfig: (
	isSmallScreen: boolean,
	themeAlgorithm: Theme
) => ThemeConfig = (isSmallScreen: boolean, themeAlgorithm: Theme) => ({
	algorithm: themeAlgorithm,
	components: {
		Menu: {
			iconMarginInlineEnd: isSmallScreen ? 0 : 10,
			itemPaddingInline: 14,
		},
	},
});
