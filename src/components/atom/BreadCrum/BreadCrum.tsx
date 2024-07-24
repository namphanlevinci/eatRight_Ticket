import React from 'react';
import { StyledBreadCrum } from '../../../pages/Table/Cart/styled';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

export default function BreadCrum({
    isSelected,
    children,
}: {
    isSelected?: boolean;
    children: React.ReactNode;
}) {
    const { theme } = useTheme();
    return (
        <StyledBreadCrum>
            <Text
                style={{
                    color: isSelected
                        ? theme.tEXTPrimary
                        : theme.pRIMARY6Primary,
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
