import { useTheme } from 'context/themeContext';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
import { useMediaQuery } from 'react-responsive';
import { Spin } from 'antd';
export const ButtonBill = ({
    title,
    onPress,
    loading,
    isSmall = false,
}: {
    title: string;
    onPress: () => void;
    loading?: boolean;
    isSmall?: boolean;
}) => {
    const { theme } = useTheme();
    const isMobile = isSmall
        ? isSmall
        : useMediaQuery({ query: '(max-width: 767px)' });
    const Icon = (title: string) => {
        return title === 'Print' ? (
            <PrintIcon />
        ) : title === 'Sms' ? (
            <SMSIcon />
        ) : title === 'Email' ? (
            <EmailIcon />
        ) : title === 'Void' || title === 'Refund' ? (
            <VoidIcon />
        ) : null;
    };
    if (loading) {
        return (
            <Button
                style={{
                    height: 56,
                    width: isMobile ? 56 : 160,
                    display: 'flex',
                    border: '0px',
                    minWidth: 'auto',
                    padding: isMobile ? 0 : '16px',
                    paddingInline: isMobile ? 10 : 0,
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 0 : 10,
                }}
                onClick={onPress}
                background={theme.pRIMARY6Primary}
                disabled={loading}
            >
                <Spin />
            </Button>
        );
    }
    return (
        <Button
            style={{
                height: 56,
                width: isMobile ? 56 : 160,
                display: 'flex',
                border: '0px',
                minWidth: 'auto',
                padding: isMobile ? 0 : '16px',
                paddingInline: isMobile ? 10 : 0,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 0 : 10,
            }}
            onClick={onPress}
            background={
                title === 'Void' ? theme.eRROR2Default : theme.pRIMARY6Primary
            }
            disabled={loading}
        >
            {Icon(title) && (
                <div style={{ height: 24, width: 24 }}>{Icon(title)}</div>
            )}
            <div style={{ width: 50 }}>
                <TextDark
                    style={{
                        color: theme.pRIMARY1,
                        fontWeight: isMobile ? '400' : '600',
                        fontSize: isMobile ? 14 : 16,
                        lineHeight: isMobile ? '14px' : '20px',
                    }}
                >
                    {title}
                </TextDark>
            </div>
        </Button>
    );
};

const PrintIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M18 17.5V18.75C18 19.3467 17.7629 19.919 17.341 20.341C16.919 20.7629 16.3467 21 15.75 21H8.25C7.65326 21 7.08097 20.7629 6.65901 20.341C6.23705 19.919 6 19.3467 6 18.75V17.499L4.25 17.5C3.65326 17.5 3.08097 17.2629 2.65901 16.841C2.23705 16.419 2 15.8467 2 15.25V9.254C2 8.39205 2.34241 7.5654 2.9519 6.9559C3.5614 6.34641 4.38805 6.004 5.25 6.004L5.999 6.003L6 5.25C6 4.65326 6.23705 4.08097 6.65901 3.65901C7.08097 3.23705 7.65326 3 8.25 3H15.752C16.3487 3 16.921 3.23705 17.343 3.65901C17.7649 4.08097 18.002 4.65326 18.002 5.25V6.003H18.752C19.614 6.00353 20.4405 6.34605 21.0502 6.95537C21.6599 7.56469 22.0029 8.39103 22.004 9.253L22.007 15.25C22.007 15.8464 21.7702 16.4184 21.3487 16.8403C20.9272 17.2622 20.3554 17.4995 19.759 17.5H18ZM15.75 13.5H8.25C8.05109 13.5 7.86032 13.579 7.71967 13.7197C7.57902 13.8603 7.5 14.0511 7.5 14.25V18.75C7.5 19.164 7.836 19.5 8.25 19.5H15.75C15.9489 19.5 16.1397 19.421 16.2803 19.2803C16.421 19.1397 16.5 18.9489 16.5 18.75V14.25C16.5 14.0511 16.421 13.8603 16.2803 13.7197C16.1397 13.579 15.9489 13.5 15.75 13.5ZM15.752 4.5H8.25C8.05109 4.5 7.86032 4.57902 7.71967 4.71967C7.57902 4.86032 7.5 5.05109 7.5 5.25L7.499 6.003H16.502V5.25C16.502 5.05109 16.423 4.86032 16.2823 4.71967C16.1417 4.57902 15.9509 4.5 15.752 4.5Z"
                fill="#E6F5FF"
            />
        </svg>
    );
};

const SMSIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.25 5C2.25 4.27065 2.53973 3.57118 3.05546 3.05546C3.57118 2.53973 4.27065 2.25 5 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V15C21.75 15.7293 21.4603 16.4288 20.9445 16.9445C20.4288 17.4603 19.7293 17.75 19 17.75H7.961C7.581 17.75 7.222 17.923 6.985 18.22L4.655 21.133C3.857 22.129 2.25 21.566 2.25 20.29V5ZM6.25 12C6.25 11.8011 6.32902 11.6103 6.46967 11.4697C6.61032 11.329 6.80109 11.25 7 11.25H17C17.1989 11.25 17.3897 11.329 17.5303 11.4697C17.671 11.6103 17.75 11.8011 17.75 12C17.75 12.1989 17.671 12.3897 17.5303 12.5303C17.3897 12.671 17.1989 12.75 17 12.75H7C6.80109 12.75 6.61032 12.671 6.46967 12.5303C6.32902 12.3897 6.25 12.1989 6.25 12ZM7 7.25C6.80109 7.25 6.61032 7.32902 6.46967 7.46967C6.32902 7.61032 6.25 7.80109 6.25 8C6.25 8.19891 6.32902 8.38968 6.46967 8.53033C6.61032 8.67098 6.80109 8.75 7 8.75H13C13.1989 8.75 13.3897 8.67098 13.5303 8.53033C13.671 8.38968 13.75 8.19891 13.75 8C13.75 7.80109 13.671 7.61032 13.5303 7.46967C13.3897 7.32902 13.1989 7.25 13 7.25H7Z"
                fill="#E6F5FF"
            />
        </svg>
    );
};

const EmailIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M13 19C13 15.69 15.69 13 19 13C20.1 13 21.12 13.3 22 13.81V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H13.09C13.04 19.67 13 19.34 13 19ZM4 8V6L12 11L20 6V8L12 13L4 8ZM20 22V20H16V18H20V16L23 19L20 22Z"
                fill="#E6F5FF"
            />
        </svg>
    );
};

const VoidIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M13.91 2.91L11.83 5H14C16.1217 5 18.1566 5.84285 19.6569 7.34315C21.1571 8.84344 22 10.8783 22 13H20C20 11.4087 19.3679 9.88258 18.2426 8.75736C17.1174 7.63214 15.5913 7 14 7H11.83L13.92 9.09L12.5 10.5L8 6L9.41 4.59L12.5 1.5L13.91 2.91ZM2 12V22H18V12H2ZM4 18.56V15.45C4.60112 15.1009 5.10087 14.6011 5.45 14H14.55C14.8991 14.6011 15.3989 15.1009 16 15.45V18.56C15.4075 18.9091 14.915 19.4051 14.57 20H5.45C5.0995 19.4025 4.59986 18.9064 4 18.56ZM10 19C10.828 19 11.5 18.105 11.5 17C11.5 15.895 10.828 15 10 15C9.172 15 8.5 15.895 8.5 17C8.5 18.105 9.172 19 10 19Z"
                fill="#FEF1F2"
            />
        </svg>
    );
};
