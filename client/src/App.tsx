import React from 'react';
import {BlocksList} from './components/BlocksList';
import { RefTestComp } from './components/RefTestComp';
import { BlocksProvider } from './providers/BlocksProvider';
import { IsOnCompProvider } from './providers/IsOnCompProvider';
import { UndoRedoProvider } from './providers/UndoRedoProvider';
import { UtilsProvider } from './providers/UtilsProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <IsOnCompProvider >
            <UndoRedoProvider>
              <UtilsProvider >
                {/* <RefTestComp /> */}
                <BlocksList />
              </UtilsProvider>  
            </UndoRedoProvider> 
        </IsOnCompProvider>   
      </BlocksProvider>
      
      
    </div>
  );
}

export default App;
