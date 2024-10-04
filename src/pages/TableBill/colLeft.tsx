import { Col, Row } from 'antd';
import { Text, Text20 } from 'components/atom/Text';
import { CartItemType, ItemType } from 'context/cartType';
import React from 'react';
import { formatNumberWithCommas } from 'utils/format';
import { ColStyled } from './styleds';
import { useTheme } from 'context/themeContext';
import { DividedSolid } from 'pages/BillDetail/styled';
import { useMediaQuery } from 'react-responsive';

export default function ColLeft({
    cart,
    listItems,
    isSplitBill,
    openModalSplitBill,
}: {
    cart?: CartItemType;
    count: number;
    listItems: {
        guestId: string;
        items: ItemType[];
    }[];
    isSplitBill?: boolean;
    openModalSplitBill?: () => void;
}) {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    return (
        <ColStyled
            style={{
                flex: 1,
                marginRight: isMobile ? 0 : 16,
                borderRadius: 8,
                padding: '0px 16px',
            }}
        >
            {isSplitBill && listItems.length > 0
                ? listItems?.map((data) => {
                      const { items } = data;
                      if (items.find((item) => item.status === 'cancel')) {
                          return null;
                      }
                      return (
                          <div key={data.guestId}>
                              <Row
                                  style={{
                                      border: '1px solid #3F3F3F',
                                      borderLeftWidth: 0,
                                      borderRightWidth: 0,
                                      paddingBlock: 20,
                                      cursor: 'pointer',
                                  }}
                                  justify={'space-between'}
                                  onClick={openModalSplitBill}
                              >
                                  <Text20 style={{ fontWeight: '600' }}>
                                      {data.guestId}
                                  </Text20>
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
                          </div>
                      );
                  })
                : cart?.items?.map((item, index) => {
                      if (item.status === 'status') {
                          return null;
                      }
                      return <RenderItem key={index} item={item} />;
                  })}
            {isMobile && <DividedSolid />}
        </ColStyled>
    );
}

export const RenderItem = ({ item }: { item: ItemType }) => {
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
                <Text style={{ fontWeight: 600 }}>
                    $ {formatNumberWithCommas(item.prices.price.value)}
                </Text>
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
