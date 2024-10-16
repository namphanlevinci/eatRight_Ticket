import React from 'react';
import { Colors } from 'themes/colors';

interface ButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    name?: string;
    htmlType?: string;
}
const ButtonV2 = ({ style, children, ...props }: ButtonProps) => {
    return (
        <button
            style={{
                outline: 'none',
                border: 'none',
                padding: '13px 18px',
                borderRadius: 6,
                backgroundColor: Colors.grey3,
                ...style,
            }}
            {...props}
        >
            <span
                style={{
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 600,
                }}
            >
                {children}
            </span>
        </button>
    );
};

export default ButtonV2;
