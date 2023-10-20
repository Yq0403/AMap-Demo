import { useNavigate } from "umi";
import { Button, Form, Input, Image, Alert } from "antd";
import { useState } from "react";

import styles from "./index.module.less";
import user from "../../images/user.png";
import password from "../../images/password.png";

function LoginForm() {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = ({ username, password }: any) => {
    if (username === "admin" && password === "123456") {
      navigate("/");
    } else {
      setError("用户名或密码错误");
    }
  };
  return (
    <Form labelCol={{ span: 4 }} colon={false} onFinish={handleSubmit}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" className={styles.input} />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password className={styles.input} placeholder="请输入密码" />
      </Form.Item>
      {error && (
        <Form.Item>
          <Alert message={error} />
        </Form.Item>
      )}
      <Form.Item>
        <Button size="large" htmlType="submit" className={styles.submit_button}>
          立即登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
