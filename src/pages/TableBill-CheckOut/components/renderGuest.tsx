import { Text } from 'components/atom/Text';
import IconPaid from './iconPaid';

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
    return (
        <div
            style={{
                width: '100%',
                border: `1px solid ${isSelect ? '#CC7D00' : '#5F6368'} `,
                background: isSelect ? 'rgba(255, 157, 0, 0.20)' : '#161B26',
                padding: 8,
                borderRadius: 8,
                marginBottom: 16,
                cursor: 'pointer',
            }}
            onClick={() => !isPaid && onClick()}
        >
            <Text>Guest {title}</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isPaid && <IconPaid />}
                <Text style={{ color: isSelect ? 'white' : '#666' }}>
                    $ {money.toFixed(2)}
                </Text>
            </div>
        </div>
    );
};
