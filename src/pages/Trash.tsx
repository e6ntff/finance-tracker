import { Anchor, Flex } from 'antd';
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
			/>
			<Flex
				ref={tourRefs[4]}
				vertical={isSmallScreen}
				gap={isSmallScreen ? 16 : 32}
				style={{ inlineSize: '100%' }}
			>
				<DeletedList query={debouncedQuery} />
				<DeletedCategories query={debouncedQuery} />
			</Flex>
		</Flex>
	);
});

export default Trash;
