import { Text } from 'components/atom/Text';
import React, { useEffect } from 'react';
import ButtonOptions from './buttonOptions';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';

export default function PaymentOptions() {
    const [paymentMethods, setPaymentMethods] = React.useState<
        {
            id: number;
            title: string;
        }[]
    >([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        React.useState('1');
    useEffect(() => {
        setPaymentMethods([
            {
                id: 1,
                title: 'Cash',
            },
            {
                id: 2,
                title: 'Credit Card',
            },
            {
                id: 3,
                title: 'Debit Card',
            },
            {
                id: 4,
                title: 'E-Wallet',
            },
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
                Payment options
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
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
                onClick={() => console.log('123')}
            />
        </div>
    );
}
