import PlusIcon from 'assets/icons/plusIcon';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import bellAlarm from 'assets/alarm_8721062.gif';
export default function RenderTab({
    id,
    selected,
    onClick,
    isAllowDelete,
    onRemoveItem,
    isBell,
    isPaid,
}: {
    id?: string;
    selected?: boolean;
    onClick?: () => void;
    isAllowDelete?: boolean;
    onRemoveItem?: () => void;
    isBell?: boolean;
    isPaid?: boolean;
}) {
    const { theme } = useTheme();
    return (
        <div
            style={{
                height: 38,
                width: id ? 132 : 100,
                background: !id
                    ? theme.wARNING1BG
                    : selected
                      ? theme.nEUTRALLine
                      : theme.nEUTRALSecBG,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottom: selected
                    ? `2px solid ${theme.pRIMARY6Primary}`
                    : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingInline: 16,
                marginRight: 8,
                position: 'relative',
                gap: 8,
            }}
            onClick={onClick}
        >
            {isBell && (
                <div
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: -10,
                        height: 30,
                        width: 30,
                        borderRadius: 100,
                        overflow: 'hidden',
                    }}
                >
                    <img src={bellAlarm} style={{ height: 30, width: 30 }} />
                </div>
            )}

            {id ? (
                <>
                    {isPaid ? <IconPaid /> : <IconUnPaid />}
                    <Text
                        style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: selected
                                ? theme.pRIMARY6Primary
                                : theme.textTitle,
                            fontWeight: selected ? '600' : '400',
                        }}
                    >
                        {id}
                    </Text>
                </>
            ) : (
                <>
                    <PlusIcon />
                    <Text
                        style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: theme.pRIMARY6Primary,
                            fontWeight: '600',
                        }}
                    >
                        New
                    </Text>
                </>
            )}
            {isAllowDelete && (
                <>
                    <div
                        style={{
                            position: 'absolute',
                            top: 6,
                            right: 10,
                            cursor: 'pointer',
                        }}
                        onClick={onRemoveItem}
                    >
                        <Text
                            style={{
                                color: theme.textTitle,
                                fontWeight: '400',
                            }}
                        >
                            X
                        </Text>
                    </div>
                    <div style={{ width: 20, height: 20 }} />
                </>
            )}
        </div>
    );
}

const IconPaid = () => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="16" height="16" rx="2" fill="#08875D" />
            <path
                d="M7.58656 13.44V2.16H8.57056V13.44H7.58656ZM7.95856 12.12C7.30256 12.12 6.67456 12.028 6.07456 11.844C5.47456 11.652 4.99856 11.408 4.64656 11.112L5.18656 9.9C5.52256 10.164 5.93856 10.384 6.43456 10.56C6.93056 10.736 7.43856 10.824 7.95856 10.824C8.39856 10.824 8.75456 10.776 9.02656 10.68C9.29856 10.584 9.49856 10.456 9.62656 10.296C9.75456 10.128 9.81856 9.94 9.81856 9.732C9.81856 9.476 9.72656 9.272 9.54256 9.12C9.35856 8.96 9.11856 8.836 8.82256 8.748C8.53456 8.652 8.21056 8.564 7.85056 8.484C7.49856 8.404 7.14256 8.312 6.78256 8.208C6.43056 8.096 6.10656 7.956 5.81056 7.788C5.52256 7.612 5.28656 7.38 5.10256 7.092C4.91856 6.804 4.82656 6.436 4.82656 5.988C4.82656 5.532 4.94656 5.116 5.18656 4.74C5.43456 4.356 5.80656 4.052 6.30256 3.828C6.80656 3.596 7.44256 3.48 8.21056 3.48C8.71456 3.48 9.21456 3.544 9.71056 3.672C10.2066 3.8 10.6386 3.984 11.0066 4.224L10.5146 5.436C10.1386 5.212 9.75056 5.048 9.35056 4.944C8.95056 4.832 8.56656 4.776 8.19856 4.776C7.76656 4.776 7.41456 4.828 7.14256 4.932C6.87856 5.036 6.68256 5.172 6.55456 5.34C6.43456 5.508 6.37456 5.7 6.37456 5.916C6.37456 6.172 6.46256 6.38 6.63856 6.54C6.82256 6.692 7.05856 6.812 7.34656 6.9C7.64256 6.988 7.97056 7.076 8.33056 7.164C8.69056 7.244 9.04656 7.336 9.39856 7.44C9.75856 7.544 10.0826 7.68 10.3706 7.848C10.6666 8.016 10.9026 8.244 11.0786 8.532C11.2626 8.82 11.3546 9.184 11.3546 9.624C11.3546 10.072 11.2306 10.488 10.9826 10.872C10.7426 11.248 10.3706 11.552 9.86656 11.784C9.36256 12.008 8.72656 12.12 7.95856 12.12Z"
                fill="white"
            />
        </svg>
    );
};

const IconUnPaid = () => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="16" height="16" rx="2" fill="#EAECF0" />
            <path
                d="M7.58656 13.44V2.16H8.57056V13.44H7.58656ZM7.95856 12.12C7.30256 12.12 6.67456 12.028 6.07456 11.844C5.47456 11.652 4.99856 11.408 4.64656 11.112L5.18656 9.9C5.52256 10.164 5.93856 10.384 6.43456 10.56C6.93056 10.736 7.43856 10.824 7.95856 10.824C8.39856 10.824 8.75456 10.776 9.02656 10.68C9.29856 10.584 9.49856 10.456 9.62656 10.296C9.75456 10.128 9.81856 9.94 9.81856 9.732C9.81856 9.476 9.72656 9.272 9.54256 9.12C9.35856 8.96 9.11856 8.836 8.82256 8.748C8.53456 8.652 8.21056 8.564 7.85056 8.484C7.49856 8.404 7.14256 8.312 6.78256 8.208C6.43056 8.096 6.10656 7.956 5.81056 7.788C5.52256 7.612 5.28656 7.38 5.10256 7.092C4.91856 6.804 4.82656 6.436 4.82656 5.988C4.82656 5.532 4.94656 5.116 5.18656 4.74C5.43456 4.356 5.80656 4.052 6.30256 3.828C6.80656 3.596 7.44256 3.48 8.21056 3.48C8.71456 3.48 9.21456 3.544 9.71056 3.672C10.2066 3.8 10.6386 3.984 11.0066 4.224L10.5146 5.436C10.1386 5.212 9.75056 5.048 9.35056 4.944C8.95056 4.832 8.56656 4.776 8.19856 4.776C7.76656 4.776 7.41456 4.828 7.14256 4.932C6.87856 5.036 6.68256 5.172 6.55456 5.34C6.43456 5.508 6.37456 5.7 6.37456 5.916C6.37456 6.172 6.46256 6.38 6.63856 6.54C6.82256 6.692 7.05856 6.812 7.34656 6.9C7.64256 6.988 7.97056 7.076 8.33056 7.164C8.69056 7.244 9.04656 7.336 9.39856 7.44C9.75856 7.544 10.0826 7.68 10.3706 7.848C10.6666 8.016 10.9026 8.244 11.0786 8.532C11.2626 8.82 11.3546 9.184 11.3546 9.624C11.3546 10.072 11.2306 10.488 10.9826 10.872C10.7426 11.248 10.3706 11.552 9.86656 11.784C9.36256 12.008 8.72656 12.12 7.95856 12.12Z"
                fill="#6C707A"
            />
        </svg>
    );
};
