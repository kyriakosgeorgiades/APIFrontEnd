import React, {  useContext } from 'react';
import { useHistory } from "react-router-dom"
import Avatar from './upload';
import UserContext from '../contexts/user';
import {
  Form,
  Input,
  Tooltip,
  Button
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {status,json} from '../utilities/requestHandlers';
import { Select, InputNumber } from 'antd';

const { Option } = Select;


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
 * Renders a <RegistrationDog /> component to register a new dog.
 */
const RegistrationDog = () => {
	let history = useHistory();
  const [form] = Form.useForm();
	const token = localStorage.getItem("token");
	/** Creating a new dog record only on the users allowed */
  const onFinish = (values) => {
		const {confirm, ...data} = values;
		fetch('https://famous-pyramid-3000.codio-box.uk/api/v1/dogs', {
			method: "POST",
			body: JSON.stringify(data),
			headers:{
				"Authorization": token,
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
			alert("Dog Posted!");
			history.push("/");
			
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
        name="name"
        label="Dog Name"
        rules={[
          {
            required: true,
            message: 'Please input Doggo name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
			
			<Form.Item
        name="breed"
        label="Breed"
        rules={[
          {
            required: true,
            message: 'Please input the Dog breed!',
          },
        ]}
      >
        <Input />
      </Form.Item>
			
			<Form.Item
				name = "sex"
				label= "Sex"
				rules ={[
							{
							 type: 'string',
							 max : 1,
							 message: 'Limited to only one letter M or F'
							}
							 ]}
			>
					<Input />
					</Form.Item>
			
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            type: 'number',
            message: 'The input is not a number!'
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
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



export default RegistrationDog;