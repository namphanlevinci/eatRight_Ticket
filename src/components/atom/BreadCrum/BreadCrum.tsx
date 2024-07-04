import React from 'react';
import { StyledBreadCrum } from '../../../pages/Table/Cart/styled';
import { Text } from 'components/atom/Text';

export default function BreadCrum({
    isSelected,
    children,
}: {
    isSelected?: boolean;
    children: React.ReactNode;
}) {
    return (
        <StyledBreadCrum
            style={{
                backgroundColor: isSelected ? '#FF9D0033' : 'transparent',
                borderColor: isSelected ? 'black' : 'white',
            }}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '400',
                    textAlign: 'center',
                }}
            >
                {children}
            </Text>
        </StyledBreadCrum>
    );
}
