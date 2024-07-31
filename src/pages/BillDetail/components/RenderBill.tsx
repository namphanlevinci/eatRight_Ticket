/* eslint-disable no-unsafe-optional-chaining */
import { Col, Row } from 'antd';
import { TextDark } from 'components/atom/Text';
import Barcode from 'react-barcode';

import { CURRENTCY } from 'constants/currency';
import {
    DividedDashed,
    RowStyled,
    text24,
    BarCodeContainer,
    text16,
    text16W,
    BoldText,
} from '../styled';
export const RenderBill = ({
    data,
    selectDataShowbill,
}: {
    data: any;
    selectDataShowbill: any;
}) => {
    console.log(selectDataShowbill);
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
                    {data?.firstname}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 16 }}>
                    {data?.address}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 8 }}>
                    Hotline: {data?.phone}
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
                    <TextDark>{data?.order_type}</TextDark>
                    <TextDark>
                        <BoldText>Bill: </BoldText>
                        {data?.order_number}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>
                        <BoldText>Table: </BoldText>
                        {data?.table_name}
                    </TextDark>
                    <TextDark>
                        <BoldText>Server: </BoldText>
                        {data?.server_name}
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
                        {CURRENTCY}{' '}
                        {(data?.sub_total
                            ? data?.sub_total
                            : data?.grand_total + totalDiscount
                        ).toFixed(2)}{' '}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark style={text16}>Discount:</TextDark>
                    <TextDark>
                        - {CURRENTCY} {totalDiscount.toFixed(2)}
                    </TextDark>
                </RowStyled>
                {data?.discount?.length > 0 &&
                    data?.discount?.map((discount: any, index: number) => {
                        return (
                            <Row justify={'end'} key={`Discount-${index}`}>
                                <TextDark style={{ fontSize: 14 }}>
                                    {discount?.label} -{' '}
                                    {discount?.amount?.value.toFixed(2)}
                                </TextDark>
                            </Row>
                        );
                    })}
                {data?.tax_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Tax {`(${data?.tax || 8}%):`}
                        </TextDark>
                        <TextDark>
                            {CURRENTCY} {data?.tax_amount?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                )}

                {data?.service_charge_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Service Charge {`(${data?.service_charge || 10}%):`}
                        </TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {data?.service_charge_amount?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                )}
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {data?.total
                            ? data?.total.toFixed(2)
                            : (
                                  data?.grand_total - data?.tip_amount?.value
                              ).toFixed(2)}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Tip:</TextDark>
                    <TextDark>
                        {CURRENTCY} {data?.tip_amount?.value?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Grand Total:</TextDark>
                    <TextDark>
                        {CURRENTCY} {data?.grand_total?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Payment Method:</TextDark>
                    <TextDark>{data?.payment_method}</TextDark>
                </RowStyled>

                {data?.cart_type && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Cart Type:</TextDark>
                        <TextDark>{data?.cart_type}</TextDark>
                    </RowStyled>
                )}
                {data?.last_digits && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Last 4 Digits:</TextDark>
                        <TextDark>{data?.last_digits}</TextDark>
                    </RowStyled>
                )}
                <DividedDashed />
                <TextDark>
                    <TextDark style={text16}>
                        Signature:_________________________
                    </TextDark>
                </TextDark>
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
                    Feedback/Contact us: {data?.feedbackUrl}
                </TextDark>

                <BarCodeContainer>
                    <Barcode value={data?.order_number} />
                </BarCodeContainer>
            </div>
        </div>
    );
};

const RenderItem = ({ data }: { data: any }) => {
    console.log(data);
    return data?.items?.map((item: any, index: number) => {
        return (
            <>
                <RowStyled key={index}>
                    <Col style={{ textAlign: 'left', width: 30 }}>
                        <span>{item?.qty}</span>
                    </Col>
                    <Col style={{ flex: 1 }}> {item?.name}</Col>
                    <Col style={{ textAlign: 'end', width: 50 }}>
                        {CURRENTCY}
                        {item?.price.toFixed(2)}
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
