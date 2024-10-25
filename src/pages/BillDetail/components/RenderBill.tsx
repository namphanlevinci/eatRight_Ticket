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
import moment from 'moment';

const RenderBillItem = ({
    data,
    selectDataShowbill,
    dataInvoice,
}: {
    data?: any;
    selectDataShowbill: any;
    dataInvoice?: any;
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

    const baseTotal = selectDataShowbill
        ? selectDataShowbill?.total?.subtotal?.value -
          totalDiscount +
          selectDataShowbill?.total?.total_tax?.value
        : data?.total?.subtotal?.value -
          totalDiscount +
          data?.total?.total_tax?.value;

    const tip = selectDataShowbill
        ? Math.abs(
              selectDataShowbill?.total?.grand_total?.value -
                  (selectDataShowbill?.total?.subtotal?.value -
                      totalDiscount +
                      selectDataShowbill?.total?.total_tax?.value),
          )
        : Math.abs(data?.tip_amount?.value);

    const nonCashAdjustment = selectDataShowbill
        ? selectDataShowbill.non_cash_amount
        : dataInvoice?.length > 0
          ? dataInvoice.reduce(
                (a: any, b: any) => a + parseFloat(b?.non_cash_amount),
                0,
            ) || 0
          : 0;
    const total = isEmpty(nonCashAdjustment)
        ? Math.abs(baseTotal).toFixed(2)
        : (baseTotal + parseFloat(nonCashAdjustment)).toFixed(2);

    const address = data?.restaurant_address?.split(', ')?.[0];
    const grand_total = selectDataShowbill
        ? selectDataShowbill?.grand_total?.value
        : data?.total?.grand_total?.value;

    const subTotal = selectDataShowbill
        ? selectDataShowbill?.total?.subtotal?.value
        : data?.total?.subtotal?.value;

    const taxValue =
        (selectDataShowbill
            ? selectDataShowbill?.total?.total_tax?.value
            : data?.total?.total_tax?.value) || 0;
    const ct1 = totalDiscount ? subTotal - totalDiscount : subTotal;

    const taxPercent = taxValue ? Math.floor((taxValue / ct1) * 100) : null;

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
                    {`${address?.substring?.(0, 42)} ${address?.length > 42 && ' ...'}`}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 8 }}>
                    {data?.restaurant_address
                        ?.split?.(',')
                        .slice?.(1)
                        ?.toString?.()}
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
                        {`${moment(data?.created_at).format('MM/DD/YYYY hh:mm A')}`}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>{data?.order_source}</TextDark>
                    <TextDark>
                        <BoldText>Bill: </BoldText>
                        {selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataInvoice?.length === 1
                              ? dataInvoice[0]?.number?.slice?.(-4)
                              : data?.order_number?.slice?.(-4)}
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
                            <BoldText>Waiter: </BoldText>
                            {data?.serve_name?.split?.(',')?.[0]}
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
                        {CURRENTCY} {subTotal.toFixed(2)}
                    </TextDark>
                </RowStyled>
                {totalDiscount && totalDiscount > 0 ? (
                    <RowStyled>
                        <TextDark style={text16}>Discount:</TextDark>
                        <TextDark>
                            - {CURRENTCY} {totalDiscount?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                ) : (
                    <div />
                )}
                {data?.total?.total_tax?.value &&
                data?.total?.total_tax?.value > 0 ? (
                    <RowStyled align={'middle'}>
                        <TextDark
                            style={text16}
                        >{`Tax: (${taxPercent})%`}</TextDark>{' '}
                        <TextDark>
                            {CURRENTCY} {taxValue?.toFixed?.(2)}
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
                {dataInvoice?.length > 0 && dataInvoice[0]?.non_cash_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Base total:</TextDark>
                        <TextDark>
                            {CURRENTCY} {Math.abs(baseTotal)?.toFixed?.(2)}
                        </TextDark>
                    </RowStyled>
                )}
                <DividedDashed />
                {dataInvoice?.length > 0 && dataInvoice[0]?.non_cash_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Non-Cash Adjustment :
                        </TextDark>
                        <TextDark>
                            {CURRENTCY} {nonCashAdjustment?.toFixed?.(2)}
                        </TextDark>
                    </RowStyled>
                )}

                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total:</TextDark>
                    <TextDark>
                        {CURRENTCY} {CURRENTCY} {total}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>{`Tip :$`}</TextDark>
                    <TextDark>_______________________________</TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Grand Total:$</TextDark>
                    {tip > 0 ? (
                        <TextDark>
                            {CURRENTCY} {(grand_total + tip)?.toFixed?.(2)}
                        </TextDark>
                    ) : (
                        <TextDark>______________________</TextDark>
                    )}
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
                {dataInvoice?.[0]?.payment_methods?.[0]?.name == 'Cash' &&
                    dataInvoice?.[0]?.total_received?.received_amount &&
                    dataInvoice?.[0]?.total_received?.change_amount && (
                        <>
                            <RowStyled align={'middle'}>
                                <div
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <TextDark style={text16}>
                                        Received:
                                    </TextDark>
                                    <TextDark>
                                        {`${CURRENTCY} ${data?.total_received?.received_amount?.value?.toFixed?.(2)}`}
                                    </TextDark>
                                </div>

                                <div
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <TextDark style={text16}>Change:</TextDark>
                                    <TextDark>
                                        {`${CURRENTCY} ${data?.total_received?.change_amount?.value?.toFixed?.(2)}`}
                                    </TextDark>
                                </div>
                            </RowStyled>
                        </>
                    )}
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

                {selectDataShowbill
                    ? selectDataShowbill?.payment_methods &&
                      selectDataShowbill?.payment_methods[0]?.additional_data[1]
                          ?.value && (
                          <RowStyled align={'middle'}>
                              <TextDark style={text16}>
                                  {
                                      selectDataShowbill?.payment_methods[0]
                                          ?.additional_data[1]?.value
                                  }
                                  {'  '}
                                  {
                                      selectDataShowbill?.payment_methods[0]
                                          ?.additional_data[0]?.value
                                  }
                              </TextDark>
                          </RowStyled>
                      )
                    : data?.payment_methods &&
                      data?.payment_methods[0]?.additional_data[1]?.value && (
                          <RowStyled align={'middle'}>
                              <TextDark style={text16}>
                                  {
                                      data?.payment_methods[0]
                                          ?.additional_data[1]?.value
                                  }
                                  {'  '}
                                  {
                                      data?.payment_methods[0]
                                          ?.additional_data[0]?.value
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
