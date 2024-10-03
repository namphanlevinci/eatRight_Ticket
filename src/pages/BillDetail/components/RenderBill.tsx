/* eslint-disable no-unsafe-optional-chaining */
import { Col } from 'antd';
import { TextDark } from 'components/atom/Text';

import { CURRENTCY } from 'constants/currency';
import {
    DividedDashed,
    RowStyled,
    text24,
    text16,
    text16W,
    BoldText,
} from '../styled';
import React from 'react';
import { convertMethod } from 'utils/format';
import { isEmpty } from 'lodash';

const RenderBillItem = ({
    data,
    selectDataShowbill,
    dataInvoice,
}: {
    data: any;
    selectDataShowbill: any;
    dataInvoice: any;
}) => {
    const totalDiscount = selectDataShowbill
        ? selectDataShowbill?.total?.discounts.reduce(
              (total: number, discount: any) => {
                  total += discount.amount.value;
                  return total;
              },
              0,
          )
        : data?.discount?.length > 0
          ? data?.discount?.reduce((total: number, discount: any) => {
                total += discount.amount.value;
                return total;
            }, 0)
          : 0;

    return (
        <div
            style={{
                width: '320px',
                borderRadius: 8,
                background: 'white',
                paddingTop: 20,
                paddingInline: 16,
                overflow: 'auto',
            }}
        >
            <div id="billHeader">
                <TextDark style={{ ...text24, fontWeight: '600' }}>
                    {data?.restaurant_name}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 16 }}>
                    {data?.restaurant_address}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 8 }}>
                    Hotline: {data?.restaurant_phone}
                </TextDark>

                <DividedDashed />
                <TextDark
                    style={{
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    RECEIPT
                </TextDark>

                <RowStyled>
                    <TextDark>
                        <BoldText>Date: </BoldText>
                        {data?.created_at && data?.created_at.split(' ')[0]}
                    </TextDark>
                    <TextDark>
                        <BoldText>Time: </BoldText>
                        {data?.created_at && data?.created_at.split(' ')[1]}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>{data?.order_source}</TextDark>
                    <TextDark>
                        <BoldText>Bill: </BoldText>
                        {selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataInvoice?.length === 1
                              ? dataInvoice[0]?.number
                              : data?.order_number}
                    </TextDark>
                </RowStyled>
                {data?.table ? (
                    <RowStyled>
                        <TextDark>
                            <BoldText>Table: </BoldText>
                            {data?.table}
                        </TextDark>
                        <TextDark
                            style={{
                                width: 150,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            <BoldText>Server: </BoldText>
                            {data?.serve_name}
                        </TextDark>
                    </RowStyled>
                ) : (
                    <></>
                )}
                <RowStyled>
                    <TextDark>
                        <BoldText>Customer: </BoldText>
                        {data?.firstname || 'Guest'}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
            </div>
            <div id="billContent">
                {selectDataShowbill ? (
                    <RenderItem2 data={selectDataShowbill} />
                ) : (
                    <RenderItem data={data} />
                )}
            </div>
            <div id="billFooter">
                <DividedDashed />

                <RowStyled>
                    <TextDark style={text16}>Subtotal:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {selectDataShowbill
                            ? selectDataShowbill?.total?.subtotal?.value?.toFixed(
                                  2,
                              )
                            : data?.total?.subtotal?.value?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark style={text16}>Discount:</TextDark>
                    <TextDark>
                        - {CURRENTCY} {totalDiscount.toFixed(2)}
                    </TextDark>
                </RowStyled>
                {data?.total?.total_tax?.value ? (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Tax</TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {(selectDataShowbill
                                ? selectDataShowbill?.total?.total_tax?.value?.toFixed(
                                      2,
                                  )
                                : data?.total?.total_tax?.value?.toFixed(2)) ||
                                0}
                        </TextDark>
                    </RowStyled>
                ) : (
                    <></>
                )}

                {data?.total?.service_charge_amount?.value && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Service Charge{' '}
                            {`(${data?.total?.service_charge_amount?.value || 10}%):`}
                        </TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {selectDataShowbill
                                ? selectDataShowbill?.total?.service_charge_amount?.value?.toFixed(
                                      2,
                                  )
                                : data?.total?.service_charge_amount?.value?.toFixed(
                                      2,
                                  )}
                        </TextDark>
                    </RowStyled>
                )}
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Base total:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {selectDataShowbill
                            ? (
                                  selectDataShowbill?.total?.subtotal?.value -
                                  totalDiscount +
                                  selectDataShowbill?.total?.total_tax?.value
                              )?.toFixed(2)
                            : (
                                  data?.total?.subtotal?.value -
                                  totalDiscount +
                                  data?.total?.total_tax?.value
                              )?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <DividedDashed />

                {dataInvoice?.length > 0 && dataInvoice[0]?.non_cash_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Non-Cash Adjustment :
                        </TextDark>
                        <TextDark>
                            {CURRENTCY} {dataInvoice[0]?.non_cash_amount}
                        </TextDark>
                    </RowStyled>
                )}
                {dataInvoice?.length > 0 && dataInvoice[0]?.non_cash_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Total:</TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {(selectDataShowbill
                                ? (
                                      selectDataShowbill?.total?.subtotal
                                          ?.value -
                                      totalDiscount +
                                      selectDataShowbill?.total?.total_tax
                                          ?.value
                                  )?.toFixed(2)
                                : data?.total?.subtotal?.value -
                                  totalDiscount +
                                  data?.total?.total_tax?.value +
                                  parseFloat(dataInvoice[0]?.non_cash_amount)
                            )?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                )}

                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Tip:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {selectDataShowbill
                            ? (
                                  selectDataShowbill?.total?.grand_total
                                      ?.value -
                                  (selectDataShowbill?.total?.subtotal?.value -
                                      totalDiscount +
                                      selectDataShowbill?.total?.total_tax
                                          ?.value)
                              ).toFixed(2)
                            : data?.tip_amount?.value?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {selectDataShowbill
                            ? (
                                  parseFloat(
                                      selectDataShowbill?.total?.grand_total
                                          ?.value,
                                  ) +
                                  parseFloat(
                                      selectDataShowbill?.non_cash_amount || 0,
                                  )
                              )?.toFixed(2)
                            : (
                                  parseFloat(data?.grand_total) +
                                  (dataInvoice?.length > 0
                                      ? dataInvoice.reduce(
                                            (a: any, b: any) =>
                                                a +
                                                parseFloat(b?.non_cash_amount),
                                            0,
                                        ) || 0
                                      : 0)
                              )?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Tip:$</TextDark>
                    <TextDark>_______________________________</TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Grand Total:$</TextDark>
                    <TextDark>______________________</TextDark>
                </RowStyled>
                <DividedDashed />
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Payment Method:</TextDark>
                    <TextDark>
                        {convertMethod(
                            selectDataShowbill
                                ? selectDataShowbill?.payment_methods[0]?.name
                                : data?.payment_method,
                        )}
                    </TextDark>
                </RowStyled>
                {!isEmpty(dataInvoice?.[0]?.payment_methods?.[0]?.po_number) &&
                    dataInvoice?.[0]?.payment_methods?.[0]?.po_number !==
                        'none' && (
                        <RowStyled align={'middle'}>
                            <TextDark style={text16}>
                                {
                                    dataInvoice?.[0]?.payment_methods?.[0]
                                        ?.po_number
                                }
                            </TextDark>
                        </RowStyled>
                    )}

                {data?.payment_methods &&
                    data?.payment_methods[0]?.additional_data[1]?.value && (
                        <RowStyled align={'middle'}>
                            <TextDark style={text16}>
                                {
                                    data?.payment_methods[0]?.additional_data[1]
                                        ?.value
                                }
                                {'  '}
                                {
                                    data?.payment_methods[0]?.additional_data[0]
                                        ?.value
                                }
                            </TextDark>
                        </RowStyled>
                    )}
                <DividedDashed />
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Signature:</TextDark>
                    <TextDark>______________________</TextDark>
                </RowStyled>
                <DividedDashed />
                <TextDark
                    style={{
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    Customer Copy
                </TextDark>
                <TextDark style={{ marginTop: 10 }}>
                    Thank you for dining with us!
                </TextDark>
                <TextDark style={{ marginTop: 10 }}>
                    Feedback/Contact us: {data?.feedback_url}
                </TextDark>
                <div style={{ height: 24 }} />
            </div>
        </div>
    );
};
export const RenderBill = React.memo(RenderBillItem);
const RenderItem = ({ data }: { data: any }) => {
    return data?.items?.map((item: any, index: number) => {
        return (
            <>
                <RowStyled key={index}>
                    <Col style={{ textAlign: 'left', width: 30 }}>
                        <span>{item?.qty}</span>
                    </Col>
                    <Col style={{ flex: 1 }}> {item?.name}</Col>
                    <Col style={{ textAlign: 'end', width: 'auto' }}>
                        {CURRENTCY}
                        {(item?.qty * item?.price).toFixed(2)}
                    </Col>
                </RowStyled>
                {item?.options?.map((option: any, idx: number) => {
                    return (
                        <RowStyled
                            key={`${index}-${idx}`}
                            style={{ paddingLeft: 20 }}
                        >
                            <TextDark style={text16}>• {option?.name}</TextDark>
                        </RowStyled>
                    );
                })}
            </>
        );
    });
};

const RenderItem2 = ({ data }: { data: any }) => {
    return data?.items?.map((item: any, index: number) => {
        return (
            <>
                <RowStyled key={index}>
                    <Col style={{ textAlign: 'left', width: 30 }}>
                        <span>{item?.quantity_invoiced?.toFixed(2)}</span>
                    </Col>
                    <Col style={{ flex: 1 }}> {item?.product_name}</Col>
                    <Col style={{ textAlign: 'end', width: 'auto' }}>
                        {CURRENTCY}
                        {(
                            item?.quantity_invoiced *
                            item?.product_sale_price?.value
                        )?.toFixed(2)}
                    </Col>
                </RowStyled>
            </>
        );
    });
};
