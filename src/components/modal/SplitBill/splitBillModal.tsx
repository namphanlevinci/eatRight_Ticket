import { Modal, Row } from 'antd';
import CloseIcon from 'assets/icons/close';
import RadioButton from 'components/atom/Radio/RadioButton';
import { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';
import SplitEvenMode from './SplitEvenMode';
import SplitByItemMode from './SplitByItemMode';
import { CartItemType, ItemType } from 'context/cartType';
import SplitBillConfirmMode from './SplitBillConfirmMode';
import { useTheme } from 'context/themeContext';
import { roundTo } from 'utils/number';
import { useMediaQuery } from 'react-responsive';

export enum SplitBillMode {
    EVEN = 0,
    ITEM = 1,
}

export default function SplitBillModal({
    visible,
    onClose,
    items,
    cart,
    onSubmit,
}: {
    visible: boolean;
    onClose: () => void;
    items?: ItemType[];
    cart: CartItemType;
    onSubmit: (
        listItems: {
            guestId: string;
            items: ItemType[];
        }[],
        numbers?: number,
    ) => void;
}) {
    const [mode, setMode] = useState(SplitBillMode.EVEN);
    const [confirmMode, setConfirmMode] = useState(false);
    const [listItems, setListItems] = useState<ItemType[]>([]);
    const [listGuest, setListGuest] = useState<string[]>([]);
    const [numbers, setNumbers] = useState<number>(2);
    const { theme } = useTheme();
    useEffect(() => {
        if (cart) {
            setNumbers(cart.numberOfCustomer);
        }
    }, [cart]);
    useEffect(() => {
        if (!visible) {
            setConfirmMode(false);
            setMode(SplitBillMode.EVEN);
            setListItems([]);
            setListGuest([]);
        }
    }, [visible]);
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
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <>
            <ModalStyled
                title="Change Table"
                centered
                open={visible}
                styles={{
                    header: { display: 'none' },
                    footer: { display: 'none' },
                    content: {
                        background: theme.nEUTRALPrimary,
                        border: `1px solid ${theme.nEUTRALLine}`,
                        overflow: 'auto',
                    },
                }}
                closeIcon={null}
            >
                <div>
                    {!confirmMode && (
                        <Row
                            justify={'space-between'}
                            style={{ width: '100%' }}
                        >
                            <Row style={{ gap: isMobile ? 20 : 40 }}>
                                <RadioButton
                                    title="Split evenly"
                                    selected={mode === SplitBillMode.EVEN}
                                    onPress={() => setMode(SplitBillMode.EVEN)}
                                />
                                <RadioButton
                                    title="By item"
                                    selected={mode === SplitBillMode.ITEM}
                                    onPress={() => setMode(SplitBillMode.ITEM)}
                                />
                            </Row>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </div>
                        </Row>
                    )}
                    {!confirmMode && mode === SplitBillMode.EVEN && (
                        <SplitEvenMode
                            total={total}
                            onSubmit={(number) => {
                                setNumbers(number);
                                setConfirmMode(true);
                            }}
                            numbers={numbers}
                        />
                    )}
                    {!confirmMode && mode === SplitBillMode.ITEM && (
                        <SplitByItemMode
                            items={listItems.length > 0 ? listItems : items}
                            listGuest={listGuest}
                            onSubmit={(items: ItemType[], guest: string[]) => {
                                setListItems(items);
                                setConfirmMode(true);
                                setListGuest(guest);
                            }}
                        />
                    )}
                    {confirmMode && (
                        <SplitBillConfirmMode
                            cart={cart}
                            mode={mode}
                            listItems={listItems}
                            onClose={onClose}
                            onSubmit={onSubmit}
                            onGoBack={() => setConfirmMode(false)}
                            numbers={numbers}
                        />
                    )}
                </div>
            </ModalStyled>
        </>
    );
}

export const Container = styled.div`
    width: 440px;
    height: 350px;
`;

export const ModalStyled = styled(Modal)`
    width: auto !important;
`;
