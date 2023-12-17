import { useRoutes } from 'react-router-dom';
import AppLayout from '../layouts';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <div>home</div>,
        },
      ],
    },
  ]);
}
