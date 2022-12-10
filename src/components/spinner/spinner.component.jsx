// What we're going to do is depending on the isLoading value, we will conditionally
// render the actual component inside of category or at least the relevant portion
// of it, or we're going to render the spinner.

import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;