import './App.css';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container, Wrap } from './components/StyledComponents';
import { TopBtn } from './components/Button';
import { useRef } from 'react';

const queryClient = new QueryClient();

function App() {
  const topRef = useRef(null);
  return (
    <QueryClientProvider client={queryClient}>
      <Wrap>
        <Container>
          <span ref={topRef} />
          <Router />
          <TopBtn topRef={topRef} />
        </Container>
      </Wrap>
    </QueryClientProvider>
  );
};
export default App;