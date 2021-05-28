import React, {  useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {status,json} from '../utilities/requestHandlers';
import { useHistory } from "react-router-dom";
import UserContext from '../contexts/user';

/**
 * Renders a <Log /> component to log in users to the application.
 */
const Log = () => {
	
	let history = useHistory();
  const [form] = Form.useForm();
	const logged = useContext(UserContext);
	if (logged.user.loggedIn){
		history.push('/');
	}
	
/** Fetching to POST for the user to validate log in credentials*/
 const onFinish = (values) => {
		fetch('https://famous-pyramid-3000.codio-box.uk/api/v1/users/login', {
			method: "POST",
			headers:{
				"Authorization": "Basic " + btoa(values.username + ":" + values.password)
			}
		})
		.then(status)
		.then(json)
		.then(user => {
			alert("Logged IN!");
			logged.setLocalStorage(user)
			history.push("/");
			logged.login(user);
		})
		.catch(errorResponse => {
			form.resetFields()
			console.error('Login failed')
			console.log(errorResponse);
			alert(`Wrong Username or Password!`);
		})
  };

  return (	
    <Form
      name="normal_login"
      style={{ maxWidth: '300px', margin: '0 auto', padding: '30px'}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a style={{ float: 'right' }} href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Log in
        </Button>
        New User? <a href="">Join us!</a>
      </Form.Item>
    </Form>
  );
};

export default Log;