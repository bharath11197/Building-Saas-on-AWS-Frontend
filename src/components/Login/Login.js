import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL, CSS_HELPER } from "../../helper";
import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate()
  const onSignIn = async (formValues) => {
    try {
      const apiRes = await axios.post(`${BASE_API_URL}/user/signin`, formValues);
      if (apiRes.status === 200) {
        const userData = apiRes.data;
        localStorage.setItem('token', userData.token);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('userRole', userData.loginType);
        navigate('/');
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      if (errorMessage) {
        notification.error({ message: errorMessage })
      } else {
        notification.error({ message: `SORRY! SOMETHING WENT WRONG` })
      }
    }
  };
  return (
    <div className="authPage">
      <div className="authPage__left">
        <div className="authPage__left--bg">
          <h3 className="authPage__left--siteLogo">BLOGGER</h3>
          <div className="authPage__left--siteInfo">
            <h3 className="authPage__right--heading">Welcome to Blogger</h3>
            <h3>Publish your passions, your way.</h3>
            <b>Create a unique and beautiful blog. It's easy and free.</b>
          </div>
          <span className="authPage__left--navLink">
            <h3>Dont have an account ?</h3>
            <Link to={`/signup`} className="black__button">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
      <div className="authPage__right">
        <h1 className="authPage__right--heading">SIGN IN</h1>
        <Form
          onFinish={onSignIn}
          autoComplete="off"
          size="large"
          className="authPage__right--form"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email should not be empty",
              },
              {
                type: "email",
                message: "Invalid Email !",
              },
            ]}
            style={CSS_HELPER.input}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password should not be empty !",
              },
            ]}
            style={CSS_HELPER.input}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <span className='authPage__navLink'><Link to={`/signup`}>Dont have an account ?</Link></span>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ ...CSS_HELPER.button, ...CSS_HELPER.blackButton }}
            >
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
