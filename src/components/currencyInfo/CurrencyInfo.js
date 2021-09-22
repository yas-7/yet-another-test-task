import './style.css';

const CurrencyInfo = ({
  selectedCurrencyCode,
  selectedCurrencyRate,
  selected,
  base,
}) => {
  return (
    <div className='info-wrapper'>
      {selectedCurrencyRate && (
        <>
          <div className='info-wrapper__title'>Exchange rate:</div>
          <div className='info-wrapper__data'>
            {selectedCurrencyRate.toFixed(2)} {selected} for 1 {base}
          </div>
        </>
      )}
      {selectedCurrencyCode && (
        <img
          className='flag'
          src={`https://flagcdn.com/96x72/${selectedCurrencyCode.toLocaleLowerCase()}.png`}
          width='96'
          height='72'
          alt='flag'
        />
      )}
    </div>
  );
};

export default CurrencyInfo;
