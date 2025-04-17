import {
  createContext, useMemo, useState,
} from 'react';

const ALL_FUNDS_TEST = [
  { id: 1, name: 'test fund 1' },
  { id: 2, name: 'test fund 2' },
  { id: 3, name: 'test fund 3' },
  { id: 4, name: 'test fund 4' },
  { id: 5, name: 'test fund 5' },
  { id: 6, name: 'test fund 6' },
  { id: 7, name: 'test fund 7' },
];

const InvestPageContext = createContext(null);

const InvestPageProvider = ({ children }) => {

  //   const allFunds = [];
  const [selectedFunds, setSelectedFunds] = useState([]);

  const value = useMemo(() => ({
    allFunds: ALL_FUNDS_TEST,
    selectedFunds,
    setSelectedFunds,
  }), [selectedFunds]);

  return (
    <InvestPageContext.Provider value={value}>
      {children}
    </InvestPageContext.Provider>
  );
};

export {
  InvestPageContext,
  InvestPageProvider,
};
