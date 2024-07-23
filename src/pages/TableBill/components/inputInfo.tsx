import { Button } from 'antd';
import CloseIcon from 'assets/icons/close';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useState } from 'react';
import { Colors } from 'themes/colors';

export default function InputInfoCart({
    icon,
    value = '',
    setValue,
    placeholder = 'Customer Name',
}: {
    icon?: any;
    value: string;
    setValue: any;
    placeholder?: string;
}) {
    const [input, setInput] = useState(value);
    useEffect(() => {
        setInput(value);
    }, [value]);
    const { theme } = useTheme();
    return (
        <div
            style={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                marginBlock: 16,
                borderBottom: `1px solid ${theme.nEUTRALLine}`,
                background: theme.nEUTRALBase,
                paddingLeft: 8,
            }}
        >
            <div style={{ height: 30, width: 30, marginRight: 10 }}>{icon}</div>
            <input
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 16,
                    color: theme.tEXTPrimary,
                }}
                value={input}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
            />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ cursor: 'pointer' }} onClick={() => setInput('')}>
                    <CloseIcon />
                </div>
                <Button
                    style={{
                        width: 60,
                        height: 36,
                        background: theme.pRIMARY1,
                        border: `1px solid ${theme.pRIMARY6Primary}`,
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 16,
                    }}
                    onClick={() => setValue(input)}
                >
                    <Text
                        style={{
                            color: theme.pRIMARY6Primary,
                            fontWeight: '600',
                        }}
                    >
                        Save
                    </Text>
                </Button>
            </div>
        </div>
    );
}
