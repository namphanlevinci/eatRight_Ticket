import { useMutation } from '@apollo/client';
import { Layout, notification } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import ReceiptBillIcon from 'assets/icons/receiptBill';
import { Text } from 'components/atom/Text';
import LoadingModalPayment from 'components/modal/loadingModalPayment';
import ModalCancelConfirm from 'components/modal/ModalCancelConfirm';
import { BASE_ROUTER } from 'constants/router';
import { CANCEL_CHECKOUT } from 'graphql/orders/cancelCheckout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const RenderHeader = ({ isHavePaid }: { isHavePaid: boolean }) => {
    const { Header } = Layout;
    const navigation = useNavigate();
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const cartId = localStorage.getItem('split_bill_can_go_back');
    const [isCanGoBack, setIsCanGoBack] = useState(true);
    const [onCancelCheckout, { loading }] = useMutation(CANCEL_CHECKOUT);
    useEffect(() => {
        if (cartId === 'false') {
            setIsCanGoBack(false);
        } else {
            setIsCanGoBack(true);
        }
    }, [cartId]);
    const handleOnCancelCheck = () => {
        if (cartId) {
            onCancelCheckout({
                variables: {
                    cart_id: cartId,
                },
            })
                .then(() => {
                    navigation(-1);
                    if (isHavePaid) {
                        notification.success({
                            message: 'Success',
                            description: 'Cancel Check out successfully',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            navigation(-1);
        }
    };
    return (
        <Header
            style={{
                height: '56',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                justifyContent: 'flex-start',
                paddingInline: 0,
            }}
        >
            <LoadingModalPayment
                title="Cancel CheckOut ..."
                showLoading={loading}
                isClose={false}
            />
            <div
                onClick={() =>
                    isCanGoBack
                        ? setShowModalConfirm(true)
                        : navigation(BASE_ROUTER.BILL)
                }
                style={{ display: 'flex ', alignItems: 'center' }}
            >
                {isCanGoBack ? <ArrowLeftIcon /> : <ReceiptBillIcon />}
            </div>
            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 20 }}>
                Payment
            </Text>
            <ModalCancelConfirm
                title="Exit Checkout?"
                description="You are about to leave the checkout process. Do you want to continue?"
                noBtnText="Cancel"
                yesBtnText="Continue"
                isModalOpen={showModalConfirm}
                onCancel={() => setShowModalConfirm(false)}
                onSubmit={() => handleOnCancelCheck()}
            />
        </Header>
    );
};
