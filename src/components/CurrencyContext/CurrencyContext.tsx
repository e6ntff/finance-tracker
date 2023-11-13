import React, {
  createContext,
  useState,
  useEffect,
  Context,
  ReactNode,
} from 'react';
import { getExchangeRates } from '../../api/getExchangeRates';

interface CurrencyContextProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyRates: {
    EUR: number;
    RUB: number;
  };
}

const initialContextValue: CurrencyContextProps = {
  currency: '',
  setCurrency: () => {},
  currencyRates: { EUR: 0, RUB: 0 },
};

const CurrencyContext: Context<CurrencyContextProps> =
  createContext(initialContextValue);

interface CurrencyProviderProps {
  children: ReactNode;
}

const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  useEffect(() => {
    if (localStorage.getItem('curr') === null)
      localStorage.setItem('curr', 'USD');
  }, []);

  const CurrencyFromLocal: string | null = localStorage.getItem('curr');

  const [currency, setCurrency] = useState<string>(
    typeof CurrencyFromLocal === 'string' ? CurrencyFromLocal : 'USD'
  );
  const [currencyRates, setCurrencyRates] = useState<{
    EUR: number;
    RUB: number;
  }>({ EUR: 0, RUB: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getExchangeRates();
        setCurrencyRates(rates.rates);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    }

    fetchData();
  }, []);

  const contextValue: CurrencyContextProps = {
    currency,
    setCurrency,
    currencyRates,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider, type CurrencyContextProps };
