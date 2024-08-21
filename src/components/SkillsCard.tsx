import React from 'react'
import './Skills.css'
function SkillsCard() {
  return (
    <>
      <h2 style={{ margin: 0 }}>Skills</h2>
      <div className='skills'>
        <div id="skill1" className="skill-box">
          <strong><p>Version Control</p></strong>
          <p>Git, GitHub</p><i className="fa-brands fa-github"></i>

        </div>
        <div id="skill2" className="skill-box">
          
        </div>
        <div id="skill3" className="skill-box">
          <strong><p>App Dev</p></strong>
          <div style={{display: 'flex', gap: '1rem'}}>
            <div className="skill"><i className="fa-brands fa-flutter"></i><p>Flutter</p></div>
            <div className="skill"><i className="fa-brands fa-react"></i><p>React Native</p></div>
          </div>

          {/* <div className="skill"><i className="fa-brands fa-swift"></i><p>SwiftUI</p></div> */}
        </div>
        <div id="skill4" className="skill-box">
          <strong><p>Languages</p></strong>
          <i className="fa-brands fa-js"></i>
          <i className="fa-brands fa-python"></i><p>Python</p>
          <p>JS/TS</p>
        </div>
        <div id="skill5" className="skill-box">
          
        </div>
      </div>
    </>
  )
}

export default SkillsCard
