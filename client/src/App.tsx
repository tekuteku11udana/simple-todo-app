import React from 'react';
import BlockList from './components/BlockList';
import { BlocksProvider } from './providers/BlockProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <BlockList />
      </BlocksProvider>
      
    </div>
  );
}

export default App;
