import { Button } from 'antd';
import CloseIcon from 'assets/icons/close';
import { Text } from 'components/atom/Text';
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
    return (
        <div
            style={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                marginBlock: 16,
                borderBottom: `1px solid ${Colors.grey3}`,
            }}
        >
            <div style={{ height: 30, width: 30 }}>{icon}</div>
            <input
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 16,
                    color: Colors.white,
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
                        background: '#FFCC0033',
                        border: `1px solid ${Colors.primary}`,
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 16,
                    }}
                    onClick={() => setValue(input)}
                >
                    <Text style={{ color: Colors.primary }}>Save</Text>
                </Button>
            </div>
        </div>
    );
}
