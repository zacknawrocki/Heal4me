import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'
import {Button, Form, Input, message, PageHeader} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons'


const Register = ({history, setAlert, register, isAuthenticated}) => {
  const [form] = Form.useForm();
  
  const onSubmit = values => {
    register(values).then(res=>{
      message.success('Registration Succeed!')
      history.push('/dashboard')
    }).catch(()=>{
      message.error('Registration Failed!')
    });
  };
  
  return (
    <Fragment>
      <PageHeader
        ghost={false}
        title="Sign Up"
        subTitle={
          <span><UserOutlined /> Create Your Account</span>
        }
      >
      </PageHeader>
  
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} form={form}
              name="control-hooks" onFinish={onSubmit} scrollToFirstError>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Name" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="E-mail"  rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
            <Input placeholder="Email Address" type="email" prefix={<MailOutlined />} />
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
            <Input.Password min={6} prefix={<LockOutlined/>} />
          </Form.Item>
          <Form.Item
            name="password2"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password min={6} prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <p className='my-1' style={{fontSize: '20px'}}>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </Form.Item>
        </Form>
      </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(withRouter(Register));
