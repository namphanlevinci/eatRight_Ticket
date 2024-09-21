import { ColorsThemeType } from 'context/themeContext';

export const getTagStyled = (status?: string, theme?: ColorsThemeType) => {
    if (!theme) {
        return {
            text: 'Sent',
            background: '#F8F5FF',
            textColor: '#8A54F7',
        };
    }
    switch (status) {
        case 'sent':
            return {
                text: 'Confirmed',
                background: theme.tERTIARY1BG,
                textColor: theme.tERTIARY2Default,
            };

        case 'cooking':
            return {
                text: 'Cooking',
                background: theme.wARNING1BG,
                textColor: theme.wARNING2Default,
            };
        case 'ready':
            return {
                text: 'Cooked',
                background: theme.sUCCESS1BG,
                textColor: theme.sUCCESS2Default,
            };
        case 'done':
            return {
                text: 'Done',
                background: theme.sUCCESS1BG,
                textColor: theme.sUCCESS2Default,
            };
        case 'New':
            return {
                text: 'New',
                background: theme.pRIMARY1,
                textColor: theme.pRIMARY6Primary,
            };
        case 'cancel':
            return {
                text: 'Cancel',
                background: theme.eRROR1BG,
                textColor: theme.eRROR2Default,
            };
        default:
            return {
                text: 'Confirmed',
                background: theme.tERTIARY1BG,
                textColor: theme.tERTIARY2Default,
            };
    }
};
