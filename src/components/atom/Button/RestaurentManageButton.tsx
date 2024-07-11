import { BASE_ROUTER } from 'constants/router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'themes/colors';

export const Button = styled.div({
    height: 56,
    width: 246,
    // background: Colors.grey3,
    // borderRadius: 8,
    padding: '16px',
    color: Colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '400',

    border: '1px solid #40464B',
    cursor: 'pointer',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
});

export const RestaurentManageButton = ({
    title,
    to = BASE_ROUTER.SETTINGS,
    isSelected,
    isWarning,
    onClick,
}: {
    title: string;
    isSelected?: boolean;
    isWarning?: boolean;
    to?: any;
    onClick?: any;
}) => {
    return (
        <Link to={to}>
            <Button
                style={{
                    background: isSelected
                        ? Colors.primary_dark_20
                        : 'transparent',
                    color: isWarning
                        ? Colors.red
                        : isSelected
                          ? Colors.primary
                          : Colors.white,
                    fontWeight: isSelected ? '600' : '400',
                }}
                onClick={onClick}
            >
                {title}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="10"
                    viewBox="0 0 7 10"
                    fill="none"
                >
                    <path
                        d="M1.66666 1L5.66666 5L1.66666 9"
                        stroke={isSelected ? Colors.primary : Colors.white}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Button>
        </Link>
    );
};
