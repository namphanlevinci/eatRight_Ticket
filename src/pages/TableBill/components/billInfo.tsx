import { Row } from 'antd';
import { Text } from 'components/atom/Text';

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
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{ marginBlock: marginBlock }}
        >
            <Text>{title}</Text>
            <Text style={textRightStyle} onClick={onRightClick}>
                {value}
            </Text>
        </Row>
    );
}
