import sortByDate from '../utils/sortByDate';

const getList = async () => {
  try {
    const response = await fetch(
      'https://mocki.io/v1/a0c84848-d4d2-4362-a937-9aee358496dc'
    );
    const list = await response.json();
    return sortByDate(list || []);
  } catch (err) {
    alert('Failed to fetch');
  }
};

export default getList;
