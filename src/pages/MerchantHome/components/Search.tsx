import SearchIcon from 'assets/icons/search';
import { DarkInput } from 'components/atom/Input';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useTheme } from 'context/themeContext';
export default function SearchTable({
    onChangeText,
    height,
    allowClear,
    data,
}: {
    onChangeText?: any;
    height?: number;
    allowClear?: boolean;
    data?: string;
}) {
    const { theme } = useTheme();
    return (
        <div
            style={{
                height: height ? height : 64,
                width: '100%',
                paddingInline: 16,
                position: 'relative',
            }}
        >
            <DarkInput
                style={{
                    height: '100%',
                    border: `1px solid ${theme.nEUTRALLine}`,
                    paddingInline: 16,
                    backgroundColor: theme.nEUTRALBase,
                }}
                placeholder="Search "
                onChange={(e) => onChangeText && onChangeText(e.target.value)}
                value={data}
            />
            {!allowClear ? (
                <div
                    style={{
                        position: 'absolute',
                        right: 50,
                        top: height ? (height - 20) / 2 : 22,
                    }}
                >
                    <SearchIcon />
                </div>
            ) : (
                <div
                    style={{
                        position: 'absolute',
                        right: 50,
                        top: height ? (height - 20) / 2 : 22,
                    }}
                    onClick={() => onChangeText('')}
                >
                    <CloseOutlined style={{ color: 'white' }} />
                </div>
            )}
        </div>
    );
}
