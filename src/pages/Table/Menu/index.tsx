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
import { ProductType } from './useCategory';

export default function Menu({ isEatOut }: { isEatOut?: boolean }) {
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
    const onClickAddToCart = (item: ProductType) => {
        if (
            item.__typename === 'SimpleProduct' ||
            item.__typename === 'VirtualProduct'
        ) {
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
                open_price: item.open_price || false,
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
                        isEatOut={isEatOut}
                    />
                    <Col xs={{ span: 12 }} md={{ span: 18 }}>
                        <Row>
                            {search
                                ? searchProductByName(search, data).map(
                                      (item: ProductType, index: number) => {
                                          if (isEatOut) {
                                              if (
                                                  !item.display_platforms.includes(
                                                      'online',
                                                  )
                                              ) {
                                                  return null;
                                              }
                                          } else {
                                              if (
                                                  !item.display_platforms.includes(
                                                      'dine_in',
                                                  )
                                              ) {
                                                  return null;
                                              }
                                          }
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
                                                                  {item.open_price
                                                                      ? 'Open Price'
                                                                      : formatNumberWithCommas(
                                                                            item
                                                                                .price
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
                                          if (isEatOut) {
                                              if (
                                                  !item.display_platforms.includes(
                                                      'online',
                                                  )
                                              ) {
                                                  return null;
                                              }
                                          } else {
                                              if (
                                                  !item.display_platforms.includes(
                                                      'dine_in',
                                                  )
                                              ) {
                                                  return null;
                                              }
                                          }
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
                                                          isVirtualProduct={
                                                              item.__typename ===
                                                              'VirtualProduct'
                                                          }
                                                      >
                                                          <span
                                                              style={{
                                                                  display:
                                                                      '-webkit-box',
                                                                  WebkitLineClamp: 2,
                                                                  WebkitBoxOrient:
                                                                      'vertical',
                                                                  overflow:
                                                                      'hidden',
                                                                  textOverflow:
                                                                      'ellipsis',
                                                                  maxWidth:
                                                                      '200px', // Đặt chiều rộng tối đa
                                                                  whiteSpace:
                                                                      'normal', // Đảm bảo dòng được bẻ đúng cách
                                                              }}
                                                          >
                                                              {' '}
                                                              {item.name}
                                                          </span>
                                                          {item.__typename ===
                                                              'SimpleProduct' && (
                                                              <p
                                                                  style={{
                                                                      color: theme.pRIMARY6Primary,
                                                                  }}
                                                              >
                                                                  {item.open_price
                                                                      ? 'Open Price'
                                                                      : ` $ 
                                                                  ${item.price.regularPrice.amount.value.toFixed(
                                                                      2,
                                                                  )}`}
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
