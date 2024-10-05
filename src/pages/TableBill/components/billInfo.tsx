import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

export default function RenderBillInfomationRow({
    title,
    value,
    marginBlock = 18,
    textRightStyle,
    onRightClick,
}: {
    title: string;
    value: any;
    marginBlock?: number;
    textRightStyle?: React.CSSProperties;
    onRightClick?: () => void;
}) {
    const { theme } = useTheme();
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{ marginBlock: marginBlock }}
        >
            <Text style={{ fontWeight: 600, color: theme.tEXTPrimary }}>
                {title}
            </Text>
            <Text
                style={{
                    fontWeight: 600,
                    color: theme.tEXTPrimary,
                    ...textRightStyle,
                }}
                onClick={onRightClick}
            >
                {value}
            </Text>
        </Row>
    );
}
