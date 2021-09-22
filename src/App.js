import './App.css';
import { useEffect, useState } from 'react';
import currencyCodes from './currency.json';
import CurrencySelector from './components/currencySelector/CurrencySelector';
import CurrencyInfo from './components/currencyInfo/CurrencyInfo';

export const baseUrl = 'http://data.fixer.io/api';

function App() {
  const [selected, setSelected] = useState('');
  const [base, setBase] = useState(null);
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState(null);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(null);
  const urlRates = `${baseUrl}/latest?access_key=${process.env.REACT_APP_FIXER_API_KEY}`;
  const urlCurrencies = `${baseUrl}/symbols?access_key=${process.env.REACT_APP_FIXER_API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const ratesPromise = fetch(urlRates);
        const currenciesPromise = fetch(urlCurrencies);
        const [ratesResponse, currenciesResponse] = await Promise.all([
          ratesPromise,
          currenciesPromise,
        ]);
        const ratesJson = await ratesResponse.json();
        const currenciesJson = await currenciesResponse.json();

        setRates(ratesJson.rates);
        setBase(ratesJson.base);
        setCurrencies(currenciesJson.symbols);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [urlRates, urlCurrencies]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSelected(value);
    setSelectedCurrencyRate(rates[value]);

    const filteredCurrencyCode = Object.keys(currencyCodes).filter(
      (key) => currencyCodes[key] === value
    );

    if (filteredCurrencyCode.length > 0) {
      setSelectedCurrencyCode(filteredCurrencyCode[0]);
    }
  };

  return (
    <div className='wrapper'>
      {error && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}
      {!error && !isLoading && currencies && (
        <CurrencySelector
          currencies={currencies}
          selected={selected}
          onChange={handleChange}
        />
      )}
      {selectedCurrencyCode && (
        <CurrencyInfo
          selectedCurrencyCode={selectedCurrencyCode}
          selectedCurrencyRate={selectedCurrencyRate}
          selected={selected}
          base={base}
        />
      )}
    </div>
  );
}

export default App;
