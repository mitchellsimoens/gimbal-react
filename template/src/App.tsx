import React from 'react';
import Home from './pages/Home';
import { DataProvider } from './services/Data';

const App: React.FC = () => <DataProvider>
  <Home />
</DataProvider>;

export default App;
