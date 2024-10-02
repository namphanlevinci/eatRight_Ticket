import { Button } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { Input } from "antd";

export default function ButtonOptions({
    isSelected,
    onClick,
    title,
    icon = <IconBankCard />,
    selectedPaymentMethod,
    note,
    onChangeNote
}: {
    icon?: React.ReactNode;
    isSelected: boolean;
    onClick: any;
    title: string;
    selectedPaymentMethod: string,
    note: string,
    onChangeNote: any
}) {
    const { theme } = useTheme();
    return (
        <div style={{
            width: "48%",
            background: theme.nEUTRALBase,
            borderRadius: 8,
            border: `1px solid ${theme.nEUTRALLine}`,
        }}>
            <Button
                style={{
                    height: 56,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    boxShadow: "none"
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
            {
                selectedPaymentMethod == "other" && title == "Other" &&
                <div style={{ width: "100%", paddingBottom: 8, display: "flex", paddingRight: 24}}>
                    <Input
                        placeholder="Note here)"
                        value={note}
                        onChange={onChangeNote}
                        style={{ height: 50, flex: 1, marginLeft: 40 }}
                    />
                </div>
            }
        </div>
    );
}

const IconBankCard = () => {
    const { theme } = useTheme();
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
                fill={theme.tEXTPrimary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.146 15.9191H7.177C6.763 15.9191 6.427 15.5831 6.427 15.1691C6.427 14.7551 6.763 14.4191 7.177 14.4191H10.146C10.56 14.4191 10.896 14.7551 10.896 15.1691C10.896 15.5831 10.56 15.9191 10.146 15.9191ZM2.8 10.5791C2.63432 10.5791 2.5 10.7134 2.5 10.8791V15.2891C2.5 18.0821 4.294 19.9591 6.964 19.9591H17.035C19.706 19.9591 21.5 18.0821 21.5 15.2891V10.8791C21.5 10.7134 21.3657 10.5791 21.2 10.5791H2.8Z"
                fill={theme.tEXTPrimary}
            />
        </svg>
    );
};
