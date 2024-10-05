import { Row } from 'antd';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

export default function RenderDiscountRow({
    title,
    value,
    marginBlock = 18,
    onRightClick,
    valueDiscount,
}: {
    title: string;
    value: any;
    marginBlock?: number;
    textRightStyle?: React.CSSProperties;
    onRightClick?: () => void;
    valueDiscount?: number;
}) {
    const { theme } = useTheme();
    return (
        <div>
            <Row
                justify={'space-between'}
                align={'middle'}
                style={{ marginBlock: marginBlock }}
            >
                <Text style={{ fontWeight: 600, color: theme.tEXTPrimary }}>
                    {title}
                </Text>
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        fontWeight: 600,
                        alignItems: 'center',
                        borderRadius: 4,
                    }}
                    onClick={onRightClick}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: theme.pRIMARY6Primary,
                                fontWeight: 600,
                                marginLeft: 16,
                            }}
                        >
                            {valueDiscount
                                ? `-$${-valueDiscount.toFixed(2)}`
                                : value}
                        </Text>
                        <div style={{ marginTop: 4, marginRight: '-4px' }}>
                            <ArrowRightIcon />
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );
}
