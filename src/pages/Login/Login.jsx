/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AUTH_API_URL, USER_API_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../app/reducers/authReducer";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${AUTH_API_URL}/login/`, credentials, config)
        .then((res) => {
          window.console.log("aaa: " + JSON.stringify(res.data, null, 2));

          const config2 = {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${res.data?.tokens}`,
            },
          };
          axios.get(`${USER_API_URL}/user/`, config2).then((res) => {
            window.console.log("bbb: " + JSON.stringify(res.data, null, 2));
            dispatch(setUser(res.data));
          });
          dispatch(setToken(res.data?.tokens));
          navigate("/");
        })
        .catch((err) => {
          alert("Login failed!", err);
        });
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <Form name="login" className="login-form">
        <h1>Login</h1>

        <Form.Item
          className="login-form-item"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
          />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="login-form-button"
            type="primary"
            htmlType="submit"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="register-link">
            <Button type="link" onClick={handleRegisterClick}>
              Don't have a account? Register now!
            </Button>
          </div>
        </Form.Item>
      </Form>
      {/* {error && (
        <span>
          {error.message}
          {credentials}
        </span>
      )} */}
    </div>
  );
};

export default Login;
