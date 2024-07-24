import SplitIcon from 'assets/icons/splitIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import styled from 'styled-components';
import ButtonGuest from './components/ButtonGuest';
import { ItemType } from 'context/cartType';
import RenderItemSplit from './components/RenderItem';
import ModalSplitItem from './components/ModalSplitItem';
import { useSplitItem } from './useSplitItem';
import { useTheme } from 'context/themeContext';

export default function SplitByItemMode({
    items,
    onSubmit,
    listGuest,
}: {
    items?: ItemType[];
    onSubmit: (listItems: ItemType[], listGuest: string[]) => void;
    listGuest: string[];
}) {
    const {
        listData,
        guests,
        setGuests,
        selected,
        modalSplitItem,
        setModalSplitItem,
        handleSplitSubmit,
        handleSelect,
        handleAddGuestIdToItem,
        itemFromGuest,
    } = useSplitItem({ items, listGuest });
    const RenderListItem = ({ guestId }: { guestId?: string }) => {
        if (!listData) {
            return <Text>No items</Text>;
        }
        const validItems = guestId
            ? listData.filter((item: ItemType) => item?.guestId === guestId)
            : listData.filter(
                  (item: ItemType) =>
                      item?.guestId === undefined || item?.guestId === '',
              );
        return (
            <>
                {validItems?.map((item: ItemType) => {
                    return (
                        <RenderItemSplit
                            key={item.id}
                            title={item.product.name}
                            quantity={
                                item.quantityText
                                    ? item.quantityText
                                    : item.quantity
                            }
                            isSelected={selected.includes(item.id || '')}
                            onPress={() =>
                                handleSelect(item.id || '', guestId || '')
                            }
                        />
                    );
                })}
                {guestId && <div style={{ height: 10 }} />}
            </>
        );
    };
    const { theme } = useTheme();
    return (
        <Container>
            {modalSplitItem && (
                <ModalSplitItem
                    onClose={() => setModalSplitItem(false)}
                    onSubmit={handleSplitSubmit}
                />
            )}
            <ItemsContainer
                style={{
                    background: theme.nEUTRALBase,
                    border: '1px solid ' + theme.nEUTRALLine,
                }}
            >
                <Text style={{ fontWeight: '600' }}>Items</Text>
                {itemFromGuest && selected.length > 0 && (
                    <ButtonGuest
                        onPress={() => {
                            itemFromGuest &&
                                selected.length > 0 &&
                                handleAddGuestIdToItem('');
                        }}
                        title={`List Items`}
                        isHighlight={
                            (itemFromGuest && selected.length > 0) || true
                        }
                    />
                )}

                <RenderListItem key={'list-item'} />
            </ItemsContainer>
            <div style={{ flex: 1, overflow: 'auto' }}>
                <BtnTitlte
                    style={
                        selected.length === 1 && itemFromGuest === ''
                            ? {
                                  background: theme.pRIMARY1,
                                  cursor: 'pointer',
                              }
                            : {
                                  background: theme.nEUTRALBase,
                              }
                    }
                    onClick={() =>
                        selected.length === 1 &&
                        itemFromGuest === '' &&
                        setModalSplitItem(true)
                    }
                >
                    <SplitIcon
                        color={
                            selected.length === 1
                                ? theme.pRIMARY6Primary
                                : theme.tEXTPrimary
                        }
                    />
                    <Text
                        style={{
                            color:
                                selected.length === 1
                                    ? theme.pRIMARY6Primary
                                    : theme.tEXTPrimary,
                        }}
                    >
                        Split by item
                    </Text>
                </BtnTitlte>
                {guests.map((guest: any, index: number) => {
                    return (
                        <ButtonGuest
                            key={index}
                            onPress={() => {
                                itemFromGuest !== guest &&
                                    selected.length > 0 &&
                                    handleAddGuestIdToItem(guest);
                            }}
                            title={`Guest ${index + 1}`}
                            isHighlight={
                                itemFromGuest !== guest && selected.length > 0
                            }
                        >
                            <RenderListItem guestId={guest} />
                        </ButtonGuest>
                    );
                })}
                <ButtonGuest
                    isAdd={true}
                    onPress={() =>
                        setGuests([...guests, `Guest ${guests.length + 1}`])
                    }
                />
                <ButtonPrimary
                    title="Continue"
                    onClick={() => onSubmit(listData, guests)}
                />
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 610px;
    min-height: 400px;
    max-height: 716px;
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-top: 16px;
    position: relative;
    overflow: auto;
`;

const ItemsContainer = styled.div`
    width: 304px;
    background: #121212;
    border-radius: 8px;
    padding: 10px;
    overflow: auto;
`;

const BtnTitlte = styled.div`
    display: flex;
    height: 40px;
    width: 157px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #161b26;
    border-radius: 8px;
`;
