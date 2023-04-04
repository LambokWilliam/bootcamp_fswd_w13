import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { InfoCard, Layout } from './components';
import { PATH } from './constants/path';
import { DetailPage, HomePage, LoginRegisterPage, NewBookPage } from './pages';

const router = createBrowserRouter([
  {
    path: PATH.login,
    element: <LoginRegisterPage />,
  },
  {
    path: PATH.register,
    element: <LoginRegisterPage />,
  },
  {
    path: PATH.detail,
    element: <DetailPage />,
  },
  {
    path: PATH.newbook,
    element: <NewBookPage />,
  },
  {
    path: PATH.home,
    element: <HomePage />,
  },
  {
    path: '/*',
    element: <Navigate to={PATH.home} />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
