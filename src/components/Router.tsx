import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from '../layouts';
import * as Pages from '../pages';
// import Playground from '../pages/Playground/Page';
// import Welcome from '../pages/Welcome/Page';
import { ROUTES } from '../routes';

export default function Router() {
  return useRoutes([
    {
      path: ROUTES.HOME,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Pages.Welcome />,
        },
      ],
    },
    {
      path: ROUTES.PLAYGROUND,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Pages.Playground />,
        },
      ],
    },
    {
      path: ROUTES.NOT_FOUND,
      element: <Navigate replace to={ROUTES.DEFAULT} />,
    },
  ]);
}
