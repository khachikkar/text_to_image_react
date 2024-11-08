import React from 'react';
import { GithubOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <Row justify="space-between" align="middle">
                {/* Logo and Copyright Section */}
                <Col>
                   <h2>KH Image Generator</h2>
                </Col>
                <Col>
                    <span style={{ color: '#666' }}>&copy; {new Date().getFullYear()} All Rights Reserved</span>
                </Col>
                {/* Social Media Icons */}
                <Col>
                    <a href="https://github.com/khachikkar" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                        <GithubOutlined />
                    </a>
                    <a href="https://www.instagram.com/khach.77/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                        <InstagramOutlined />
                    </a>
                    <a href="https://facebook.com/khachik.karapetyan2" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                        <FacebookOutlined />
                    </a>
                </Col>
            </Row>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#000',
    color: "#fff",
    padding: '40px 20px',
    width: '100%',
    // height: '200px',

};

const iconStyle = {
    fontSize: '20px',
    color: '#333',
    marginLeft: '10px',
};

export default Footer;