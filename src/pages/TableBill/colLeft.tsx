import { Col, Row } from 'antd';
import { Text } from 'components/atom/Text';
import { CartItemType, ItemType } from 'context/cartType';
import React, { useState } from 'react';
import { formatNumberWithCommas } from 'utils/format';
import { ColStyled } from './styleds';
import { useTheme } from 'context/themeContext';
import { DividedSolid } from 'pages/BillDetail/styled';
import { useMediaQuery } from 'react-responsive';
import RenderOpenPrice from 'pages/Table/Cart/components/RenderOpenPrice';
import ModalEditPrice from 'components/modal/ModalEditPrice';

export default function ColLeft({
    cart,
    listItems,
    isSplitBill,
    openModalSplitBill,
    handleUpdatePriceItem,
    isNeedInput,
}: {
    cart?: CartItemType;
    count: number;
    listItems: {
        guestId: string;
        items: ItemType[];
    }[];
    isSplitBill?: boolean;
    openModalSplitBill?: () => void;
    handleUpdatePriceItem: (data: any) => void;
    isNeedInput?: boolean;
}) {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const { theme } = useTheme();
    const [showEditPrice, setShowEditPrice] = useState({
        show: false,
        price: 0,
        index: -1,
    });
    const onEditOpenPrice = (index: number, item: ItemType) => {
        setShowEditPrice({
            show: true,
            price: item?.prices.price.value ?? 0,
            index: index ?? 0,
        });
    };
    const onSubmitEditPrice = (custom_price: number) => {
        const items = cart?.items[showEditPrice.index];
        // if (items?.uid) {
        handleUpdatePriceItem({
            cartId: cart?.id || '',
            id: items?.id || '',
            price: custom_price,
        });
        // } else {
        //     customOpenPriceForItem({
        //         index: showEditPrice.index,
        //         custom_price,
        //     });
        // }

        setShowEditPrice({
            ...showEditPrice,
            show: false,
            price: custom_price,
        });
    };
    return (
        <ColStyled
            style={{
                flex: 1,
                marginRight: isMobile ? 0 : 24,
                marginLeft: isMobile ? 0 : 16,
                marginTop: isMobile ? 0 : 2,
                padding: 16,
                // paddingBottom: 24,
                background: isMobile ? 'none' : theme.nEUTRALBase,
                border: isMobile ? 'none' : `1px solid ${theme.nEUTRALLine}`,
                borderRadius: 8,
            }}
        >
            <ModalEditPrice
                isModalOpen={showEditPrice.show}
                onCancel={() => {
                    setShowEditPrice({ show: false, price: 0, index: -1 });
                }}
                onSubmit={onSubmitEditPrice}
                custom_price={showEditPrice.price}
            />
            {isSplitBill && listItems.length > 0
                ? listItems?.map((data, idx) => {
                      const { items } = data;
                      if (items.find((item) => item.status === 'cancel')) {
                          return null;
                      }
                      const totalPrice = items.reduce((sum, item) => {
                          return sum + item.prices.price.value * item.quantity;
                      }, 0);
                      return (
                          <div key={data.guestId}>
                              <Row
                                  style={{
                                      cursor: 'pointer',
                                  }}
                                  justify={'space-between'}
                                  onClick={openModalSplitBill}
                              >
                                  <Text
                                      style={{
                                          fontWeight: '600',
                                          color: theme.pRIMARY6Primary,
                                      }}
                                  >
                                      {data.guestId}
                                  </Text>
                                  <Text
                                      style={{
                                          fontWeight: '600',
                                          color: theme.pRIMARY6Primary,
                                      }}
                                  >
                                      Total: $
                                      {formatNumberWithCommas(totalPrice)}
                                  </Text>
                              </Row>

                              {data.items?.length > 0 &&
                                  data.items.map((item, index) => {
                                      return (
                                          <RenderItem
                                              key={`${data.guestId}-${index}`}
                                              item={item}
                                          />
                                      );
                                  })}
                              {isMobile && idx <= items?.length - 1 && (
                                  <div
                                      style={{
                                          marginBottom:
                                              idx <= items?.length - 1
                                                  ? 16
                                                  : 40,
                                      }}
                                  >
                                      <DividedSolid />
                                  </div>
                              )}
                          </div>
                      );
                  })
                : cart?.items?.map((item, index) => {
                      if (item.status === 'status') {
                          return null;
                      }
                      return (
                          <RenderItem
                              key={index}
                              item={item}
                              onEditOpenPrice={() =>
                                  onEditOpenPrice(index, item)
                              }
                              isNeedInput={isNeedInput}
                          />
                      );
                  })}
            {isMobile && !isSplitBill && (
                <div style={{ marginTop: 24 }}>
                    <DividedSolid />
                </div>
            )}
        </ColStyled>
    );
}

export const RenderItem = ({
    item,
    onEditOpenPrice,
    isNeedInput,
}: {
    item: ItemType;
    onEditOpenPrice?: any;
    isNeedInput?: boolean;
}) => {
    const { theme } = useTheme();
    return (
        <div
            style={{
                color: theme.tEXTPrimary,
            }}
        >
            <Row justify={'space-between'} style={{ marginTop: 16 }}>
                <Col style={{ flex: 1 }}>
                    <Row>
                        <Col>
                            <Text style={{ marginRight: 8, fontWeight: 600 }}>
                                {item.quantityText
                                    ? item.quantityText
                                    : item.quantity}
                                x
                            </Text>
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 600 }}>
                                {item.product.name}
                            </Text>
                        </Col>
                    </Row>
                </Col>

                {item.product.open_price ? (
                    <RenderOpenPrice
                        value={item.custom_price || item.prices.price.value}
                        onEditOpenPrice={onEditOpenPrice}
                        isNeedInput={isNeedInput}
                    />
                ) : (
                    <Text style={{ fontWeight: 600 }}>
                        ${formatNumberWithCommas(item.prices.price.value)}
                    </Text>
                )}
            </Row>
            {item.bundle_options?.map((bundle) => {
                return (
                    <div key={bundle.id}>
                        {bundle?.values?.map((product: any, idx: number) => {
                            return (
                                <Row
                                    style={{
                                        marginTop: 20,
                                    }}
                                    key={`bundle ${idx}`}
                                    align={'middle'}
                                    justify={'space-between'}
                                >
                                    <Col
                                        style={{
                                            paddingLeft: 20,
                                        }}
                                    >
                                        <Text>
                                            {' '}
                                            ● {product.label} x
                                            {product.quantity}
                                        </Text>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
