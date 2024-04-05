import { Flex, Tour } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
	useCallback,
	useEffect,
	useRef,
	useMemo,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import constants from 'settings/constants';
import tour from 'settings/tour';
import { optionsStore } from 'utils/optionsStore';
import { userStore } from 'utils/userStore';
import LanguageSelect from './LanguageSelect';
import { getRandomData } from 'utils/transformData';
import { listStore } from 'utils/listStore';
import { categoryStore } from 'utils/categoryStore';

interface Props {
	toggleOpened: () => void;
}

const AppTour: React.FC<Props> = observer(({ toggleOpened }) => {
	const navigate = useNavigate();
	const stepId = useRef<NodeJS.Timeout>();
	const {
		tourRefs,
		setTourRefs,
		loading,
		setIsTourStarted,
		isTourStarted,
		currencyRates,
	} = userStore;
	const { userOptions } = optionsStore;
	const { language } = userOptions;
	const { setListTemplate, setList, listTemplate, userList } = listStore;
	const {
		setCategoriesTemplate,
		setCategories,
		categoriesTemplate,
		userCategories,
	} = categoryStore;

	const [currentStep, setCurrentStep] = useState<number>(-1);

	useEffect(() => {
		const data = getRandomData(10, 10, 5, 3, currencyRates);
		setListTemplate(data.items);
		setCategoriesTemplate(data.categories);
	}, [currencyRates, setCategoriesTemplate, setListTemplate]);

	useEffect(() => {
		setCurrentStep(isTourStarted ? 0 : -1);
	}, [isTourStarted]);

	useEffect(() => {
		if (isTourStarted) {
			setList(listTemplate);
		} else {
			setList(userList);
		}
	}, [isTourStarted, userList, listTemplate, setList]);

	useEffect(() => {
		if (isTourStarted) {
			setCategories(categoriesTemplate);
		} else {
			setCategories(userCategories);
		}
	}, [isTourStarted, categoriesTemplate, userCategories, setCategories]);

	const refs = new Array(tour.length).fill(undefined).map(() => useRef(null));
	const steps = useMemo(
		() =>
			tour.map((item: any, index: number) => {
				const description =
					index === 0 ? (
						<Flex
							gap={8}
							vertical
							align='start'
						>
							{item.step[language].description}
							<LanguageSelect />
						</Flex>
					) : (
						item.step[language].description
					);
				return {
					...item,
					step: {
						...item.step[language],
						description,
						target: () => (tourRefs.length ? tourRefs[index].current : null),
						nextButtonProps: index > 0 ? { style: { display: 'none' } } : {},
						prevButtonProps: index > 0 ? { style: { display: 'none' } } : {},
					},
				};
			}),
		[tourRefs, language]
	);

	useEffect(() => {
		setTourRefs(refs);
		return () => {
			clearInterval(stepId.current);
		};
		// eslint-disable-next-line
	}, []);

	const endTour = useCallback(() => {
		setIsTourStarted(false);
		setCurrentStep(-1);
		clearInterval(stepId.current);
	}, [setIsTourStarted, setCurrentStep]);

	const handleChange = useCallback(
		(step: number) => {
			if (step > 0) {
				stepId.current = setInterval(
					() =>
						setCurrentStep((prevStep: number) => {
							const nextStep = ++prevStep;
							nextStep === steps.length && endTour();
							navigate(tour[nextStep].page);
							(nextStep === 6 || nextStep === 7) && toggleOpened();
							return nextStep;
						}),
					constants.tourPeriod
				);
			}
			setCurrentStep(step);
		},
		[setCurrentStep, endTour, navigate, toggleOpened, steps.length]
	);

	return (
		<Tour
			disabledInteraction
			current={currentStep}
			open={!loading && currentStep >= 0}
			onChange={handleChange}
			onClose={endTour}
			onFinish={endTour}
			steps={steps.map((item: any) => item.step)}
		/>
	);
});

export default AppTour;
