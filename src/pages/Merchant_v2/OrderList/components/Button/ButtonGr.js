import { CloseCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
function ButtonGr(props) {
    const { handleClick } = props;

    const handleClickReject = () => {
        handleClick();
    };
    return (
        <div
            className="group-button"
            style={{
                marginTop: '5px',
                paddingBottom: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <button key="1" onClick={handleClickReject}>
                <CloseCircleOutlined />
                Reject
            </button>
        </div>
    );
}

export default ButtonGr;
