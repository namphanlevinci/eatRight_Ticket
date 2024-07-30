import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

export default function RenderDiscountRow({
    title,
    value,
    marginBlock = 18,
    textRightStyle,
    onRightClick,
    valueDiscount,
}: {
    title: string;
    value: any;
    marginBlock?: number;
    textRightStyle?: React.CSSProperties;
    onRightClick?: () => void;
    valueDiscount?: number | string | undefined;
}) {
    const { theme } = useTheme();
    return (
        <div>
            <Row
                justify={'space-between'}
                align={'middle'}
                style={{ marginBlock: marginBlock }}
            >
                <Text>{title}</Text>
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        background: theme.nEUTRALBase,
                        width: 128,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 4,
                        paddingInline: 8,
                    }}
                    onClick={onRightClick}
                >
                    {valueDiscount ? (
                        <div style={{ height: 24, width: 24 }}>
                            <Icon />
                        </div>
                    ) : (
                        <></>
                    )}
                    <Text
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: 'bold',
                        }}
                    >
                        {value}
                    </Text>
                </div>
            </Row>
            {valueDiscount ? (
                <Row
                    justify={'space-between'}
                    align={'middle'}
                    style={{ marginBlock: marginBlock }}
                >
                    <Text style={textRightStyle}>Applied</Text>
                    <Text style={textRightStyle}>- ${valueDiscount}</Text>
                </Row>
            ) : (
                <></>
            )}
        </div>
    );
}

const Icon = () => {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.993 10.222L11.375 14.84C11.228 14.987 11.037 15.06 10.845 15.06C10.652 15.06 10.461 14.987 10.314 14.84L8.005 12.531C7.712 12.238 7.712 11.763 8.005 11.47C8.298 11.177 8.772 11.177 9.065 11.47L10.845 13.249L14.932 9.161C15.225 8.868 15.7 8.868 15.993 9.161C16.286 9.454 16.286 9.929 15.993 10.222ZM12 2.5C6.762 2.5 2.5 6.762 2.5 12C2.5 17.239 6.762 21.5 12 21.5C17.238 21.5 21.5 17.239 21.5 12C21.5 6.762 17.238 2.5 12 2.5Z"
                fill={theme.pRIMARY6Primary}
            />
        </svg>
    );
};
