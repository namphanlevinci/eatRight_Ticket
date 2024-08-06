import { useTheme } from 'context/themeContext';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
import { useMediaQuery } from 'react-responsive';
export const ButtonSelectBill = ({
    title = 'Full Bill',
    onPress,
    isSelected,
}: {
    title?: string;
    onPress: () => void;
    isSelected?: boolean;
}) => {
    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    return (
        <Button
            style={{
                height: 56,
                width: isMobile ? 56 : 160,
                display: 'flex',
                border: `2px solid ${isSelected ? theme.pRIMARY6Primary : theme.nEUTRALLine}`,
                paddingInline: isMobile ? 0 : 16,
                minWidth: 'auto',
                gap: isMobile ? 0 : 8,
            }}
            onClick={onPress}
            background={
                isMobile
                    ? isSelected
                        ? theme.pRIMARY6Primary
                        : theme.pRIMARY2
                    : theme.nEUTRALBase
            }
        >
            {isMobile ? (
                <></>
            ) : isSelected ? (
                <RadioBtnSelected />
            ) : (
                <RadioIcon />
            )}
            <TextDark
                style={{
                    color: isMobile
                        ? isSelected
                            ? theme.pRIMARY1
                            : theme.pRIMARY6Primary
                        : theme.tEXTPrimary,
                    fontWeight: '600',
                }}
            >
                {isMobile
                    ? title === 'Full Bill'
                        ? 'Full'
                        : `${title}`
                    : `Guest ${title}`}
            </TextDark>
        </Button>
    );
};

const RadioIcon = () => {
    const { theme } = useTheme();
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="10" fill={theme.pRIMARY1} />
            <path
                d="M12 22.002C17.524 22.002 22.002 17.524 22.002 12.001C22.002 6.47702 17.524 1.99902 12 1.99902C6.47599 1.99902 1.99799 6.47702 1.99799 12.001C1.99799 17.524 6.47599 22.002 12 22.002ZM12 20.502C10.8726 20.5193 9.75313 20.3122 8.70658 19.8928C7.66004 19.4733 6.70738 18.8499 5.90405 18.0588C5.10072 17.2677 4.46276 16.3247 4.0273 15.2847C3.59184 14.2447 3.36759 13.1285 3.36759 12.001C3.36759 10.8736 3.59184 9.75734 4.0273 8.71735C4.46276 7.67737 5.10072 6.73438 5.90405 5.94327C6.70738 5.15217 7.66004 4.52875 8.70658 4.10929C9.75313 3.68984 10.8726 3.48273 12 3.50002C14.2388 3.5243 16.3776 4.43069 17.9521 6.02239C19.5266 7.61409 20.4098 9.76262 20.4098 12.0015C20.4098 14.2404 19.5266 16.389 17.9521 17.9807C16.3776 19.5724 14.2388 20.4777 12 20.502Z"
                fill={theme.pRIMARY6Primary}
            />
        </svg>
    );
};

const RadioBtnSelected = () => {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17Z"
                fill={theme.pRIMARY6Primary}
            />
        </svg>
    );
};
