import React from 'react';
import { Link } from "react-router-dom";

import './Footer.css';

const Footer = () => {
  return <div className="footer">
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center ">
          <div>
            <h3>Follow us on</h3>
            <div className="footer-links">
              <ul>
                <li><Link className="footer-link-item" to="/https://www.instagram.com"><i className="bi bi-instagram"></i></Link></li>
                <li><Link className="footer-link-item" to="/https://www.twitter.com"><i className="bi bi-twitter"></i></Link></li>
                <li><Link className="footer-link-item" to="/https://www.facebook.com"><i className="bi bi-facebook"></i></Link></li>
                <li><Link className="footer-link-item" to="/https://www.linkedin.comr"><i className="bi bi-linkedin"></i></Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-center py-3">
          <div>
            <span>P.O. Box 00347, 00310 Kikuyu</span>
          </div>
        </div>

      </div>
    </div>
    <div className="copyright-payment">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6 text-center">
            <span>&copy; 2022 All copyright reserved, Freshgrocery Ltd</span>
          </div>
          <div className="col-md-6 text-center">
            <span>We accept payment through Paypal</span>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Footer;
