import React, {Fragment, useState} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';
import {Button, DatePicker, Form, Input, PageHeader, Switch} from "antd";
// import Education from '../../img/education.svg'
import {FaBuilding} from 'react-icons/fa';

const FormItem = Form.Item

const AddExperience = ({addExperience, history}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [form] = Form.useForm();
  
  const formRef = React.useRef();
  
  const [toDateDisabled, toggleDisabled] = useState(false);
  
  const {company, title, location, from, to, current, description} = formData;
  
  const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
  
  const onSubmit = (values) =>{
    console.log(values);
    addExperience(values, history).then(res=>{
      formRef.current.resetFields();
    });
  }
  
  const change = (val)=>{
    toggleDisabled(val)
    console.log(val);
  }
  
  return (
    <Fragment>
      <PageHeader
        ghost={false}
        title="Add An Experience"
        subTitle={
          <span> <i className='fas fa-code-branch'/> Add any working experience
        that you have had in the past</span>
        }
      >
      </PageHeader>
  
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} form={form} ref={formRef}
            name="control-hooks" onFinish={onSubmit} scrollToFirstError>
        <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
          <Input placeholder="Job Title" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="company" label="Company" rules={[{ required: true }]}>
          <Input placeholder="Company" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: true }]}>
          <Input placeholder="Location" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="from" label="From Date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD"/>
        </Form.Item>
        <Form.Item name="current" label="Current School">
          <Switch onChange={change}/>
        </Form.Item>
        <Form.Item name="to" label="To Date">
          <DatePicker format="YYYY-MM-DD" disabled={toDateDisabled}/>
        </Form.Item>
        <FormItem name="description" label="Job Description">
          <Input.TextArea placeholder='Job Description'
                          autoSize={{minRows: 3, maxRows: 6}}/>
        </FormItem>
        <FormItem wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  {addExperience}
)(withRouter(AddExperience));
