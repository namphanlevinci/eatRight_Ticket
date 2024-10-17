import { Modal, Spin } from 'antd';
import { useTheme } from 'context/themeContext';
import styled from 'styled-components';
import SmsIcon from 'assets/icons/smsIcon';
import PrintIcon from 'assets/icons/printIcon';
import EmailIcon from 'assets/icons/emailIcon';
import CloseXIcon from 'assets/icons/closeIcon';
import SuccessIcon from 'assets/icons/successIcon';
import ModalInput from 'components/modal/ModalInput';
import { useNavigate } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useBillDetail } from 'pages/BillDetail/useBillDetail';

export default function ModalPaySuccess({
    isVisible = false,
    onClose,
    order_id,
    isBackHome = true,
}: {
    isVisible: boolean;
    onClose: () => void;
    order_id: any;
    isBackHome?: boolean;
}) {
    const navigation = useNavigate();
    const { theme } = useTheme();

    const {
        PrintBillApi,
        loadingPrint,
        modalInputEmail,
        modalInputPhone,
        setModalInputEmail,
        setModalInputPhone,
        handleSendBill,
        selectDataShowbill,
        dataSplitBill,
        sendLoading1,
        sendLoading2,
    } = useBillDetail({ order_id });

    const closeModal = () => {
        onClose();
        isBackHome && navigation(BASE_ROUTER.HOME);
    };

    return (
        <Modal
            title="Basic Modal"
            open={isVisible}
            styles={{
                footer: {
                    display: 'none',
                },
                header: {
                    display: 'none',
                },
                content: {
                    backgroundColor: theme.nEUTRALPrimary,
                },
            }}
            closeIcon={<></>}
            closable={false}
            centered
            width={622}
        >
            <Header>
                <p>Receipt Options</p>
                <div style={{ cursor: 'pointer' }} onClick={closeModal}>
                    <CloseXIcon />
                </div>
            </Header>
            <Body>
                <Item onClick={() => !loadingPrint && PrintBillApi()}>
                    <div>
                        {loadingPrint ? (
                            <Spin />
                        ) : (
                            <>
                                <PrintIcon />
                                <p>Print</p>
                            </>
                        )}
                    </div>
                </Item>
                <Item onClick={() => !sendLoading1 && setModalInputEmail(true)}>
                    <div>
                        {sendLoading1 ? (
                            <Spin />
                        ) : (
                            <>
                                <EmailIcon />
                                <p>Email</p>
                            </>
                        )}
                    </div>
                </Item>
                <Item onClick={() => !sendLoading2 && setModalInputPhone(true)}>
                    <div>
                        {sendLoading2 ? (
                            <Spin />
                        ) : (
                            <>
                                <SmsIcon />
                                <p>Sms</p>
                            </>
                        )}
                    </div>
                </Item>
            </Body>

            <Bottom>
                <SuccessIcon />
                <p>Payment Successful</p>
            </Bottom>
            <ModalInput
                isModalOpen={modalInputEmail}
                title="Input customer e-mail"
                onSubmit={(value: string) => {
                    handleSendBill(
                        'email',
                        value,
                        selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataSplitBill?.merchantGetOrderInvoices
                                  ?.invoice[0]?.number,
                    );
                    setModalInputEmail(false);
                }}
                onCancel={() => {
                    setModalInputEmail(false);
                }}
                type="email"
            />
            <ModalInput
                isModalOpen={modalInputPhone}
                title="Input customer PhoneNumber"
                onSubmit={(value: string) => {
                    handleSendBill(
                        'tel',
                        value,
                        selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataSplitBill?.merchantGetOrderInvoices
                                  ?.invoice[0]?.number,
                    );
                    setModalInputPhone(false);
                }}
                onCancel={() => {
                    setModalInputPhone(false);
                }}
                type="tel"
            />
        </Modal>
    );
}

const Header = styled.div`
    dispplay: flex;
    align-items: center;
    justify-content: space-between;
    display: flex;
    & > p {
        color: #4a505c;
        font-weight: 600;
        font-family: Montserrat;
        font-size: 22px;
    }
`;

const Body = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 40px;
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    & > p {
        margin-top: 16px;
        color: #08875d;
        font-weight: 600;
        font-family: Montserrat;
        font-size: 26px;
    }
`;

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0455bf;
    border-radius: 8px;
    width: 169px;
    height: 143px;
    cursor: pointer;
    & > div {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        font-family: Montserrat;
        text-align: center;
    }
`;
