import React from 'react';
import {BlocksList} from './components/BlocksList';
import { RefTestComp } from './components/RefTestComp';
import { BlocksProvider } from './blocks/BlocksProvider';
import { IsOnCompProvider } from './providers/IsOnCompProvider';
import { UndoRedoProvider } from './undoRedo';
import { UtilsProvider } from './utils/UtilsProvider';
import { ActionUtilsProvider } from './utils/ActionUtilsProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <IsOnCompProvider >
          <UndoRedoProvider >
            <ActionUtilsProvider  >
              <BlocksList />
            </ActionUtilsProvider>
              
            
          </UndoRedoProvider>
        </IsOnCompProvider>   
      </BlocksProvider>
      
      
    </div>
  );
}

export default App;
