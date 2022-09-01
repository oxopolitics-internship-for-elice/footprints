import Router from '@/router/Router';
import { Suspense } from 'react';
import Loading from './components/base/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router />
    </Suspense>
  );
}

export default App;
