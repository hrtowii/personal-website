import React from "react";
import "./Skills.css";
function SkillsCard() {
  return (
    <>
      <h2 style={{ margin: 0 }}>Skills</h2>
      <div className="skills">
        <div id="skill3" className="skill-box">
          <strong>
            <p>App Dev</p>
          </strong>
          <div className="skillflex">
            <div className="skillleft">
              <div className="skill">
                <i className="fa-brands fa-react"></i>
                <p>React Native</p>
              </div>
              <div className="skill">
                <i className="fa-brands fa-flutter"></i>
                <p>Flutter</p>
              </div>
            </div>
            <div className="skillright">
              <div className="skill">
                <i className="fa-brands fa-swift"></i>
                <p>SwiftUI</p>
              </div>
              <div className="skill">
                <img
                  className="fa-brands"
                  src="https://developer.android.com/static/events/dev-challenge/images/dev-challenge_jetpack-compose-asset.svg"
                ></img>
                <p>Jetpack Compose</p>
              </div>
            </div>
          </div>
        </div>
        <div id="skill5" className="skill-box">
          <strong>
            <p>Web Dev</p>
          </strong>
          <div className="skillflex">
            <div className="skillleft">
              <div className="skill">
                <i className="fa-brands fa-react"></i>
                <p>React</p>
              </div>
              <div className="skill">
                <img src="/nextjs.svg" className="fa-brands"></img>
                <p>NextJS</p>
              </div>
            </div>
            <div className="skillright">
              <div className="skill">
                <img
                  src="https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif"
                  className="fa-brands"
                ></img>
                <p>Angular</p>
              </div>
              <div className="skill">
                <img
                  src="https://www.svgrepo.com/show/354210/prisma.svg"
                  className="fa-brands prisma"
                ></img>
                <p>Prisma</p>
              </div>
            </div>
          </div>
        </div>
        <div id="skill4" className="skill-box">
          <strong>
            <p>Languages</p>
          </strong>
          <div className="skillflex">
            <div className="skillleft">
              <div className="skill">
                <i className="fa-brands fa-js"></i>
                <p>JS/TS</p>
              </div>
              <div className="skill">
                <i className="fa-brands fa-python"></i>
                <p>Python</p>
              </div>
            </div>
            <div className="skillright">
              <div className="skill">
                <i className="fa-brands fa-js"></i>
                <p>JS/TS</p>
              </div>
              <div className="skill">
                <i className="fa-brands fa-python"></i>
                <p>Python</p>
              </div>
            </div>
          </div>
        </div>

        <div id="skill1" className="skill-box">
          <strong>
            <p>VCS</p>
          </strong>
          <div className="skill">
            <i className="fa-brands fa-github"></i>
            <p>Git(Hub)</p>
          </div>
        </div>
        <div id="skill2" className="skill-box">
          <strong>
            <p>Design</p>
          </strong>
          <div className="skill">
            <i className="fa-brands fa-figma"></i>
            <p>Figma</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkillsCard;
