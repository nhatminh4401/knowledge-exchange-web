import React from "react";
import { Form, Input, Button } from "antd";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_API_URL } from "../../utils/constants";

const Register = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = React.useState(false);
  const onSignUp = () => {
    // navigate("/login");
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const onFinish = (values) => {
    const { username, email, phone, password, confirm } = values;
    if (username && password === confirm) {
      // register user here

      const body = {
        username: username,
        email: email,
        phone: phone,
        password: password,
      };
      try {
        axios.post(`${AUTH_API_URL}/register/`, body, config).then((res) => {
          window.console.log("aaa: " + JSON.stringify(res.data, null, 2));
          navigate("/login");
        });
      } catch (err) {
        console.warn(err);
        alert("Register failed!", err);
      }
    }
  };

  return (
    <div className="register-container">
      <Form name="register" className="register-form" onFinish={onFinish}>
        <h1>Register</h1>
        <Form.Item
          className="register-form-item"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          className="register-form-item"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          className="register-form-item"
          name="phone"
          type="number"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item
          className="register-form-item"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          className="register-form-item"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  setIsValid(true);
                  return Promise.resolve();
                }
                setIsValid(false);
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button
            className="register-form-button"
            type="primary"
            htmlType="submit"
            onClick={onSignUp}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
