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
 * Renders a <EditDog /> component to edit any dog details
 * @params props
 */
const EditDog = () => {
	let history = useHistory();
  const [form] = Form.useForm();
	const id_dog = useContext(UserContext);
	const token = localStorage.getItem("token");
  const onFinish = (values) => {
		const {confirm, ...data} = values;
		const id = id_dog.user.dogID;
		fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/dogs/${id}`, {
			method: "PUT",
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
			alert("Dog Updated!");
			history.push("/");
			
		})
		.catch(errorResponse => {
			form.resetFields()
			console.error(errorResponse);
			alert(`Error: ${errorResponse.status}, You can only modify dogs for your work shelter`);
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
      >
        <Input />
      </Form.Item>
			
			<Form.Item
        name="breed"
        label="Breed"
      >
        <Input />
      </Form.Item>
			
			<Form.Item
				name = "sex"
				label= "Sex"
			>
					<Input />
					</Form.Item>
			
      <Form.Item
        name="age"
        label="Age"
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
          Edit Dog
        </Button>
      </Form.Item>

			
    </Form>
  );
};



export default EditDog;