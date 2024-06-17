import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as publicRoutes from "./public/index";
import * as privateRoutes from "./private/index";
import _ from "lodash";

import useAuthStore from "../store/useAuthStore.js";
import { getAuth } from "../services/user.js";

export const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuth = useAuthStore((state) => state.setIsAuth);
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    const getUser = async () => {
      const { user }: any = await getAuth();
      if (user) {
        setUser(user)
        setAuth(true)
        navigate(privateRoutes.DASHBOARD.route);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate(privateRoutes.DASHBOARD.route);
    }
  }, [isAuth]);

  return (
    <React.Fragment>
      {!isAuth ? (
        <Routes>
          {_.map(publicRoutes, (route) => {
            return (
              <Route
                element={<route.element />}
                path={route.route}
                key={route.route}
              />
            );
          })}
          <Route
            path="/*"
            element={<Navigate replace to={publicRoutes.WELCOME.route} />}
          />
        </Routes>
      ) : (
        <Routes>
          {_.map(privateRoutes, (route) => {
            return (
              <Route
                element={<route.element />}
                path={route.route}
                key={route.route}
              />
            );
          })}
          <Route
            path="/*"
            element={<Navigate replace to={privateRoutes.DASHBOARD.route} />}
          />
        </Routes>
      )}
    </React.Fragment>
  );
};
