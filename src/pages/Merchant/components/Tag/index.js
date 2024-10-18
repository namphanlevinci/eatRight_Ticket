import { colorsData } from 'pages/Merchant/constant';
import React from 'react';

export default function Tag({ type = 'new', title, background, color }) {
    return (
        <div
            style={{
                height: 24,
                width: 80,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 8,
                background: background
                    ? background
                    : `var(${colorsData[type]?.background || '--tertiary-1-bg'})`,
                color: color
                    ? color
                    : `var(${colorsData[type]?.borderColor || '--tertiary-2-default'})`,
                fontWeight: 600,
            }}
        >
            {title}
        </div>
    );
}
