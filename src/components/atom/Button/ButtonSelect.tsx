import { useTheme } from 'context/themeContext';
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

export const ButtonSelect = ({
    title,
    isSelected,
    isWarning,
    onClick,
}: {
    title: string;
    isSelected?: boolean;
    isWarning?: boolean;
    onClick?: any;
}) => {
    const { theme } = useTheme();
    return (
        <Button
            style={{
                background: isSelected ? theme.pRIMARY1 : theme.nEUTRALBase,
                color: isWarning
                    ? Colors.red
                    : isSelected
                      ? theme.pRIMARY6Primary
                      : theme.textTitle,
                fontWeight: isSelected ? '600' : '400',
                border: `1px solid ${isSelected ? theme.pRIMARY2 : theme.nEUTRALLine}`,
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
                    stroke={
                        isSelected ? theme.pRIMARY6Primary : theme.textTitle
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </Button>
    );
};
