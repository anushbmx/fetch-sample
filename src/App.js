import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Index from './containers';
import InitialLoad from './containers/InitialLoad';
import OnFocusLoad from './containers/OnFocusLoad';
import OnRequestLoad from './containers/OnRequestLoad';

export default function AppContainer () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="initial-load" element={<InitialLoad />} />
        <Route path="on-focus-load" element={<OnFocusLoad />} />
        <Route path="on-request-load" element={<OnRequestLoad />} />
      </Routes>
    </BrowserRouter>
  );
}
