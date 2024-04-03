import languages from './languages';
import paths from './paths';

const tour = [
	{
		page: paths.expenses,
	},
	{
		page: paths.expenses,
	},
	{
		page: paths.expenses,
	},
	{ page: paths.categories },
	{ page: paths.trash },
	{ page: paths.trash },
	{ page: paths.trash },
	{ page: paths.stats },
	{ page: paths.stats },
	{ page: paths.expenses },
].map((item: any, index: number) => ({
	...item,
	step: languages.tour[index],
}));

export default tour;
