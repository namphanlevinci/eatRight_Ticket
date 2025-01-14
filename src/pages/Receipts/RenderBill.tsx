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
} from 'pages/BillDetail/styled';
import React from 'react';
import { convertMethod } from 'utils/format';
import { ReceiptDetail } from 'graphql/receipts';
import { isEmpty } from 'lodash';
import moment from 'moment';

const RenderBillItem = ({ data }: { data?: ReceiptDetail }) => {
    let totalDiscount = data?.total?.discounts?.reduce(
        (total: number, discount: any) => {
            total += discount.amount.value;
            return total;
        },
        0,
    );
    totalDiscount = totalDiscount ?? undefined;
    if (!data) {
        return <div />;
    }

    const address = data?.restaurant_address?.split(', ')?.[0];

    const baseTotal =
        data?.total?.grand_total?.value -
        (data?.total?.subtotal?.value -
            (totalDiscount || 0) +
            data?.total?.total_tax?.value);

    const tip = Math.abs(
        data?.total?.grand_total?.value -
            (data?.total?.subtotal?.value -
                (totalDiscount || 0) +
                data?.total?.total_tax?.value),
    );

    const total = isEmpty(data?.non_cash_amount)
        ? Math.abs(baseTotal).toFixed(2)
        : (baseTotal + parseFloat(data?.non_cash_amount)).toFixed(2);

    const taxValue = data?.total?.total_tax?.value;
    const ct1 = totalDiscount
        ? data?.total?.subtotal?.value - totalDiscount
        : data?.total?.subtotal?.value;

    const taxPercent = taxValue ? Math.floor((taxValue / ct1) * 100) : null;

    return (
        <div
            style={{
                width: '320px',
                borderRadius: 8,
                background: 'white',
                paddingInline: 16,
                paddingBottom: 64,
                paddingTop: 64,
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
                    {data?.restaurant_phone_number}
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
                        {`${moment(data?.order_date, ['YYYY-MM-DD']).format('MM/DD/YYYY')} ${moment(data?.order_time, ['HH:mm:ss']).format('hh:mm A')}`}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>{data?.order_type}</TextDark>
                    <TextDark>
                        <BoldText>Bill: </BoldText>
                        {data.increment_id?.slice?.(-4)}
                    </TextDark>
                </RowStyled>
                {data?.table_name ? (
                    <RowStyled>
                        <TextDark>
                            <BoldText>Table: </BoldText>
                            {data?.table_name}
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
                        {data?.customer_name || 'Guest'}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
            </div>
            <div id="billContent">
                <RenderItem data={data} />
            </div>
            <div id="billFooter">
                <DividedDashed />
                <RowStyled>
                    <TextDark style={text16}>Subtotal:</TextDark>
                    <TextDark>
                        {CURRENTCY} {data.total?.subtotal?.value?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                {totalDiscount && totalDiscount !== 0 ? (
                    <RowStyled>
                        <TextDark style={text16}>Discount:</TextDark>
                        <TextDark>
                            - {CURRENTCY} {Math.abs(totalDiscount)?.toFixed(2)}
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
                        >{`Tax: (${taxPercent})%`}</TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {data?.total?.total_tax?.value?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                ) : (
                    <></>
                )}
                {!isEmpty(data?.non_cash_amount) && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Base total:</TextDark>
                        <TextDark>
                            {CURRENTCY} {Math.abs(baseTotal).toFixed?.(2)}
                        </TextDark>
                    </RowStyled>
                )}
                <DividedDashed />
                {!isEmpty(data?.non_cash_amount) && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Non-Cash Adjustment :
                        </TextDark>
                        <TextDark>
                            {CURRENTCY} {data?.non_cash_amount}
                        </TextDark>
                    </RowStyled>
                )}
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total:</TextDark>
                    <TextDark>
                        {CURRENTCY} {total}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>
                        {`Tip (${Math.floor((tip / data.total?.subtotal?.value) * 100)}%) :`}
                    </TextDark>
                    {tip > 0 ? (
                        <TextDark>
                            {CURRENTCY} {tip.toFixed(2)}
                        </TextDark>
                    ) : (
                        <TextDark>_______________________________</TextDark>
                    )}
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Grand Total:</TextDark>
                    {tip > 0 ? (
                        <TextDark>
                            {CURRENTCY}{' '}
                            {(data?.total?.grand_total?.value + tip)?.toFixed?.(
                                2,
                            )}
                        </TextDark>
                    ) : (
                        <TextDark>______________________</TextDark>
                    )}
                </RowStyled>
                <DividedDashed />
                {data?.status?.toLocaleLowerCase?.() !== 'unpaid' && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Payment Method:</TextDark>
                        <TextDark>
                            {convertMethod(data.payment_method.title)}
                        </TextDark>
                    </RowStyled>
                )}

                {data?.payment_method?.title == 'Cash' &&
                    data?.total_received?.received_amount &&
                    data?.total_received?.change_amount &&
                    data?.status?.toLocaleLowerCase?.() !== 'unpaid' && (
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

                {!isEmpty(data.payment_method.po_number) &&
                    data.payment_method.po_number !== 'none' &&
                    data?.status?.toLocaleLowerCase?.() !== 'unpaid' && (
                        <RowStyled>
                            <TextDark style={text16}>
                                {data.payment_method.po_number}
                            </TextDark>
                        </RowStyled>
                    )}
                {data?.payment_method &&
                    data?.payment_method.card_type &&
                    data?.status?.toLocaleLowerCase?.() !== 'unpaid' && (
                        <RowStyled align={'middle'}>
                            <TextDark style={text16}>
                                {data?.payment_method.card_type}
                                {'  '}
                                {data?.payment_method.last_digits}
                            </TextDark>
                        </RowStyled>
                    )}
                <DividedDashed />
                {/* <RowStyled align={'middle'}>
                    <TextDark style={text16}>Signature:</TextDark>
                    <TextDark>______________________</TextDark>
                </RowStyled> */}
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
                    Feedback/Contact us: {data?.website_url}
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
