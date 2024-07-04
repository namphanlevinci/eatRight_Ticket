import SearchIcon from 'assets/icons/search';
import { DarkInput } from 'components/atom/Input';
import React from 'react';
import { Colors } from 'themes/colors';
import { CloseOutlined } from '@ant-design/icons';
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
    return (
        <div
            style={{
                height: height ? height : 64,
                width: '100%',
                paddingInline: 20,
                position: 'relative',
            }}
        >
            <DarkInput
                style={{
                    background: Colors.grey3,
                    height: '100%',
                    border: 0,
                    color: 'white',
                    paddingInline: 16,
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
