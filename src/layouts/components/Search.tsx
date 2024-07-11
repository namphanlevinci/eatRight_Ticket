import SearchIcon from 'assets/icons/search';
import { DarkInput } from 'components/atom/Input';
import React from 'react';
import { Colors } from 'themes/colors';
import { CloseOutlined } from '@ant-design/icons';
export default function SearchSettings({
    onChangeText,
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
                height: 40,
                width: '100%',
                paddingInline: 16,
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
                    paddingLeft: 46,
                }}
                placeholder="Search "
                onChange={(e) => onChangeText && onChangeText(e.target.value)}
                value={data}
            />
            {!allowClear ? (
                <div
                    style={{
                        position: 'absolute',
                        left: 30,
                        top: 10,
                    }}
                >
                    <SearchIcon />
                </div>
            ) : (
                <div
                    style={{
                        position: 'absolute',
                        right: 50,
                        top: 22,
                    }}
                    onClick={() => onChangeText('')}
                >
                    <CloseOutlined style={{ color: 'white' }} />
                </div>
            )}
        </div>
    );
}
