import { Button } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';
import React from 'react';

export default function ButtonOptions({
    isSelected,
    onClick,
    title,
    icon = <IconBankCard />,
}: {
    icon?: React.ReactNode;
    isSelected: boolean;
    onClick: any;
    title: string;
}) {
    return (
        <Button
            style={{
                height: 56,
                width: '48%',
                background: '#1F242F',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: '1px solid ##5F6368',
            }}
            onClick={onClick}
        >
            <div style={{ width: 28, display: 'flex', alignItems: 'center' }}>
                {icon}
            </div>
            <div
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Text>{title}</Text>
            </div>
            <div style={{ width: 30, display: 'flex', alignItems: 'center' }}>
                {isSelected && <RadioBtnSelected />}
            </div>
        </Button>
    );
}

const IconBankCard = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2 9.07906C21.3657 9.07906 21.5 8.94475 21.5 8.77906V8.70906C21.5 5.91606 19.706 4.03906 17.035 4.03906H6.964C4.294 4.03906 2.5 5.91606 2.5 8.70906V8.77906C2.5 8.94475 2.63432 9.07906 2.8 9.07906H21.2Z"
                fill="#FEFEFE"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.146 15.9191H7.177C6.763 15.9191 6.427 15.5831 6.427 15.1691C6.427 14.7551 6.763 14.4191 7.177 14.4191H10.146C10.56 14.4191 10.896 14.7551 10.896 15.1691C10.896 15.5831 10.56 15.9191 10.146 15.9191ZM2.8 10.5791C2.63432 10.5791 2.5 10.7134 2.5 10.8791V15.2891C2.5 18.0821 4.294 19.9591 6.964 19.9591H17.035C19.706 19.9591 21.5 18.0821 21.5 15.2891V10.8791C21.5 10.7134 21.3657 10.5791 21.2 10.5791H2.8Z"
                fill="#FEFEFE"
            />
        </svg>
    );
};
