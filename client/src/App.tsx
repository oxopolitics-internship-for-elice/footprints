import Router from '@/router/Router';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
