import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';
import {Form, PageHeader, Icon, Input, Checkbox, Button, DatePicker, Switch} from "antd";
// import Education from '../../img/education.svg'
import { FaGraduationCap, FaBuilding } from 'react-icons/fa';

const { RangePicker } = DatePicker;

const FormItem = Form.Item

const AddEducation = ({addEducation, history}) => {
  const [form] = Form.useForm();
  
  // const [formData, setFormData] = useState({
  //   school: '',
  //   degree: '',
  //   fieldofstudy: '',
  //   from: '',
  //   to: '',
  //   current: false,
  //   description: ''
  // });
  //
  const [toDateDisabled, toggleDisabled] = useState(false);
  //
  // const {
  //   school,
  //   degree,
  //   fieldofstudy,
  //   from,
  //   to,
  //   current,
  //   description
  // } = formData;
  
  // const onChange = e =>
  //   setFormData({...formData, [e.target.name]: e.target.value});
  //
  const onSubmit = (values) =>{
    addEducation(values, history);
  }
  
  
  const change = (val)=>{
    toggleDisabled(val)
    console.log(val);
  }
  
  return (
    <Fragment>
      <PageHeader
        ghost={false}
        title="Your Education"
      >
      </PageHeader>
      
      
      
      <PageHeader
        ghost={false}
        title="Add Your Education"
        subTitle={
          <span><FaGraduationCap /> Add any school that you
        have attended</span>
        }
      >
      </PageHeader>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} form={form}
            name="control-hooks" onFinish={onSubmit} scrollToFirstError>
        <Form.Item name="school" label="School" rules={[{ required: true }]}>
          <Input placeholder="School or Bootcamp" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="degree" label="Degree" rules={[{ required: true }]}>
          <Input placeholder="Degree or Certificate" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="fieldofstudy" label="Field of Study" rules={[{ required: true }]}>
          <Input placeholder="Field of Study" prefix={<FaBuilding />} />
        </Form.Item>
        <Form.Item name="from" label="From Date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD"/>
        </Form.Item>
        <Form.Item name="current" label="Current School">
          <Switch onChange={change}/>
        </Form.Item>
        <Form.Item name="to" label="To Date" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" disabled={toDateDisabled}/>
        </Form.Item>
        <FormItem name="description" label="Description">
          <Input.TextArea placeholder='Program Description'
                          autoSize={{minRows: 3, maxRows: 6}}/>
        </FormItem>
        {/*<div className='form-group'>*/}
        {/*  <h4>To Date</h4>*/}
        {/*  <input*/}
        {/*    type='date'*/}
        {/*    name='to'*/}
        {/*    value={to}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*    disabled={toDateDisabled ? 'disabled' : ''}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <textarea*/}
        {/*    name='description'*/}
        {/*    cols='30'*/}
        {/*    rows='5'*/}
        {/*    placeholder=''*/}
        {/*    value={description}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<input type='submit' className='btn btn-primary my-1'/>*/}
        {/*<input*/}
        {/*  type='checkbox'*/}
        {/*  name='current'*/}
        {/*  checked={current}*/}
        {/*  value={current}*/}
        {/*  onChange={() => {*/}
        {/*    setFormData({...formData, current: !current});*/}
        {/*    toggleDisabled(!toDateDisabled);*/}
        {/*  }}*/}
        {/*/>{' '}*/}
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/*<form*/}
      {/*  className='form'*/}
      {/*  onSubmit={e => {*/}
      {/*    e.preventDefault();*/}
      {/*    addEducation(formData, history);*/}
      {/*  }}*/}
      {/*>*/}
        {/*<div className='form-group'>*/}
        {/*  <input*/}
        {/*    type='text'*/}
        {/*    placeholder='* School or Bootcamp'*/}
        {/*    name='school'*/}
        {/*    value={school}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*    required*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <input*/}
        {/*    type='text'*/}
        {/*    placeholder='* Degree or Certificate'*/}
        {/*    name='degree'*/}
        {/*    value={degree}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*    required*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <input*/}
        {/*    type='text'*/}
        {/*    placeholder='Field of Study'*/}
        {/*    name='fieldofstudy'*/}
        {/*    value={fieldofstudy}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <h4>From Date</h4>*/}
        {/*  <input*/}
        {/*    type='date'*/}
        {/*    name='from'*/}
        {/*    value={from}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <p>*/}
        {/*    <input*/}
        {/*      type='checkbox'*/}
        {/*      name='current'*/}
        {/*      checked={current}*/}
        {/*      value={current}*/}
        {/*      onChange={() => {*/}
        {/*        setFormData({...formData, current: !current});*/}
        {/*        toggleDisabled(!toDateDisabled);*/}
        {/*      }}*/}
        {/*    />{' '}*/}
        {/*    Current School*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <h4>To Date</h4>*/}
        {/*  <input*/}
        {/*    type='date'*/}
        {/*    name='to'*/}
        {/*    value={to}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*    disabled={toDateDisabled ? 'disabled' : ''}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className='form-group'>*/}
        {/*  <textarea*/}
        {/*    name='description'*/}
        {/*    cols='30'*/}
        {/*    rows='5'*/}
        {/*    placeholder='Program Description'*/}
        {/*    value={description}*/}
        {/*    onChange={e => onChange(e)}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<input type='submit' className='btn btn-primary my-1'/>*/}
        {/*<Link className='btn btn-light my-1' to='/dashboard'>*/}
        {/*  Go Back*/}
        {/*</Link>*/}
      {/*</form>*/}
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  {addEducation}
)(withRouter(AddEducation));
