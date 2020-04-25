import React, {useEffect, useState} from 'react';
import {Alert} from "antd";


import {getGrade} from "../../actions/home";

const PsychologicalCounseling = (props) => {
  const [grade, setGrade] = useState(100);

  useEffect(() => {
    getGrade().then(res=>{
      setGrade(res.grade)
    })
  }, []);
  
  const goTo = (type)=>{
    switch (type) {
      case 1:
        window.open('https://suicidepreventionlifeline.org/', '_blank')
        break;
      case 2:
        window.open('https://www.veteranscrisisline.net/', '_blank')
        break;
      case 3:
        window.open('https://www.crisistextline.org/', '_blank')
        break;
    }
  }
  
  return (
    <div>
      {
        grade<50? (
          <div className="footer">
            <Alert message={
              <div>
                Psychological Counseling
              </div>
            }/>
            <div className="footer-link">
              <img src="./Counseling1.png" onClick={()=>goTo(1)} height={60} />
              <img src="./Counseling2.gif" onClick={()=>goTo(2)} height={60}/>
              <img src="./Counseling3.png" onClick={()=>goTo(3)} height={60}/>
            </div>
            {/*<h1>{grade}</h1>*/}
          </div>
        ) : null
      }
    </div>
  )
}

export default PsychologicalCounseling;
