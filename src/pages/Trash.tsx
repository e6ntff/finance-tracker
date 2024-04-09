import { Flex } from 'antd';
import DeletedCategories from 'components/DeletedCategories';
import DeletedList from 'components/DeletedItems';
import TrashPanel from 'components/TrashPanel';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import constants from 'settings/constants';

import { userStore } from 'utils/userStore';

const Trash: React.FC = observer(() => {
	const { isSmallScreen, tourRefs } = userStore;

	const [query, setQuery] = useState<string>('');
	const [debouncedQuery, setDebouncedQuery] = useState<string>('');
	const [isExpenses, setIsExpenses] = useState<boolean>(true);

	const debouncedSetQuery = useMemo(
		() =>
			debounce(
				(query: string) => setDebouncedQuery(query),
				constants.optionsDebounceDelay
			),
		[]
	);

	useEffect(() => {
		debouncedSetQuery(query);
		return () => {
			debouncedSetQuery.cancel();
		};
	}, [query, debouncedSetQuery]);

	return (
		<Flex
			vertical
			gap={isSmallScreen ? 16 : 32}
		>
			<TrashPanel
				query={query}
				setQuery={setQuery}
				debouncedQuery={debouncedQuery}
				isExpenses={isExpenses}
				setIsExpenses={setIsExpenses}
			/>
			<Flex
				ref={tourRefs[4]}
				gap={isSmallScreen ? 16 : 32}
				style={{ inlineSize: '100%' }}
			>
				{isSmallScreen ? (
					isExpenses ? (
						<DeletedList query={debouncedQuery} />
					) : (
						<DeletedCategories query={debouncedQuery} />
					)
				) : (
					<Flex
						style={{ inlineSize: '100%' }}
						gap={32}
					>
						<DeletedList query={debouncedQuery} />
						<DeletedCategories query={debouncedQuery} />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
});

export default Trash;
