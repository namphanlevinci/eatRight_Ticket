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
                      ? theme.pRIMARY1
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
                            color: theme.textTitle,
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
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.37984 18.16V1.24H10.8558V18.16H9.37984ZM9.93784 16.18C8.95384 16.18 8.01184 16.042 7.11184 15.766C6.21184 15.478 5.49784 15.112 4.96984 14.668L5.77984 12.85C6.28384 13.246 6.90784 13.576 7.65184 13.84C8.39584 14.104 9.15784 14.236 9.93784 14.236C10.5978 14.236 11.1318 14.164 11.5398 14.02C11.9478 13.876 12.2478 13.684 12.4398 13.444C12.6318 13.192 12.7278 12.91 12.7278 12.598C12.7278 12.214 12.5898 11.908 12.3138 11.68C12.0378 11.44 11.6778 11.254 11.2338 11.122C10.8018 10.978 10.3158 10.846 9.77584 10.726C9.24784 10.606 8.71384 10.468 8.17384 10.312C7.64584 10.144 7.15984 9.934 6.71584 9.682C6.28384 9.418 5.92984 9.07 5.65384 8.638C5.37784 8.206 5.23984 7.654 5.23984 6.982C5.23984 6.298 5.41984 5.674 5.77984 5.11C6.15184 4.534 6.70984 4.078 7.45384 3.742C8.20984 3.394 9.16384 3.22 10.3158 3.22C11.0718 3.22 11.8218 3.316 12.5658 3.508C13.3098 3.7 13.9578 3.976 14.5098 4.336L13.7718 6.154C13.2078 5.818 12.6258 5.572 12.0258 5.416C11.4258 5.248 10.8498 5.164 10.2978 5.164C9.64984 5.164 9.12184 5.242 8.71384 5.398C8.31784 5.554 8.02384 5.758 7.83184 6.01C7.65184 6.262 7.56184 6.55 7.56184 6.874C7.56184 7.258 7.69384 7.57 7.95784 7.81C8.23384 8.038 8.58784 8.218 9.01984 8.35C9.46384 8.482 9.95584 8.614 10.4958 8.746C11.0358 8.866 11.5698 9.004 12.0978 9.16C12.6378 9.316 13.1238 9.52 13.5558 9.772C13.9998 10.024 14.3538 10.366 14.6178 10.798C14.8938 11.23 15.0318 11.776 15.0318 12.436C15.0318 13.108 14.8458 13.732 14.4738 14.308C14.1138 14.872 13.5558 15.328 12.7998 15.676C12.0438 16.012 11.0898 16.18 9.93784 16.18Z"
                fill="#08875D"
            />
        </svg>
    );
};

const IconUnPaid = () => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.37984 18.16V1.24H10.8558V18.16H9.37984ZM9.93784 16.18C8.95384 16.18 8.01184 16.042 7.11184 15.766C6.21184 15.478 5.49784 15.112 4.96984 14.668L5.77984 12.85C6.28384 13.246 6.90784 13.576 7.65184 13.84C8.39584 14.104 9.15784 14.236 9.93784 14.236C10.5978 14.236 11.1318 14.164 11.5398 14.02C11.9478 13.876 12.2478 13.684 12.4398 13.444C12.6318 13.192 12.7278 12.91 12.7278 12.598C12.7278 12.214 12.5898 11.908 12.3138 11.68C12.0378 11.44 11.6778 11.254 11.2338 11.122C10.8018 10.978 10.3158 10.846 9.77584 10.726C9.24784 10.606 8.71384 10.468 8.17384 10.312C7.64584 10.144 7.15984 9.934 6.71584 9.682C6.28384 9.418 5.92984 9.07 5.65384 8.638C5.37784 8.206 5.23984 7.654 5.23984 6.982C5.23984 6.298 5.41984 5.674 5.77984 5.11C6.15184 4.534 6.70984 4.078 7.45384 3.742C8.20984 3.394 9.16384 3.22 10.3158 3.22C11.0718 3.22 11.8218 3.316 12.5658 3.508C13.3098 3.7 13.9578 3.976 14.5098 4.336L13.7718 6.154C13.2078 5.818 12.6258 5.572 12.0258 5.416C11.4258 5.248 10.8498 5.164 10.2978 5.164C9.64984 5.164 9.12184 5.242 8.71384 5.398C8.31784 5.554 8.02384 5.758 7.83184 6.01C7.65184 6.262 7.56184 6.55 7.56184 6.874C7.56184 7.258 7.69384 7.57 7.95784 7.81C8.23384 8.038 8.58784 8.218 9.01984 8.35C9.46384 8.482 9.95584 8.614 10.4958 8.746C11.0358 8.866 11.5698 9.004 12.0978 9.16C12.6378 9.316 13.1238 9.52 13.5558 9.772C13.9998 10.024 14.3538 10.366 14.6178 10.798C14.8938 11.23 15.0318 11.776 15.0318 12.436C15.0318 13.108 14.8458 13.732 14.4738 14.308C14.1138 14.872 13.5558 15.328 12.7998 15.676C12.0438 16.012 11.0898 16.18 9.93784 16.18Z"
                fill="#6C707A"
            />
        </svg>
    );
};
