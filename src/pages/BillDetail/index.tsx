/* eslint-disable no-unsafe-optional-chaining */
import { Spin } from 'antd';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
import { ButtonContainer, ButtonLeftContainer, Container } from './styled';
import ModalPaymentPending from 'components/modal/ModalPaymentPending';
import LazyLoadedScripts from 'LazyLoadedScripts';
import ModalPosDevices from 'pages/TableBill/components/ModalPosDevices';
import LoadingModalPayment from 'components/modal/loadingModalPayment';
import ModalInput from 'components/modal/ModalInput';
import LoadingModal from 'components/modal/loadingModal';
import { RenderBill } from './components/RenderBill';
import { ButtonBill } from './components/ButtonBill';
import { ButtonSelectBill } from './components/ButtonSelectBill';
import ModalPosDevicesDJV from 'pages/TableBill/components/ModalPosDevicesDJV';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { useBillDetail } from './useBillDetail';
declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
    }
}
export default function index() {
    const {
        modalRefund,
        onRefund,
        setModalInputEmail,
        setModalRefund,
        modalInputEmail,
        handleSendBill,
        selectDataShowbill,
        dataSplitBill,
        setModalInputPhone,
        loading,
        contextHolder,
        isVisibleModalPos,
        setVisibleMoalPos,
        handlePOSPayment,
        data,
        orderId,
        isVisibleModalPosDJV,
        setVisibleMoalPosDJV,
        handlePOSPaymentWithDJV,
        showModalErrorPayment,
        pos_Loading,
        setPos_Loading,
        sendLoading1,
        sendLoading2,
        refundLoading,
        refund2Loading,
        refund3Loading,
        refund4Loading,
        loadingRePayment,
        showPendingPayment,
        setShowPendingPayment,
        modalConfirm,
        childBill,
        PrintBillApi,
        loadingPrint,
        isMobile,
        theme,
        isMerchant,
        BASE_ROUTER,
        setSelectDataShowbill,
        modalInputPhone,
        order_ID,
        navigation,
    } = useBillDetail({ order_id: null });

    return (
        <div>
            {' '}
            <ModalInput
                isModalOpen={modalRefund}
                title="Input reason refund money : "
                onSubmit={(value: string) => {
                    onRefund({ reason: value });
                    setModalRefund(false);
                }}
                onCancel={() => {
                    setModalRefund(false);
                }}
            />
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
            <Container
                style={{
                    background: theme.pRIMARY1,
                    paddingTop: 16,
                    paddingBottom: 16,
                }}
            >
                <div
                    style={{
                        position: 'fixed',
                        height: '100vh',
                        width: '100vw',
                        zIndex: -1,
                        background: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {loading && <Spin size="large" tip="Loading..." />}
                </div>
                {contextHolder}
                <ModalPosDevices
                    isVisibleModalPos={isVisibleModalPos}
                    setVisibleMoalPos={setVisibleMoalPos}
                    onPressOK={(pos_id: string) => {
                        handlePOSPayment(pos_id, {
                            order_number: data?.orderDetail?.order_number,
                            order_id: orderId ? orderId : btoa(order_ID || ''),
                            cart_id: data?.orderDetail?.cart_id,
                        });
                    }}
                />
                {isVisibleModalPosDJV && (
                    <ModalPosDevicesDJV
                        isVisibleModalPos={isVisibleModalPosDJV}
                        setVisibleMoalPos={setVisibleMoalPosDJV}
                        onPressOK={(pos_id: number) => {
                            handlePOSPaymentWithDJV(
                                pos_id,
                                {
                                    order_number:
                                        data?.orderDetail?.order_number,
                                    order_id: orderId
                                        ? orderId
                                        : btoa(order_ID || ''),
                                    cart_id: data?.orderDetail?.cart_id,
                                },
                                false,
                            );
                        }}
                        onCancel={() => {
                            showModalErrorPayment(orderId || '');
                        }}
                    />
                )}
                <LoadingModalPayment
                    showLoading={pos_Loading}
                    title="Processing ..."
                    onClose={() => setPos_Loading(false)}
                />
                <LoadingModal
                    showLoading={
                        sendLoading1 ||
                        sendLoading2 ||
                        refundLoading ||
                        refund2Loading ||
                        refund3Loading ||
                        refund4Loading ||
                        loadingRePayment
                    }
                />
                <LazyLoadedScripts />
                <ModalPaymentPending
                    title="Payment in progress"
                    showLoading={showPendingPayment}
                    data={data?.orderDetail}
                    onSkip={() => setShowPendingPayment(false)}
                    onPOS_DJV={() => modalConfirm('pos_djv')}
                    onCash={() => modalConfirm('cashondelivery')}
                    onPOS={() => modalConfirm('pos')}
                />
                {(!loading || data?.orderDetail) && (
                    <>
                        <RenderBill
                            data={data?.orderDetail}
                            selectDataShowbill={selectDataShowbill}
                            dataInvoice={
                                dataSplitBill?.merchantGetOrderInvoices?.invoice
                            }
                        />

                        <ButtonContainer>
                            {(childBill.length === 0 || selectDataShowbill) && (
                                <>
                                    <ButtonBill
                                        title="Print"
                                        onPress={PrintBillApi}
                                        loading={loadingPrint}
                                    />
                                    <ButtonBill
                                        title="Email"
                                        onPress={() => setModalInputEmail(true)}
                                    />
                                    {data?.orderDetail?.can_refund &&
                                    !selectDataShowbill ? (
                                        <ButtonBill
                                            title="Refund"
                                            onPress={() => setModalRefund(true)}
                                        />
                                    ) : selectDataShowbill?.can_refund ? (
                                        <ButtonBill
                                            title="Void"
                                            onPress={() => setModalRefund(true)}
                                        />
                                    ) : data?.orderDetail?.is_refunded ||
                                      selectDataShowbill?.is_refunded ? (
                                        <div style={{ paddingInline: 8 }}>
                                            <ButtonPrimary
                                                title="Voided"
                                                onClick={() =>
                                                    console.log('123')
                                                }
                                                isDisable
                                                width={
                                                    isMobile ? '56px' : '160px'
                                                }
                                                marginTop="0px"
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {/* <ButtonBill
                                        title="Sms"
                                        onPress={() => setModalInputPhone(true)}
                                    /> */}
                                </>
                            )}
                            <Button
                                style={{
                                    height: 56,
                                    width: isMobile ? 'auto' : 160,
                                    display: 'flex',
                                    border: `2px solid ${theme.pRIMARY6Primary}`,
                                    padding: '0 16px',
                                }}
                                onClick={() => {
                                    navigation(
                                        isMerchant
                                            ? BASE_ROUTER.RECEIPTS
                                            : BASE_ROUTER.BILL,
                                    );
                                }}
                                background={theme.nEUTRALPrimary}
                            >
                                <TextDark
                                    style={{
                                        color: theme.pRIMARY6Primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    Close
                                </TextDark>
                            </Button>
                        </ButtonContainer>

                        {childBill.length > 1 && (
                            <ButtonLeftContainer>
                                <ButtonSelectBill
                                    onPress={() =>
                                        setSelectDataShowbill(undefined)
                                    }
                                    isSelected={!selectDataShowbill}
                                />
                                {childBill.map((item: any, index: number) => (
                                    <ButtonSelectBill
                                        key={index}
                                        title={`${index + 1}`}
                                        onPress={() => {
                                            setSelectDataShowbill(item);
                                        }}
                                        isSelected={selectDataShowbill === item}
                                    />
                                ))}
                            </ButtonLeftContainer>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}
