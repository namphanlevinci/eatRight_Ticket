import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

export default function UpDownNumberV2({
    quantity,
    setQuantity,
    isSend,
    disableUp,
}: {
    quantity: number;
    setQuantity: any;
    allowZero?: boolean;
    isSend?: boolean;
    disableUp?: boolean;
}) {
    const { theme } = useTheme();
    return (
        <Row align={'middle'}>
            <div
                style={{ height: 44, width: 44 }}
                onClick={() =>
                    !isSend && setQuantity(Math.max(quantity - 1, 0), 'decrea')
                }
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M29.9999 21.6633H9.99992C9.55789 21.6633 9.13397 21.4877 8.82141 21.1751C8.50885 20.8626 8.33325 20.4387 8.33325 19.9966C8.33325 19.5546 8.50885 19.1307 8.82141 18.8181C9.13397 18.5056 9.55789 18.33 9.99992 18.33H29.9999C30.4419 18.33 30.8659 18.5056 31.1784 18.8181C31.491 19.1307 31.6666 19.5546 31.6666 19.9966C31.6666 20.4387 31.491 20.8626 31.1784 21.1751C30.8659 21.4877 30.4419 21.6633 29.9999 21.6633Z"
                        fill="#0455BF"
                    />
                </svg>
            </div>
            <div
                style={{
                    width: 28,
                    height: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                }}
                onClick={() => {
                    console.log('openModalSetQuantity');
                }}
            >
                <Text style={{ color: theme.tEXTDisabled, fontWeight: 600 }}>
                    {quantity}
                </Text>
            </div>
            <div
                style={{ height: 44, width: 44 }}
                onClick={() =>
                    !disableUp && setQuantity(quantity + 1, 'increa')
                }
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.9999 8.33337C20.9204 8.33337 21.6666 9.07957 21.6666 10V18.3334H29.9999C30.9204 18.3334 31.6666 19.0795 31.6666 20C31.6666 20.9205 30.9204 21.6667 29.9999 21.6667H21.6666V30C21.6666 30.9205 20.9204 31.6667 19.9999 31.6667C19.0794 31.6667 18.3333 30.9205 18.3333 30V21.6667H9.99992C9.07945 21.6667 8.33325 20.9205 8.33325 20C8.33325 19.0795 9.07945 18.3334 9.99992 18.3334H18.3333V10C18.3333 9.07957 19.0794 8.33337 19.9999 8.33337Z"
                        fill="#0455BF"
                    />
                </svg>
            </div>
        </Row>
    );
}
