import './App.css';
import ResponsiveAppBar from './components/nav';
import { FlexContainer } from './components/ui/flex-container';
import { AppRouter } from './router/app-router';

import RootStore, { RootStoreContext } from './stores/root-store';

function App() {
  const rootStore = new RootStore();

  return (
    <FlexContainer flexDirection={'column'} width={'100vw'} height={'100vh'}>
      <RootStoreContext.Provider value={rootStore}>
        <ResponsiveAppBar />
        <AppRouter />
      </RootStoreContext.Provider>
    </FlexContainer>
  );
}

export default App;
