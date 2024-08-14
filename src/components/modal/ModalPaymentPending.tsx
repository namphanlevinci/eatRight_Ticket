import { Modal, Row } from 'antd';
import { Button } from 'components/atom/Button';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import styled from 'styled-components';
import { formatNumberWithCommas } from 'utils/format';

export default function ModalPaymentPending({
    showLoading,
    data,
    title = 'Payment Pending',
    currentcy = '$',
    onSkip,
    onCash,
    onCard,
    onPOS,
}: {
    showLoading: boolean;
    data?: any;
    title?: string;
    currentcy?: string;
    onSkip?: () => void;
    onCash?: () => void;
    onCard?: () => void;
    onPOS?: () => void;
}) {
    const totalDiscount =
        data?.discount?.length > 0
            ? data?.discount?.reduce((total: number, discount: any) => {
                  total += discount.amount.value;
                  return total;
              }, 0)
            : 0;
    const { theme } = useTheme();
    return showLoading ? (
        <CustomModal
            open={showLoading}
            footer={() => <></>}
            centered
            closable={false}
            style={{ background: 'transparent' }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: theme.nEUTRALPrimary,
                    borderRadius: 8,
                    padding: 40,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 400,
                        marginTop: 10,
                        textAlign: 'center',
                    }}
                >
                    Order #{data?.order_number} has not yet been paid
                </Text>
                <div
                    style={{
                        height: 1,
                        background: '#40464B',
                        width: '100%',
                        marginTop: 40,
                        marginBottom: 20,
                    }}
                />
                <Text
                    style={{
                        fontWeight: 600,
                        fontSize: 18,
                        textAlign: 'start',
                        marginBottom: 24,
                    }}
                >
                    Billing Information
                </Text>
                <Row justify={'space-between'}>
                    <Text>Sub total</Text>
                    <Text>
                        {currentcy}{' '}
                        {formatNumberWithCommas(
                            data?.grand_total + totalDiscount,
                        )}{' '}
                    </Text>
                </Row>
                <Row justify={'space-between'}>
                    <Text>Discounted</Text>
                    <Text>
                        - {currentcy} {formatNumberWithCommas(totalDiscount)}
                    </Text>
                </Row>
                <div
                    style={{
                        height: 1,
                        background: '#40464B',
                        width: '100%',
                        marginTop: 40,
                        marginBottom: 20,
                    }}
                />
                <Row justify={'space-between'} align={'middle'}>
                    <Text style={{ fontSize: 18 }}>Grand total</Text>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '600',
                            color: theme.pRIMARY6Primary,
                        }}
                    >
                        {currentcy} {formatNumberWithCommas(data?.grand_total)}
                    </Text>
                </Row>
                <Button
                    style={{
                        marginTop: 30,
                        marginInline: 0,
                        border: 'none',
                    }}
                    onClick={onPOS}
                    background={theme.pRIMARY6Primary}
                    color={theme.pRIMARY1}
                >
                    POS Payment
                </Button>
                <Button
                    style={{
                        marginTop: 10,
                        marginInline: 0,
                        border: 'none',
                    }}
                    onClick={onCard}
                    background={theme.pRIMARY6Primary}
                    color={theme.pRIMARY1}
                >
                    Payment Online
                </Button>
                <Button
                    style={{
                        marginTop: 10,
                        marginInline: 0,
                        border: 'none',
                    }}
                    onClick={onCash}
                    background={theme.pRIMARY6Primary}
                    color={theme.pRIMARY1}
                >
                    Use Cash
                </Button>

                <Button
                    style={{
                        marginTop: 10,
                        marginInline: 0,
                        border: 0,
                    }}
                    onClick={onSkip}
                    background={theme.nEUTRALPrimary}
                >
                    <Text
                        style={{
                            color: theme.tEXTPrimary,
                        }}
                    >
                        Skip
                    </Text>
                </Button>
            </div>
        </CustomModal>
    ) : (
        <></>
    );
}

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background: transparent;
        box-shadow: none !important;
    }
`;
