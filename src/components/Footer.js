import React from 'react'
import { FiFacebook } from 'react-icons/fi';
import { SiInstagram, SiTwitter } from 'react-icons/si';
import { AiFillLinkedin } from 'react-icons/ai';


const Footer = () => {
    return (
        <div>
            <div className="site-footer">
                <h4 className="text-center">
                    My Blog
                </h4>
                <p className="text-center">Follow me on social media</p>
                <div className="footer-social-links">
                    <ul className="social-links-list">
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="facebook">
                                <FiFacebook />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">
                                <SiInstagram />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="twitter">
                                <SiTwitter />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin">
                                <AiFillLinkedin />
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Footer
