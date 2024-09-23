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
}: {
    id?: string;
    selected?: boolean;
    onClick?: () => void;
    isAllowDelete?: boolean;
    onRemoveItem?: () => void;
    isBell?: boolean;
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
                    #{id}
                </Text>
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
