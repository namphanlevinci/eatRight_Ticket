import React from 'react';
import logo_noti from '../../assets/logo_noti.png';
const Notification = ({ title, content }) => {
    return (
        <div className="content-noti">
            <div className="content-noti-left">
                <h3
                    style={{
                        textAlign: 'left',
                        fontWeight: 900,
                        color: '#000',
                    }}
                >
                    {title}
                </h3>
                <span style={{ textAlign: 'left' }}>{content}</span>
            </div>
            <img className="logo-noti" src={logo_noti} />
        </div>
    );
};

export default Notification;
