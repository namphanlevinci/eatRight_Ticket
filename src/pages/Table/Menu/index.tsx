/* eslint-disable no-var */
import { App, Col, Row, Spin } from 'antd';
import MenuItem from '../Cart/components/MenuItem';
import RenderCategoryColumn from './RenderCategoryColumn';
import RenderProduct from './RenderProduct';
import { useCart } from 'context/cartContext';
import { ItemType } from 'context/cartType';
import { useMenuContext } from '../context/MenuContext';
import BreadCrumbs from './BreadCrumbs';
import { formatNumberWithCommas } from 'utils/format';
import SearchTable from 'pages/Home/components/Search';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';

export default function Menu() {
    const {
        breadCrumbs,
        categoryIndex,
        data,
        onSetCategoryIndex,
        product,
        setProduct,
    } = useMenuContext();
    const { addToCart } = useCart();
    const { notification } = App.useApp();
    const [search, setSearch] = useState();
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    function removeAccents(str: string) {
        return str
            .normalize('NFD') // Decompose accents from letters
            .replace(/[\u0300-\u036f]/g, ''); // Remove all the accent marks
    }
    function searchProductByName(productName: string, products: any) {
        var foundProducts: any = [];
        const normalizedProductName = removeAccents(productName.toLowerCase());

        products?.forEach(function (category: any) {
            category?.products?.items?.forEach(function (product: any) {
                const normalizedProduct = removeAccents(
                    product.name.toLowerCase(),
                );
                if (normalizedProduct.includes(normalizedProductName)) {
                    foundProducts.push(product);
                }
            });
        });
        return foundProducts;
    }

    useEffect(() => {
        if (categoryIndex) {
            setSearch(undefined);
        }
    }, [categoryIndex]);
    const { theme } = useTheme();
    const onClickAddToCart = (item: any) => {
        if (item.__typename === 'SimpleProduct') {
            const Item: ItemType = {
                id: item.sku,
                prices: {
                    price: {
                        value: item.price.regularPrice.amount.value,
                    },
                },
                product: item,
                quantity: 1,
                isUnsend: true,
            };
            addToCart(Item);
            notification.success({
                message: 'Add to cart successfully',
                placement: 'topRight',
            });
        } else {
            setProduct(item);
        }
    };
    return data.length < 1 ? (
        <Spin />
    ) : (
        <div>
            <Row justify={'space-between'} align={'middle'}>
                <BreadCrumbs breadCrumbs={breadCrumbs} />
                <StyledSearch>
                    <SearchTable
                        height={52}
                        onChangeText={setSearch}
                        allowClear
                        data={search}
                    />
                </StyledSearch>
            </Row>
            {breadCrumbs.length < 2 || !product ? (
                <Row style={{ marginTop: 16 }}>
                    <RenderCategoryColumn
                        data={data}
                        categoryIndex={categoryIndex}
                        onSetCategoryIndex={onSetCategoryIndex}
                    />
                    <Col xs={{ span: 12 }} md={{ span: 18 }}>
                        <Row>
                            {search
                                ? searchProductByName(search, data).map(
                                      (item: any, index: number) => {
                                          return (
                                              <Col
                                                  xs={{ span: 24 }}
                                                  md={{ span: 8 }}
                                                  key={index}
                                                  style={
                                                      isMobile
                                                          ? {
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'end',
                                                            }
                                                          : {}
                                                  }
                                              >
                                                  <div
                                                      onClick={() =>
                                                          onClickAddToCart(item)
                                                      }
                                                  >
                                                      <MenuItem
                                                          isSubCategory={
                                                              item.__typename !==
                                                              'SimpleProduct'
                                                          }
                                                          isProduct={
                                                              item.__typename ===
                                                              'SimpleProduct'
                                                          }
                                                      >
                                                          {item.name}
                                                          {item.__typename ===
                                                              'SimpleProduct' && (
                                                              <p>
                                                                  {formatNumberWithCommas(
                                                                      item.price
                                                                          .regularPrice
                                                                          .amount
                                                                          .value,
                                                                  )}
                                                              </p>
                                                          )}
                                                      </MenuItem>
                                                  </div>
                                              </Col>
                                          );
                                      },
                                  )
                                : data[categoryIndex]?.products.items?.map(
                                      (item: any, index: number) => {
                                          return (
                                              <Col
                                                  xs={{ span: 24 }}
                                                  md={{ span: 8 }}
                                                  key={index}
                                                  style={
                                                      isMobile
                                                          ? {
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'end',
                                                            }
                                                          : {}
                                                  }
                                              >
                                                  <div
                                                      onClick={() =>
                                                          onClickAddToCart(item)
                                                      }
                                                  >
                                                      <MenuItem
                                                          isSubCategory={
                                                              item.__typename !==
                                                              'SimpleProduct'
                                                          }
                                                          isProduct={
                                                              item.__typename ===
                                                              'SimpleProduct'
                                                          }
                                                      >
                                                          <p>{item.name}</p>
                                                          {item.__typename ===
                                                              'SimpleProduct' && (
                                                              <p
                                                                  style={{
                                                                      color: theme.pRIMARY6Primary,
                                                                  }}
                                                              >
                                                                  ${' '}
                                                                  {item.price.regularPrice.amount.value.toFixed(
                                                                      2,
                                                                  )}
                                                              </p>
                                                          )}
                                                      </MenuItem>
                                                  </div>
                                              </Col>
                                          );
                                      },
                                  )}
                        </Row>
                    </Col>
                </Row>
            ) : (
                <RenderProduct product={product} />
            )}
        </div>
    );
}

const StyledSearch = styled.div`
    width: 500px;
    @media (max-width: 768px) {
        width: 100%;
        margin-block: 20px;
    }
`;
