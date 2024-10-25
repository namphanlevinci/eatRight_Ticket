import { Text } from 'components/atom/Text';
import React, { useEffect } from 'react';
import ButtonOptions from './buttonOptions';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import ChangeModal from 'components/modal/ChangeModal';
import { InvoiceWithSplit } from '../IType';

export default function PaymentOptions({
    onPayment,
    isPaid = false,
    selectedGuest,
}: {
    onPayment: (
        type: string,
        po_number: string,
        received_amount?: number,
    ) => void;
    isPaid?: boolean;
    selectedGuest?: InvoiceWithSplit;
}) {
    const [paymentMethods, setPaymentMethods] = React.useState<
        {
            id: string;
            title: string;
        }[]
    >([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        React.useState('cash');
    const [modalChange, setModalChange] = React.useState(false);

    const [value, setValue] = React.useState('');
    const handleChange = (e: any) => {
        const value = e?.target?.value;
        if (value?.length <= 50) {
            setValue(e?.target.value);
        }
    };

    useEffect(() => {
        setPaymentMethods([
            {
                id: 'cash',
                title: 'Cash',
            },
            {
                id: 'pos',
                title: 'Credit Card',
            },
            {
                id: 'other',
                title: 'Other',
            },
            // {
            //     id: 'debit_card',
            //     title: 'Debit Card',
            // },
            // {
            //     id: 'e_wallet',
            //     title: 'E-Wallet',
            // },
        ]);
    }, []);
    return (
        <div style={{ padding: 16 }}>
            <Text
                style={{
                    fontSize: 18,
                    marginBottom: 16,
                }}
            >
                Payment method
            </Text>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    rowGap: 16,
                }}
            >
                {paymentMethods.map((item) => (
                    <ButtonOptions
                        key={item.id}
                        title={item.title}
                        isSelected={selectedPaymentMethod === `${item.id}`}
                        onClick={() => setSelectedPaymentMethod(`${item.id}`)}
                        selectedPaymentMethod={selectedPaymentMethod}
                        note={value}
                        onChangeNote={handleChange}
                    />
                ))}
            </div>
            <ButtonPrimary
                title="Proceed Payment"
                onClick={() => {
                    if (selectedPaymentMethod === 'cash') {
                        setModalChange(true);
                        return;
                    }
                    onPayment(selectedPaymentMethod, value);
                }}
                isDisable={isPaid}
            />
            {modalChange && selectedPaymentMethod === 'cash' && (
                <ChangeModal
                    isModalOpen={modalChange}
                    grandTotal={selectedGuest?.total.grand_total.value || 0}
                    onClose={() => setModalChange(false)}
                    onSubmit={(received_amount: number) => {
                        onPayment(
                            selectedPaymentMethod,
                            value,
                            received_amount,
                        );
                        setModalChange(false);
                    }}
                />
            )}
        </div>
    );
}
