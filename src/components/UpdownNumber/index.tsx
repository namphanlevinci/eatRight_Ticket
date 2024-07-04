import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import { Colors } from 'themes/colors';

export default function UpDownNumber({
    quantity,
    setQuantity,
    isSend,
}: {
    quantity: number;
    setQuantity: any;
    allowZero?: boolean;
    isSend?: boolean;
}) {
    return (
        <Row align={'middle'}>
            <div
                style={{ height: 44, width: 44 }}
                onClick={() =>
                    !isSend && setQuantity(quantity >= 1 ? quantity - 1 : 0)
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.58337 22C4.58337 12.3804 12.3804 4.58331 22 4.58331C31.6197 4.58331 39.4167 12.3804 39.4167 22C39.4167 31.6178 31.6197 39.4166 22 39.4166C12.3804 39.4166 4.58337 31.6178 4.58337 22ZM15.9502 20.6286C15.1908 20.6286 14.5752 21.2441 14.5752 22.0036C14.5752 22.763 15.1908 23.3786 15.9502 23.3786H28.0495C28.809 23.3786 29.4245 22.763 29.4245 22.0036C29.4245 21.2441 28.809 20.6286 28.0495 20.6286H15.9502Z"
                        fill={isSend ? Colors.grey3 : '#FF9D00'}
                    />
                </svg>
            </div>
            <div
                style={{
                    width: 28,
                    height: 28,
                    background: '#663F00',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                }}
            >
                <Text> {quantity}</Text>
            </div>
            <div
                style={{ height: 44, width: 44 }}
                onClick={() => setQuantity(quantity + 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.58337 22C4.58337 12.3804 12.3804 4.58331 22 4.58331C31.6197 4.58331 39.4167 12.3804 39.4167 22C39.4167 31.6178 31.6197 39.4166 22 39.4166C12.3804 39.4166 4.58337 31.6178 4.58337 22ZM23.375 15.9571C23.375 15.1977 22.7594 14.5821 22 14.5821C21.2407 14.5821 20.625 15.1977 20.625 15.9571V20.6285H15.9502C15.1907 20.6285 14.5752 21.2441 14.5752 22.0035C14.5752 22.7628 15.1907 23.3785 15.9502 23.3785H20.625V28.0439C20.625 28.8033 21.2407 29.4189 22 29.4189C22.7594 29.4189 23.375 28.8033 23.375 28.0439V23.3785H28.0495C28.8089 23.3785 29.4245 22.7628 29.4245 22.0035C29.4245 21.2441 28.8089 20.6285 28.0495 20.6285H23.375V15.9571Z"
                        fill="#FF9D00"
                    />
                </svg>
            </div>
        </Row>
    );
}
