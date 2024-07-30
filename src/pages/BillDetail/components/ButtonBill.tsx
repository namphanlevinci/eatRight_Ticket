import { useTheme } from 'context/themeContext';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
export const ButtonBill = ({
    title,
    onPress,
}: {
    title: string;
    onPress: () => void;
}) => {
    const { theme } = useTheme();
    return (
        <Button
            style={{
                height: 56,
                width: 160,
                display: 'flex',
                border: '0px',
            }}
            onClick={onPress}
            background={theme.pRIMARY6Primary}
        >
            <TextDark
                style={{
                    color: theme.pRIMARY1,
                    fontWeight: '600',
                }}
            >
                {title}
            </TextDark>
        </Button>
    );
};
