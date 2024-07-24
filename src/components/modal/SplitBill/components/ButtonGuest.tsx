import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import styled from 'styled-components';

export default function ButtonGuest({
    title = 'Guest',
    onPress,
    isAdd = false,
    isHighlight = false,
    children,
}: {
    title?: string;
    onPress: any;
    isAdd?: boolean;
    isHighlight?: boolean;
    children?: React.ReactNode;
}) {
    const { theme } = useTheme();
    return (
        <ButtonGuestContainer
            style={{
                backgroundColor: isHighlight
                    ? theme.pRIMARY2
                    : theme.nEUTRALBase,
                border: `1px solid ${theme.nEUTRALLine}`,
            }}
        >
            <Container onClick={onPress}>
                {isHighlight ? (
                    <PlusIconBlue />
                ) : isAdd ? (
                    <PlusIcon />
                ) : (
                    <GuestIcon />
                )}
                {isHighlight ? (
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#0A58CA',
                        }}
                    >
                        Move to {title}
                    </Text>
                ) : isAdd ? (
                    <Text>Add guest</Text>
                ) : (
                    <Text>{title}</Text>
                )}
            </Container>
            {children}
        </ButtonGuestContainer>
    );
}

const ButtonGuestContainer = styled.div`
    min-height: 78px;

    background: #121212;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding-inline: 10px;
    cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 78px;
    gap: 10px;
`;
const PlusIcon = () => {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
        >
            <path
                d="M13 11V11.5H13.5H18.5C18.7762 11.5 19 11.7238 19 12C19 12.2762 18.7762 12.5 18.5 12.5H13.5H13V13V18C13 18.2762 12.7762 18.5 12.5 18.5C12.2238 18.5 12 18.2762 12 18V13V12.5H11.5H6.5C6.22386 12.5 6 12.2762 6 12C6 11.7238 6.22386 11.5 6.5 11.5H11.5H12V11V6C12 5.72386 12.2238 5.5 12.5 5.5C12.7762 5.5 13 5.72386 13 6V11Z"
                fill="black"
                stroke={theme.tEXTPrimary}
            />
        </svg>
    );
};

const GuestIcon = () => {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
        >
            <path
                d="M9.5 11C12.2614 11 14.5 8.76142 14.5 6C14.5 3.23858 12.2614 1 9.5 1C6.73858 1 4.5 3.23858 4.5 6C4.5 8.76142 6.73858 11 9.5 11Z"
                stroke={theme.tEXTPrimary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.5 19C17.5 16.8783 16.6571 14.8434 15.1569 13.3431C13.6566 11.8429 11.6217 11 9.5 11C7.37827 11 5.34344 11.8429 3.84315 13.3431C2.34285 14.8434 1.5 16.8783 1.5 19"
                stroke={theme.tEXTPrimary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const PlusIconBlue = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12.5 11V11.5H13H18C18.2762 11.5 18.5 11.7238 18.5 12C18.5 12.2762 18.2762 12.5 18 12.5H13H12.5V13V18C12.5 18.2762 12.2762 18.5 12 18.5C11.7238 18.5 11.5 18.2762 11.5 18V13V12.5H11H6C5.72386 12.5 5.5 12.2762 5.5 12C5.5 11.7238 5.72386 11.5 6 11.5H11H11.5V11V6C11.5 5.72386 11.7238 5.5 12 5.5C12.2762 5.5 12.5 5.72386 12.5 6V11Z"
                fill="#0A58CA"
                stroke="#0A58CA"
            />
        </svg>
    );
};
