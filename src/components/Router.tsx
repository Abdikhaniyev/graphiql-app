import { Navigate, Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts';
import * as Pages from '../pages';
import { ROUTES } from '../routes/routes';
import { PrivateRoute } from '.';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<Pages.Welcome />} />
        <Route path={ROUTES.PLAYGROUND} element={<PrivateRoute />}>
          <Route path={ROUTES.PLAYGROUND} element={<Pages.GraphiQL />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<Pages.Page404 />}></Route>
      </Route>
      <Route path={'*'} element={<Navigate replace to={ROUTES.NOT_FOUND} />}></Route>
    </Routes>
  );
}
