import React from 'react';
import {BlocksList} from './components/BlocksList';
import { RefTestComp } from './components/RefTestComp';
import { BlocksProvider } from './providers/BlocksProvider';
import { IsOnCompProvider } from './providers/IsOnCompProvider';
import { UtilsProvider } from './utils/UtilsProvider';

function App() {
  return (
    <div>
      <BlocksProvider >
        <IsOnCompProvider >
              <UtilsProvider >
                {/* <RefTestComp /> */}
                <BlocksList />
              </UtilsProvider>
        </IsOnCompProvider>   
      </BlocksProvider>
      
      
    </div>
  );
}

export default App;
