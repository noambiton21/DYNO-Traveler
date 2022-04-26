import React from "react";
import "./About.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function About() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="Container">
          <div className="rows">
            <div className="col-md-6 item text">
              <h3 className="DYNO-h3">DYNO-Traveler</h3>
              <p>
                ארבעה חברים שהתחילו פרויקט משותף של בניית אתר טיולים בישראל.
              </p>
            </div>
            <div className="col-item-social">
              <a href="https://www.facebook.com">
                <FacebookIcon className="icon-facebook" />
              </a>
              <a href="https://www.instagram.com/">
                <InstagramIcon className="icon-facebook" />
              </a>
            </div>
          </div>
          <p className="copyright">Created by DYNO Team © 2021</p>
        </div>
      </footer>
    </div>
  );
}

export default About;
