import { BASE_ROUTER } from 'constants/router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'themes/colors';

export const Button = styled.div({
    minHeight: 56,
    minWidth: 102,
    background: Colors.grey3,
    borderRadius: 8,
    padding: '16px',
    color: Colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    marginBlock: 12,
    border: 'none',
    cursor: 'pointer',
});

export const SettingButton = ({
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
                        : Colors.grey3,
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
