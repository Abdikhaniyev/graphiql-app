import { useRoutes } from 'react-router-dom';
import AppLayout from '../layouts';
import * as Pages from '../pages';
import { PrivateRoute } from '.';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Pages.Welcome />,
        },
        {
          path: 'playground',
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <Pages.GraphiQL />,
            },
          ],
        },
      ],
    },
  ]);
}
