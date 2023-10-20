import styles from "./index.module.less";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
