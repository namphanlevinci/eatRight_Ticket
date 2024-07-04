export const getTagStyled = (status?: string) => {
    switch (status) {
        case 'sent':
            return {
                text: 'Sent',
                background: '#FFCC0033',
                textColor: '#FF9D00',
            };

        case 'cooking':
            return {
                text: 'Cooking',
                background: '#FF9D0033',
                textColor: '#FBBC05',
            };
        case 'ready':
            return {
                text: 'Ready',
                background: '#FF9D0033',
                textColor: '#34A853',
            };
        case 'done':
            return {
                text: 'Done',
                background: '#97C93D33',
                textColor: '#34A853',
            };
        case 'New':
            return {
                text: 'New',
                background: '#000000',
                textColor: '#4285F4',
            };
        case 'cancel':
            return {
                text: 'Cancel',
                background: '#EA433515',
                textColor: 'red',
            };
        default:
            return {
                text: 'Sent',
                background: '#FFCC0033',
                textColor: '#FF9D00',
            };
    }
};
