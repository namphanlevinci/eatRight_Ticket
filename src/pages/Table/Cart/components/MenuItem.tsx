import React from 'react';
import { StyledMenuItem } from '../styled';
import { Text } from 'components/atom/Text';
import { ColorsThemeType, useTheme } from 'context/themeContext';

type Props = {
    selected?: boolean;
    isProduct?: boolean;
    isSubCategory?: boolean;
    isDisabled?: boolean;
    theme: ColorsThemeType;
};
function getBackgroundColor({
    isProduct,
    selected,
    isSubCategory,
    isDisabled,
    theme,
}: Props) {
    if (isDisabled) {
        return '#191919';
    }
    if (isSubCategory) {
        return theme.wARNING1BG;
    }
    if (isProduct) {
        return theme.pRIMARY1;
    }
    return selected ? theme.pRIMARY2 : theme.nEUTRALSecBG;
}

function getBorderColor({
    isProduct,
    isSubCategory,
    isDisabled,
    theme,
}: Props) {
    if (isDisabled) {
        return '#6666664D';
    }
    if (isSubCategory) {
        return theme.wARNING1BG;
    }
    return !isProduct ? theme.pRIMARY2 : theme.nEUTRALLine;
}

function getTextColor({ isProduct, isSubCategory, isDisabled, theme }: Props) {
    if (isDisabled) {
        return '#333333';
    }
    if (isSubCategory) {
        return theme.pRIMARY6Primary;
    }
    if (isProduct) {
        return theme.textTitle;
    }
    return theme.pRIMARY6Primary;
}

export default function MenuItem({
    children,
    selected,
    isProduct,
    isVirtualProduct,
    isSubCategory,
    isDisabled,
}: {
    children: React.ReactNode;
    selected?: boolean;
    isProduct?: boolean;
    isSubCategory?: boolean;
    isDisabled?: boolean;
    isVirtualProduct?: boolean;
}) {
    const { theme } = useTheme();
    const backgroundColor = getBackgroundColor({
        isProduct,
        selected,
        isSubCategory,
        isDisabled,
        theme,
    });
    const borderColor = getBorderColor({
        isProduct,
        isSubCategory,
        isDisabled,
        theme,
    });
    const textColor = getTextColor({
        isProduct,
        selected,
        isSubCategory,
        isDisabled,
        theme,
    });
    return (
        <StyledMenuItem
            style={{
                background: backgroundColor,
                borderColor: borderColor,
            }}
        >
            {!isVirtualProduct && isSubCategory && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderTopLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        background: theme.pRIMARY6Primary,
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
