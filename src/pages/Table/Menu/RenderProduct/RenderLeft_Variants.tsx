import { Row } from 'antd';
import UpDownNumber from 'components/UpdownNumber';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function RenderLeftVariants({
    listVariants,
    onChangeQuantity,
}: {
    listVariants: any[];
    quantityVariant: any;
    onChangeQuantity: (
        index: number,
        quantity: number,
        price: number,
        sku: string,
        name: string,
    ) => void;
}) {
    return (
        <div>
            {listVariants.map((item, index) => (
                <RenderItem
                    item={item}
                    index={index}
                    onChangeQuantity={onChangeQuantity}
                    key={index}
                />
            ))}
        </div>
    );
}

const RenderItem = ({ item, index, onChangeQuantity }: any) => {
    {
        const name = item.product.name;
        const sku = item.product.sku;
        const price =
            item.product.price_range.minimum_price.regular_price.value;
        const [quantity, setQuantity] = useState(0);
        useEffect(() => {
            onChangeQuantity(index, quantity, price, sku, name);
        }, [quantity]);
        const { theme } = useTheme();
        const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
        return (
            <Row
                key={index}
                style={{
                    height: 56,
                    background: theme.pRIMARY1,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginRight: isMobile ? 0 : 20,
                    marginBottom: 16,
                    border: '1px solid',
                    borderColor: theme.pRIMARY2,
                }}
            >
                <Text style={{ marginLeft: 20 }}>
                    {name} {price}{' '}
                </Text>
                <UpDownNumber quantity={quantity} setQuantity={setQuantity} />
            </Row>
        );
    }
};
