import { Row } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import CloseIcon from 'assets/icons/close';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { CartItemType, ItemType } from 'context/cartType';
import React, { useMemo } from 'react';
import RenderGuestTotal from './components/RenderGuestTotal';
import { SplitBillMode } from './splitBillModal';
import { useMediaQuery } from 'react-responsive';

export default function SplitBillConfirmMode({
    cart,
    listItems,
    numbers,
    onClose,
    onGoBack,
    onSubmit,
    mode,
}: {
    cart: CartItemType;
    listItems: ItemType[];
    numbers?: number;
    onClose: () => void;
    onSubmit: (
        listItems: {
            guestId: string;
            items: ItemType[];
        }[],
        numbers?: number,
    ) => void;
    onGoBack: () => void;
    mode: SplitBillMode;
}) {
    const groupedData = useMemo(() => {
        const grouped = listItems.reduce(
            (acc, item) => {
                const guestId = item.guestId || 'Guest N'; // Gán 'Guest N' nếu không có guestId
                if (!acc[guestId]) {
                    acc[guestId] = [];
                }

                acc[guestId].push({ ...item });
                return acc;
            },
            {} as Record<string, ItemType[]>,
        );

        return Object.entries(grouped).map(([guestId, items]) => ({
            guestId,
            items,
        }));
    }, [listItems]);
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <div style={ismobile ? { width: '100%' } : { width: 450 }}>
            <Row justify={'space-between'}>
                <Row style={{ gap: 10 }}>
                    <div style={{ cursor: 'pointer' }} onClick={onGoBack}>
                        <ArrowLeftIcon />
                    </div>
                    <Text>Payment amount</Text>
                </Row>
                <div style={{ cursor: 'pointer' }} onClick={onClose}>
                    <CloseIcon />
                </div>
            </Row>
            <Text style={{ color: 'rgba(245, 245, 245, 0.30)', marginTop: 16 }}>
                Total bills splitted:
                <span style={{ color: 'white', marginLeft: 10 }}>
                    {mode === SplitBillMode.EVEN ? numbers : groupedData.length}
                </span>
            </Text>
            <Text style={{ color: 'rgba(245, 245, 245, 0.30)', marginTop: 16 }}>
                Total amount to pay:
                <span style={{ color: 'white', marginLeft: 10 }}>
                    $ {cart.prices.grand_total.value}
                </span>
            </Text>
            {mode === SplitBillMode.EVEN && numbers && numbers > 1
                ? Array.from({ length: numbers }, (_, index) => (
                      <RenderGuestTotal
                          title={`Guest ${index + 1}`}
                          value={cart.prices.grand_total.value / numbers}
                          key={index}
                      />
                  ))
                : groupedData.map(({ guestId, items }) => {
                      const total = items.reduce((acc, item) => {
                          return acc + item.prices.price.value;
                      }, 0);
                      return (
                          <RenderGuestTotal
                              title={guestId}
                              value={total}
                              key={guestId}
                          />
                      );
                  })}
            <ButtonPrimary
                title="Continue"
                onClick={() => {
                    if (mode === SplitBillMode.ITEM) {
                        onSubmit(groupedData, 1);
                    } else {
                        onSubmit([], numbers);
                    }
                }}
            />
        </div>
    );
}
