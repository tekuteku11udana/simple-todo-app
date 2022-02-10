import React from 'react';
import {BlocksList} from './components/BlocksList';
import { UndoRedoProvider } from './undoRedo';
import { DataProvider } from './data';
import { ExecsProvider } from './execs';

function App() {
  return (
    <div>
      <DataProvider >
        <UndoRedoProvider >
          <ExecsProvider >
            <BlocksList />
          </ExecsProvider>   
        </UndoRedoProvider>
      </DataProvider> 
    </div>
  );
}

export default App;
