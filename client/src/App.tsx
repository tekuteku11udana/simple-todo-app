import React from 'react';
import BlockList from './components/BlockList';
import { BlocksProvider } from './providers/BlockProvider';
import { IsOnCompProvider } from './providers/IsOnCompProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <IsOnCompProvider >
          <BlockList />
        </IsOnCompProvider>   
      </BlocksProvider>
      
    </div>
  );
}

export default App;
