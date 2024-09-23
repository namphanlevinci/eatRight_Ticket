import { Col } from 'antd';
import MenuItem from 'pages/Table/Cart/components/MenuItem';
import React from 'react';
import { CategoryTree } from '../category';

export default function RenderCategoryColumn({
    data,
    onSetCategoryIndex,
    categoryIndex,
    isEatOut,
}: {
    data: CategoryTree[];
    onSetCategoryIndex: any;
    categoryIndex: number;
    isEatOut?: boolean;
}) {
    return (
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
            {data.map((item, index) => {
                const isShow = item.products.items.find((product) => {
                    if (isEatOut) {
                        if (product?.display_platforms?.includes('online')) {
                            return true;
                        }
                    } else {
                        if (product?.display_platforms?.includes('dine_in')) {
                            return true;
                        }
                    }
                });
                return (
                    isShow && (
                        <div
                            key={index}
                            onClick={() => {
                                onSetCategoryIndex({ index, item });
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <MenuItem selected={categoryIndex === index}>
                                {item.name}
                            </MenuItem>
                        </div>
                    )
                );
            })}
        </Col>
    );
}
