import { Modal, Row } from 'antd';
import CloseIcon from 'assets/icons/close';
import RadioButton from 'components/atom/Radio/RadioButton';
import { useState } from 'react';

import styled from 'styled-components';
import SplitEvenMode from './SplitEvenMode';
import SplitByItemMode from './SplitByItemMode';
import { CartItemType, ItemType } from 'context/cartType';
import SplitBillConfirmMode from './SplitBillConfirmMode';
import { useTheme } from 'context/themeContext';
import { Tax } from 'context/cartContext';

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
    const [numbers, setNumbers] = useState<number>(1);
    const { theme } = useTheme();
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
                            <Row style={{ gap: 40 }}>
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
                            total={
                                (cart?.prices.subtotal_excluding_tax?.value ||
                                    0) -
                                (cart?.prices?.total_canceled?.value || 0) /
                                    (1 + Tax)
                            }
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
