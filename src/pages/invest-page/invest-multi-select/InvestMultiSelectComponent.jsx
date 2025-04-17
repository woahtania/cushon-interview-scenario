import {
  useCallback, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { InvestPageContext } from '../provider/InvestPageProvider';
import './InvestMultiSelectComponent.scss';

const InvestMultiSelectComponent = ({ multiselect = false }) => {

  const {
    allFunds,
    // selectedFunds,
    // setSelectedFunds,
  } = useContext(InvestPageContext);

  const [page, setPage] = useState(0);
  const [selectedFundIds, setSelectedFundIds] = useState(new Set([]));

  const fundsWithAmounts = useMemo(() => allFunds.filter((e) => selectedFundIds.has(e.id)), [allFunds, selectedFundIds]);

  const onFundChecked = useCallback((e) => {
    const checked = e.target.checked;
    const key = Number(e.target.getAttribute('data-id'));

    if (checked) {
      selectedFundIds.add(key);
    }
    else {
      selectedFundIds.delete(key);
    }

    // If no multiselect then move on immediately
    if (!multiselect) {
      setPage(1);
    }

    setSelectedFundIds(new Set(selectedFundIds));
  }, [multiselect, selectedFundIds]);

  const allFundsListComponents = useMemo(() => allFunds.map(
    (e) => (
      <li key={e.id}>
        <input type="checkbox" checked={selectedFundIds.has(e.id)} data-id={e.id} onChange={onFundChecked} />
        {e.name}
      </li>
    ),
  ), [allFunds, onFundChecked, selectedFundIds]);


  const fundsWithAmountsListComponents = useMemo(() => fundsWithAmounts.map(
    (e) => (
      <li key={e.id}>
        {e.name}
        <input type="text" data-id={e.id} className="amount-field" placeholder="Amount" />
      </li>
    ),
  ), [fundsWithAmounts]);

  return (
    <div className="invest-multi-select-component">
      <ul>
        {page === 0 && (
          allFundsListComponents
        )}

        {page === 1 && (
          fundsWithAmountsListComponents
        )}
      </ul>
      { (multiselect && page === 0)
      && (
        <button type="button" onClick={() => setPage(1)}>Next</button>
      )}
    </div>
  );

};

InvestMultiSelectComponent.propTypes = {
  multiselect: PropTypes.bool,
};

export {
  InvestMultiSelectComponent,
};
