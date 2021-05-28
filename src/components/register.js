import React, {  useContext } from 'react';
import { useHistory } from "react-router-dom"
import UserContext from '../contexts/user';
import {
  Form,
  Input,
  Tooltip,
  Button
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {status,json} from '../utilities/requestHandlers';


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

/**
 * Renders a <RegistrationForm /> component to register users.
 */
const RegistrationForm = () => {
	let history = useHistory();
  const [form] = Form.useForm();
	const userCon = useContext(UserContext);

	/** Fetching to POST new user data to create an account. Then set them as login status */	
  const onFinish = (values) => {
		const {confirm, ...data} = values;
		fetch('https://famous-pyramid-3000.codio-box.uk/api/v1/users', {
			method: "POST",
			body: JSON.stringify(data),
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data => {
			userCon.setLocalStorage(data)
			alert("Account Created!");
			history.push("/");
			userCon.login(data);
		})
		.catch(errorResponse => {
			form.resetFields()
			console.error(errorResponse)
			alert(`Error: ${errorResponse}`);
		})
  };


  return (
    <Form style={{padding: '20px 300px 0px 0px'}}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >
			<Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input your First Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
			
			<Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
			
			<Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="What your username will be displayed as?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
			
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
			
			<Form.Item
        name="code"
        label={
					<span>
					Code&nbsp;
						<Tooltip title="Corresponding code registration shelter for employee!">
						<QuestionCircleOutlined />
						</Tooltip>
					</span>
				}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
			
			

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

			
    </Form>
  );
};



export default RegistrationForm;