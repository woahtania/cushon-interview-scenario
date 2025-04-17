import { InvestMultiSelectComponent } from './invest-multi-select/InvestMultiSelectComponent';
import { InvestPageProvider } from './provider/InvestPageProvider';


const InvestPage = () => (
  <InvestPageProvider>
    <InvestMultiSelectComponent />
  </InvestPageProvider>
);

export {
  InvestPage,
};
