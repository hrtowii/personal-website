import React from 'react'
import './Skills.css'
function SkillsCard() {
  return (
    <>
      <h2 style={{ margin: 0 }}>Skills</h2>
      <div className='skills'>
        <div id="skill1" className="skill-box">
          <strong><p>VCS</p></strong>
          <div className="skill"><i className="fa-brands fa-github"></i><p>Git, GitHub</p></div>
        </div>
        <div id="skill2" className="skill-box">
          <strong><p>Design</p></strong>
          <div className="skill"><i className="fa-brands fa-figma"></i><p>Figma</p></div>
        </div>
        <div id="skill3" className="skill-box">
          <strong><p>App Dev</p></strong>
            <div className="skill"><i className="fa-brands fa-flutter"></i><p>Flutter</p></div>
            <div className="skill"><i className="fa-brands fa-react"></i><p>React Native</p></div>
            <div className="skill"><i className="fa-brands fa-swift"></i><p>SwiftUI</p></div>
        </div>
        <div id="skill4" className="skill-box">
          <strong><p>Languages</p></strong>
          <div className="skill"><i className="fa-brands fa-js"></i><p>JS/TS</p></div>
          <div className="skill"><i className="fa-brands fa-python"></i><p>Python</p></div>

        </div>
        <div id="skill5" className="skill-box">
          
        </div>
      </div>
    </>
  )
}

export default SkillsCard
