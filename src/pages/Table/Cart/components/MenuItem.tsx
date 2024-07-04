import React from 'react';
import { StyledMenuItem } from '../styled';
import { Text } from 'components/atom/Text';
import { Colors } from 'themes/colors';

type Props = {
    selected?: boolean;
    isProduct?: boolean;
    isSubCategory?: boolean;
    isDisabled?: boolean;
};
function getBackgroundColor({
    isProduct,
    selected,
    isSubCategory,
    isDisabled,
}: Props) {
    if (isDisabled) {
        return '#191919';
    }
    if (isSubCategory) {
        return '#6666664D';
    }
    if (isProduct) {
        return 'transparent';
    }
    return selected ? '#FF9D0033' : '#191919';
}

function getBorderColor({ isProduct, isSubCategory, isDisabled }: Props) {
    if (isDisabled) {
        return '#6666664D';
    }
    if (isSubCategory) {
        return 'black';
    }
    return isProduct ? '#cccccc' : '#191919';
}

function getTextColor({
    isProduct,
    selected,
    isSubCategory,
    isDisabled,
}: Props) {
    if (isDisabled) {
        return '#333333';
    }
    if (isSubCategory) {
        return '#CC7E00';
    }
    if (isProduct) {
        return 'white';
    }
    return selected ? Colors.primary : 'white';
}

export default function MenuItem({
    children,
    selected,
    isProduct,
    isSubCategory,
    isDisabled,
}: {
    children: React.ReactNode;
} & Props) {
    const backgroundColor = getBackgroundColor({
        isProduct,
        selected,
        isSubCategory,
        isDisabled,
    });
    const borderColor = getBorderColor({
        isProduct,
        isSubCategory,
        isDisabled,
    });
    const textColor = getTextColor({
        isProduct,
        selected,
        isSubCategory,
        isDisabled,
    });
    return (
        <StyledMenuItem
            style={{
                background: backgroundColor,
                borderColor: borderColor,
            }}
        >
            {isSubCategory && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderTopLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        background: '#995E00',
                        height: 16,
                        width: 16,
                    }}
                >
                    {''}
                </div>
            )}
            <Text
                style={{
                    color: textColor,
                    fontSize: 16,
                    fontWeight: '500',
                    textAlign: 'center',
                    textWrap: 'wrap',
                }}
            >
                {children}
            </Text>
        </StyledMenuItem>
    );
}
