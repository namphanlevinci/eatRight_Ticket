import { Text } from 'components/atom/Text';
import React, { useEffect } from 'react';
import ButtonOptions from './buttonOptions';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';

export default function PaymentOptions({
    onPayment,
}: {
    onPayment: (type: string) => void;
}) {
    const [paymentMethods, setPaymentMethods] = React.useState<
        {
            id: string;
            title: string;
        }[]
    >([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        React.useState('cash');

    useEffect(() => {
        setPaymentMethods([
            {
                id: 'cash',
                title: 'Cash',
            },
            {
                id: 'pos',
                title: 'POS',
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
                    />
                ))}
            </div>
            <ButtonPrimary
                title="Proceed Payment"
                onClick={() => onPayment(selectedPaymentMethod)}
            />
        </div>
    );
}
