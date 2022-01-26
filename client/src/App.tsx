import React from 'react';
import BlocksList from './components/BlocksList';
import { Emotion } from './components/Emotion';
import { BlocksProvider } from './providers/BlocksProvider';
import { FocusedIndexProvider } from './providers/FocusedIndexProvider';
import { IsOnCompProvider } from './providers/IsOnCompProvider';
import { UndoRedoProvider } from './providers/UndoRedoProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <IsOnCompProvider >
          <FocusedIndexProvider>
            <UndoRedoProvider>
              <BlocksList />
            </UndoRedoProvider>            
          </FocusedIndexProvider>
        </IsOnCompProvider>   
      </BlocksProvider>
      
      <Emotion />
    </div>
  );
}

export default App;
