/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/display-name */
import React from 'react';
import './index.scss';

export default function ({
    title = '',
    style = {},
    leftIcon,
    rightIcon,
    onClick = () => {},
}: {
    title?: string;
    style?: any;
    leftIcon?: any;
    rightIcon?: any;
    onClick?: any;
}) {
    return (
        <div onClick={onClick} className="customButton" style={style}>
            {leftIcon ? (
                <div style={{ marginRight: 8 }}>
                    {<img src={leftIcon} alt="leftIcon" />}
                </div>
            ) : (
                <div />
            )}
            {title}
            {rightIcon ? (
                <div style={{ marginLeft: 8 }}>
                    {<img src={rightIcon} alt="rightIcon" />}
                </div>
            ) : (
                <div />
            )}
        </div>
    );
}
