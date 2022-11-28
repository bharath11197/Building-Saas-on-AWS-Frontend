import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL, CSS_HELPER } from "../../helper";

const SignUp = () => {
  const navigate = useNavigate();
  const onSignUp = async (formValues) => {
    try {
      const apiRes = await axios.post(`${BASE_API_URL}/user/signup/`, { ...formValues, loginType: 'user' });
      if (apiRes.status === 200) {
        navigate('/signin');
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
      <div className="authPage__left register__bg">
        <div className="authPage__left--bg ">
          <h3 className="authPage__left--siteLogo">BLOGGER</h3>
          <div className="authPage__left--siteInfo">
            <h1 className="authPage__right--heading">Welcome to Blogger</h1>
            <h3>Publish your passions, your way.</h3>
            <b>Create a unique and beautiful blog. It's easy and free.</b>
          </div>
          <span className="authPage__left--navLink">
            <span>Already have an account ?</span>
            <Link to={`/signin`} className="black__button white__button">
              Sign In
            </Link>
          </span>
        </div>
      </div>
      <div className="authPage__right">
        <h1 className="authPage__right--heading">SIGN UP</h1>
        <Form
          onFinish={onSignUp}
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
            name="userName"
            rules={[
              {
                required: true,
                message: "Username should not be empty !",
              },
            ]}
            style={CSS_HELPER.input}
          >
            <Input placeholder="Enter UserName" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password should not be empty !",
              },
              {
                min: 8,
                message: 'Password should be atleast 8 characters long!'
              }
            ]}
            style={CSS_HELPER.input}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords not match")
                }
              })
            ]}
            hasFeedback
            style={CSS_HELPER.input}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <span className='authPage__navLink'><Link to={`/signin`}>Already have an account ?</Link></span>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ ...CSS_HELPER.button, ...CSS_HELPER.blackButton }}
            >
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
