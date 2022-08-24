import Router from '@/router/Router';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router />
    </Suspense>
  );
}

export default App;
