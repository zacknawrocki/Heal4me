import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import Recommendation from './Recommendation'
import PsychologicalCounseling from './Counseling'
import OtherResources from './OtherResources'
import MyPosts from './Myposts'
import {Tabs,} from "antd";

const { TabPane } = Tabs;

const Home = (props) => {
  const [defaultTab, setDefaultTab] = useState('MyPosts');
  const onTabClick = (tab)=>{
    setDefaultTab(tab)
    props.history.push('/home', {
      tab
    });
  }
  
  useEffect(()=>{
    // const tab = props.location.search.match(/tab=(.*\w+)$/)[1]
    // if (tab) {
    //   setDefaultTab(tab)
    // }
  }, [])
  
  return (
    <Fragment>
      <div className="home">
        <Tabs defaultActiveKey={defaultTab} activeKey={defaultTab} type="card" onTabClick={onTabClick}>
          <TabPane tab="My Posts" key="MyPosts">
            <MyPosts />
          </TabPane>
          <TabPane tab="News Feed" key="NewsFeed">
            <Recommendation />
            <PsychologicalCounseling />
          </TabPane>
          <TabPane tab="Other Resources" key="Other Resources">
            <OtherResources />
          </TabPane>
        </Tabs>
      </div>
    </Fragment>
  );
};

export default connect(
)(withRouter(Home));
