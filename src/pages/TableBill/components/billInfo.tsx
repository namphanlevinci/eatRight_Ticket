import { Row } from 'antd';
import { Text } from 'components/atom/Text';

export default function RenderBillInfomationRow({
    title,
    value,
    marginBlock = 18,
    textRightStyle,
}: {
    title: string;
    value: string;
    marginBlock?: number;
    textRightStyle?: React.CSSProperties;
}) {
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{ marginBlock: marginBlock }}
        >
            <Text>{title}</Text>
            <Text style={textRightStyle}>{value}</Text>
        </Row>
    );
}
