import { useRoutes, Navigate } from 'react-router-dom';
import AppLayout from '../layouts';
import * as Pages from '../pages';
import { ROUTES } from '../routes/routes';
import { PrivateRoute } from '.';

export default function Routes() {
  return useRoutes([
    {
      path: ROUTES.HOME,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Pages.Welcome />,
        },
        {
          path: ROUTES.PLAYGROUND,
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <Pages.Playground />,
            },
          ],
        },
      ],
    },
    {
      path: ROUTES.NOT_FOUND,
      element: <Navigate replace to={ROUTES.DEFAULT} />,
    },
  ]);
}
