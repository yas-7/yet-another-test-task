import './style.css';

const CurrencySelector = ({ onChange, currencies, selected }) => {
  return (
    <select className='selector' value={selected} onChange={onChange}>
      <option value='' disabled>
        Select your currency
      </option>
      {Object.keys(currencies).map((key) => (
        <option key={key} value={key}>
          {currencies[key]}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
