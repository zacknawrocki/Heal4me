import React, {Fragment, useEffect, useState} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from '../../actions/profile';
import {Button, Collapse, Form, Input, PageHeader, Select, message} from "antd";
import {FaGraduationCap} from 'react-icons/fa';

const FormItem = Form.Item
const { Option } = Select;
const { Panel } = Collapse;

const initialState = {
  company: '',
  website: '',
  location: '',
  occupation: '',
  hobbies: '',
  bio: '',
  gender: '',
  age: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const EditProfile = ({
                       createProfile,
                       getCurrentProfile,
                       profile: {profile, loading},
                       history,
                       tab
                     }) => {
  let type = profile?'edit': 'create';
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const onSubmit = (values) => {
    values.hobbies = values.hobbies.join(',')
    Object.keys(initialState).map(v=>{
      initialState[v] =  values[v] || ''
    })
    createProfile(initialState, history, type === 'edit').then(res=>{
      message.success('submit success')
      console.log(formRef.current);
      formRef.current.resetFields();
    });
  };
  
  useEffect(() => {
    formRef.current.resetFields();
    getCurrentProfile();
    console.log(profile);
    if (profile){
      if (!loading) {
        const profileData = {...initialState};
        for (const key in profile) {
          if (key in profileData) profileData[key] = profile[key];
        }
        for (const key in profile.social) {
          if (key in profileData) profileData[key] = profile.social[key];
        }
        formRef.current.setFieldsValue(profileData);
      }
    };
  }, [history, tab]);
  
  const title = 'Your Profile'
  const subTitle = type === 'edit'? 'Add some changes to your profile': 'Let\' s start from here!'
  
  return loading && !profile ? (
    <Redirect to='/dashboard'/>
  ) : (
    <Fragment>
      <PageHeader
        ghost={false}
        title={title}
        subTitle={
          <span><FaGraduationCap /> {subTitle}</span>
        }
      >
      </PageHeader>
      <Form labelCol={{ span: 4 }} ref={formRef}  wrapperCol={{ span: 14 }} form={form}
            name="control-hooks" onFinish={onSubmit} scrollToFirstError>
        <small className='form-text'>
          Give us an defination of your career
        </small>
        <Form.Item name="occupation" label="Occupation" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Select a occupation"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='0'>* Select your occupation</Option>
            <Option value='Teacher'>Teacher</Option>
            <Option value='Student'>Student</Option>
            <Option value='Mechanic'>Mechanic</Option>
            <Option value='Artist'>Artist</Option>
            <Option value='administrator'>Administrator</Option>
            <Option value='Doctor'>Doctor</Option>
            <Option value='Legal Services'>Legal Services</Option>
            <Option value='Militory'>Militory</Option>
            <Option value='Shipping'>Shipping</Option>
            <Option value='Pilot'>Pilot</Option>
            <Option value='Food Service'>Food Service</Option>
            <Option value='Retail Service'>Retail Service</Option>
            <Option value='Postal Service'>Postal Service</Option>
            <Option value='Secretary'>Secretary</Option>
            <Option value='Tourism'>Tourism</Option>
            <Option value='Author'>Author</Option>
            <Option value='Polician'>Polician</Option>
            <Option value='Electrician'>Electrician</Option>
            <Option value='Farmer'>Farmer</Option>
            <Option value='Information Services'>Information Services</Option>
    
            <Option value='Other'>Other</Option>
          </Select>
        </Form.Item>
        
        <Form.Item name="gender" label="Gender">
          <Select
            showSearch
            placeholder="Select a occupation"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option value='0'>Gender</Option>
            <Option value='Male'>Male</Option>
            <Option value='Female'>Female</Option>
            <Option value='Genderqueer'>Genderqueer/Non-Binary</Option>
            <Option value='Unknown'>Prefer not to disclose</Option>
          </Select>
         
        </Form.Item>
        <Form.Item name="age" label="Age" >
          <Input placeholder="Age" type="number" />
        </Form.Item>
        <small className='form-text'>
          Could be your own company or one you work for
        </small>
        <Form.Item name="company" label="Company" >
          <Input placeholder="Company" />
        </Form.Item>
        <small className='form-text'>
          Could be your own or a company website
        </small>
        <Form.Item name="website" label="Website" >
          <Input placeholder="Website" />
        </Form.Item>
        <small className='form-text'>
          City & state suggested (eg. Boston, MA)
        </small>
        <Form.Item name="location" label="Location" >
          <Input placeholder="Location" />
        </Form.Item>
        <small className='form-text'>
          Please use comma separated values (eg. Swimming,Basketball,Pingpong,Hiking)
        </small>
        <FormItem name="hobbies" label="Hobbies" rules={[{ required: true }]}>
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
          </Select>
          {/*<Input placeholder="Hobbies" />*/}
         
        </FormItem>
        <small className='form-text'>Tell us a little about yourself</small>
        <FormItem name="bio" label="Bio">
          <Input.TextArea placeholder='A short bio of yourself'
                          autoSize={{minRows: 3, maxRows: 6}}/>
        

        </FormItem>
        <FormItem label="links">
          <Collapse>
            <Panel header="Social Network Links" key="1">
              <FormItem name="twitter" label="Twitter">
                <Input placeholder="Twitter URL" />
              </FormItem>
              <FormItem name="facebook" label="Facebook">
                <Input placeholder="Facebook URL" />
              </FormItem>
              <FormItem name="linkedin" label="YouTube">
                <Input placeholder="YouTube URL" />
      
              </FormItem>
              <FormItem name="youtube" label="Linkedin">
                <Input placeholder="Linkedin URL" />
      
              </FormItem>
              <FormItem name="instagram" label="Instagram">
                <Input placeholder="Instagram URL" />
              </FormItem>
            </Panel>
          </Collapse>

        </FormItem>
        <FormItem wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </FormItem>
      </Form>
    </Fragment>
  );
};


EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(
  withRouter(EditProfile)
);

