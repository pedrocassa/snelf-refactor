import './App.css';
import ResponsiveAppBar from './components/nav';
import { FlexContainer } from './components/ui/flex-container';
import { AppRouter } from './router/app-router';

function App() {
  return (
    <FlexContainer flexDirection={'column'} width={'100vw'} height={'100vh'}>
      <ResponsiveAppBar />
      <AppRouter />
    </FlexContainer>
  );
}

export default App;
