import { Col, Row } from 'antd';
import { Text, Text18, Text20 } from 'components/atom/Text';
import { CartItemType, ItemType } from 'context/cartType';
import React from 'react';
import { formatNumberWithCommas } from 'utils/format';
import { ColStyled } from './styleds';
import { useTheme } from 'context/themeContext';
import { DividedSolid } from 'pages/BillDetail/styled';
import CustomTag from 'components/atom/Tag/CustomTag';
import { getTagStyled } from 'utils/tag';
import { useMediaQuery } from 'react-responsive';

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
    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    return (
        <ColStyled
            style={{
                flex: 1,
                background: theme.nEUTRALBase,
                border: `1px solid ${theme.nEUTRALLine}`,
                marginRight: isMobile ? 0 : 16,
                borderRadius: 8,
                padding: 16,
            }}
        >
            <Text style={{ fontWeight: '600' }}>Total {count} Items</Text>
            <DividedSolid />
            {isSplitBill && listItems.length > 0
                ? listItems?.map((data) => {
                      console.log(data);
                      const { items } = data;
                      if (items.find((item) => item.status === 'cancel')) {
                          return null;
                      }
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
        </ColStyled>
    );
}

export const RenderItem = ({ item }: { item: ItemType }) => {
    const { theme } = useTheme();
    return (
        <div>
            <Row justify={'space-between'} style={{ marginTop: 32 }}>
                <Col style={{ flex: 1 }}>
                    <Row>
                        <Col>
                            <Text18 style={{ marginRight: 8 }}>
                                {item.quantityText
                                    ? item.quantityText
                                    : item.quantity}{' '}
                                X
                            </Text18>
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Text18>{item.product.name}</Text18>
                        </Col>
                        <CustomTag
                            {...getTagStyled(
                                item.isUnsend ? 'New' : item?.status,
                                theme,
                            )}
                        />
                    </Row>
                </Col>
                <Text18>
                    $ {formatNumberWithCommas(item.prices.price.value)}
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
