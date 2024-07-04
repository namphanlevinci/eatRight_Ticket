import PlusIcon from 'assets/icons/plusIcon';
import { Text } from 'components/atom/Text';
import React from 'react';
import { Colors } from 'themes/colors';

export default function RenderTab({
    id,
    selected,
    onClick,
}: {
    id?: string;
    selected?: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            style={{
                height: 38,
                width: id ? 132 : 100,
                background: selected ? Colors.grey3 : Colors.grey1,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottom: selected ? '2px solid #FF9D00' : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingInline: 16,
                marginRight: 8,
            }}
            onClick={onClick}
        >
            {id ? (
                <Text
                    style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        color: selected ? Colors.primary : Colors.darkPrimary,
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
                            color: Colors.primary,
                        }}
                    >
                        New
                    </Text>
                </>
            )}
        </div>
    );
}
