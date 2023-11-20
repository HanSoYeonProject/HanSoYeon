import React from 'react';
import logo from '../imgs/logo-removebg.png';

function Footer() {
    const footerStyle = {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: '100%',
        font: 'inherit',
        verticalAlign: 'baseline',
        display: 'block',
        backgroundColor: '#f6f5f8'
    };

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    return (
        <footer className="footer" style={footerStyle}>
            <div className="d_f m-x_1400px m_auto w_100 h_100 g_60px" style={divStyle}>
                <img className="logoImage" alt="Logo" src={logo} style={{width: '150px'}}/>
                <div className="footer-info">
                    <p className="color2 f-w_600">충청남도 아산시</p>
                    <p>한소연</p>
                    <p>Copyright(C) HanSoYeon all rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
