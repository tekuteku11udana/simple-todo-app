import React from 'react';
import BlocksList from './components/BlocksList';
import { RefTestComp } from './components/RefTestComp';
import { BlocksProvider } from './providers/BlocksProvider';
import { IsOnCompProvider } from './providers/IsOnCompProvider';
import { UndoRedoProvider } from './providers/UndoRedoProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <IsOnCompProvider >
          
            <UndoRedoProvider>
              <RefTestComp />
              <BlocksList />
            </UndoRedoProvider>            
         
        </IsOnCompProvider>   
      </BlocksProvider>
      
      
    </div>
  );
}

export default App;
