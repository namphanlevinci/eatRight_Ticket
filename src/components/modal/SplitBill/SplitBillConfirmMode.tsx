import { Row } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import CloseIcon from 'assets/icons/close';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { CartItemType, ItemType } from 'context/cartType';
import React, { useMemo } from 'react';
import RenderGuestTotal from './components/RenderGuestTotal';
import { SplitBillMode } from './splitBillModal';
import { roundTo } from 'utils/number';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'context/themeContext';

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
                const guestId = item.guestId || `Guest ${listItems.length}`;
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
    const { theme } = useTheme();
    const totalMoney = useMemo(
        () =>
            (cart?.prices?.subtotal_excluding_tax?.value || 0) -
            (cart?.prices?.total_canceled_without_tax?.value || 0),
        [cart],
    );

    const Tax = useMemo(
        () => (cart?.prices?.applied_taxes?.[0]?.tax_percent || 0) / 100,
        [cart],
    );

    const totalDiscount = useMemo(
        () =>
            roundTo(
                (cart?.prices?.discount?.amount?.value || 0) +
                    (cart?.prices?.total_items_canceled_discount?.value || 0),
                2,
            ),
        [cart],
    );

    const total = useMemo(
        () =>
            (totalMoney + totalDiscount) * (Tax + 1) + (cart?.tip_amount || 0),
        [totalMoney, totalDiscount, Tax, cart],
    );
    const tip = cart?.tip_amount || 0;
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
            <Text style={{ color: theme.tEXTDisabled, marginTop: 16 }}>
                Total bills splitted:
                <span style={{ color: theme.tEXTPrimary, marginLeft: 10 }}>
                    {mode === SplitBillMode.EVEN
                        ? numbers
                        : cart?.prices?.total_canceled?.value
                          ? groupedData.length - 1
                          : groupedData.length}
                </span>
            </Text>
            <Text style={{ color: theme.tEXTDisabled, marginTop: 16 }}>
                Total amount to pay :
                <span style={{ color: theme.tEXTPrimary, marginLeft: 10 }}>
                    $ {total.toFixed(2)}
                </span>
            </Text>
            {mode === SplitBillMode.EVEN && numbers && numbers > 1
                ? Array.from({ length: numbers }, (_, index) => (
                      <RenderGuestTotal
                          title={`Guest ${index + 1}`}
                          value={total / numbers}
                          key={index}
                      />
                  ))
                : groupedData.map(({ guestId, items }) => {
                      const totalTmp = items.reduce((acc, item) => {
                          return (
                              acc +
                              (item.status === 'cancel'
                                  ? 0
                                  : (item.prices.price.value * item.quantity -
                                        (item.prices?.total_item_discount
                                            ?.value || 0)) *
                                    (1 + Tax))
                          );
                      }, 0);
                      return (
                          totalTmp > 0 && (
                              <RenderGuestTotal
                                  title={guestId}
                                  value={roundTo(
                                      totalTmp +
                                          (tip * totalTmp) / (total - tip),
                                      2,
                                  )}
                                  key={guestId}
                              />
                          )
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
