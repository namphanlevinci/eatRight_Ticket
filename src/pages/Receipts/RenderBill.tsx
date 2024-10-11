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

const RenderBillItem = ({ data }: { data?: ReceiptDetail }) => {
    const totalDiscount = data?.total?.discounts?.reduce(
        (total: number, discount: any) => {
            total += discount.amount.value;
            return total;
        },
        0,
    );
    if (!data) {
        return <div />;
    }
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
                    {data?.restaurant_address}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 8 }}>
                    Hotline: {data?.restaurant_phone_number}
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
                        {data?.order_date}
                    </TextDark>
                    <TextDark>
                        <BoldText>Time: </BoldText>
                        {data?.order_time}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>{data?.order_type}</TextDark>
                    <TextDark>
                        <BoldText>Bill: </BoldText>
                        {data.increment_id}
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
                <RowStyled>
                    <TextDark style={text16}>Discount:</TextDark>
                    <TextDark>
                        - {CURRENTCY} {totalDiscount?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                {data?.total?.total_tax?.value ? (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Tax</TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {data?.total?.total_tax?.value?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                ) : (
                    <></>
                )}

                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Base total:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {(
                            data?.total?.subtotal?.value -
                            (totalDiscount || 0) +
                            data?.total?.total_tax?.value
                        )?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <DividedDashed />

                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Non-Cash Adjustment :</TextDark>
                    <TextDark>
                        {CURRENTCY} {data?.non_cash_amount}
                    </TextDark>
                </RowStyled>

                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Tip:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {(
                            data?.total?.grand_total?.value -
                            (data?.total?.subtotal?.value -
                                (totalDiscount || 0) +
                                data?.total?.total_tax?.value)
                        ).toFixed(2)}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {(
                            parseFloat(
                                `${data?.total?.grand_total?.value || 0} `,
                            ) + parseFloat(`${data?.non_cash_amount || 0}`)
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
                        {convertMethod(data.payment_method.title)}
                    </TextDark>
                </RowStyled>

                {data?.payment_method && data?.payment_method.card_type && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            {data?.payment_method.card_type}
                            {'  '}
                            {data?.payment_method.last_digits}
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
