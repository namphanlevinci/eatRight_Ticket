import { Text } from 'components/atom/Text';
import IconPaid from './iconPaid';
import { useTheme } from 'context/themeContext';

export const RenderGuest = ({
    title,
    money,
    isPaid,
    isSelect,
    onClick,
}: {
    title: string;
    money: number;
    isPaid?: boolean;
    isSelect?: boolean;
    onClick: () => void;
}) => {
    const { theme } = useTheme();
    return (
        <div
            style={{
                width: '100%',
                border: `1px solid ${isSelect ? theme.pRIMARY2 : theme.nEUTRALLine} `,
                background: isSelect ? theme.pRIMARY1 : theme.nEUTRALBase,
                padding: 8,
                borderRadius: 8,
                marginBottom: 16,
                cursor: 'pointer',
            }}
            onClick={() => onClick()}
        >
            <Text
                style={{
                    color: isSelect ? theme.pRIMARY6Primary : theme.textTitle,
                    fontWeight: '600',
                }}
            >
                Guest {title}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isPaid && <IconPaid />}
                <Text style={{ color: theme.tEXTSecondary }}>
                    {isPaid ? 'Paid' : `$ ${money.toFixed(2)}`}
                </Text>
            </div>
        </div>
    );
};
