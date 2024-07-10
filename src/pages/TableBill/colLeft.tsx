import { Col, Row } from 'antd';
import { Text, Text18, Text20 } from 'components/atom/Text';
import { CartItemType, ItemType } from 'context/cartType';
import React from 'react';
import { Colors } from 'themes/colors';
import { formatNumberWithCommas } from 'utils/format';
import { ColStyled } from './styleds';

export default function ColLeft({
    cart,
    count,
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
    return (
        <ColStyled
            style={{
                flex: 1,
                background: Colors.grey1,
                border: `1px solid ${Colors.brown5}`,
                marginRight: 16,
                borderRadius: 8,
                padding: 16,
            }}
        >
            <Text>Total {count} Items</Text>

            {isSplitBill && listItems.length > 0
                ? listItems?.map((data) => {
                      const total = data.items.reduce((acc, item) => {
                          return acc + item.prices.price.value;
                      }, 0);
                      return (
                          <div key={data.guestId}>
                              <Row
                                  style={{
                                      marginTop: 40,
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
                                  <Text20>Total : {total} $</Text20>
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
                      return <RenderItem key={index} item={item} />;
                  })}
        </ColStyled>
    );
}

const RenderItem = ({ item }: { item: ItemType }) => {
    return (
        <div>
            <Row justify={'space-between'} style={{ marginTop: 32 }}>
                <Col style={{ flex: 1 }}>
                    <Row>
                        <Col>
                            <Text18 style={{ marginRight: 8 }}>
                                {item.quantity}X
                            </Text18>
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Text18>{item.product.name}</Text18>
                        </Col>
                    </Row>
                </Col>
                <Text18>
                    {formatNumberWithCommas(item.prices.price.value)} $
                </Text18>
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
