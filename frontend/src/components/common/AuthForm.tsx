import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, message } from "antd";
import cn from "classnames";
import styles from "../../styles/auth.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN, REGISTRATION } from "../../routes/public";
import { login, registration } from "../../services/user";
import useAuthStore from "../../store/useAuthStore";
import { DASHBOARD } from "../../routes/private";

const AuthForm: React.FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuth = useAuthStore((state) => state.setIsAuth);

  const isReg = location.pathname == REGISTRATION.route;

  const authorize = async (data: any) => {
    try {
      const user = isReg ? await registration(data) : await login(data);
      if (user) {     
        localStorage.setItem("token", JSON.stringify(user.accessToken));
        setUser(user.user)
        setAuth(true)
        navigate(DASHBOARD.route);
      }
    } catch (error) {
      console.log("error", error);
      message.warning("Что то пошло не так при попытке аутентификации.");
    }
  };

  return (
    <div className={cn(styles.authWrapper)}>
      <h1>Войди в систему и управляй своими финансами.</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          authorize(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="email..." />

            <Field type="password" name="password" placeholder="password..." />

            <Button
              className={cn(styles.submitBtn)}
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
            >
              Отправить
            </Button>
            <ErrorMessage className={styles.err} name="email" component="div" />
            <ErrorMessage
              className={styles.err}
              name="password"
              component="div"
            />
            <div>
              {isReg ? (
                <div>
                  <span style={{ marginRight: 5 }}>Уже есть аккаунт? </span>
                  <Button onClick={() => navigate(LOGIN.route)}>Логин</Button>
                </div>
              ) : (
                <div>
                  <span style={{ marginRight: 5 }}> Аккаунт не создан? </span>
                  <Button onClick={() => navigate(REGISTRATION.route)}>
                    Создать
                  </Button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
