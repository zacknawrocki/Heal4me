import React, {Fragment, useState} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const FormItem = Form.Item

const Login = ({login, isAuthenticated, history}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setloading] = useState(false);
  
  const {email, password} = formData;
  
  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const onSubmit = () => {
    setloading(true)
    login(email, password).then(res => {
      message.success('login success')
      history.push('/home')
    }).catch(err => {
      console.log(33333);
      message.error('login failed')
    }).finally(() => {
      setloading(false)
    });
  };
  
  if (isAuthenticated) {
    return <Redirect to='/home'/>;
  }
  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'/> Sign Into Your Account
      </p>
      
      <Form onFinish={onSubmit} onFinishFailed={onFinishFailed}>
        <FormItem label="Username"
                  name="username"
                  rules={[{required: true, message: 'Please input your username!'}]}>
          <Input type='email' placeholder='Email Address' prefix={<UserOutlined/>}
                 name='email' value={email} onChange={e => onChange(e)}/>
        </FormItem>
        
        <FormItem label="Password" name="password"
                  rules={[
                    {required: true, message: 'Please input your password!'},
                    {min: 6, message: 'At least 6 digits are required'}
                  ]}>
          <Input.Password placeholder='Password' prefix={<LockOutlined/>} value={password}
                          name="password" onChange={e => onChange(e)}/>
        </FormItem>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      
      {/*<form className='form' onSubmit={e => onSubmit(e)}>*/}
      {/*  <div className='form-group'>*/}
      {/*    <input*/}
      {/*      type='email'*/}
      {/*      placeholder='Email Address'*/}
      {/*      name='email'*/}
      {/*      value={email}*/}
      {/*      onChange={e => onChange(e)}*/}
      {/*      required*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className='form-group'>*/}
      {/*    <input*/}
      {/*      type='password'*/}
      {/*      placeholder='Password'*/}
      {/*      name='password'*/}
      {/*      value={password}*/}
      {/*      onChange={e => onChange(e)}*/}
      {/*      minLength='6'*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <input type='submit' className='btn btn-primary' value='Login' />*/}
      {/*</form>*/}
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {login}
)(withRouter(Login));
