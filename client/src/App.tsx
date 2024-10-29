import { Toaster } from 'react-hot-toast';
import AppRoutes from './router/AppRouter';

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>

  );
}

export default App;