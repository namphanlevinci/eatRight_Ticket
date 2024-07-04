import { Col } from 'antd';
import MenuItem from 'pages/Table/Cart/components/MenuItem';
import React from 'react';
import { CategoryTree } from '../category';

export default function RenderCategoryColumn({
    data,
    onSetCategoryIndex,
    categoryIndex,
}: {
    data: CategoryTree[];
    onSetCategoryIndex: any;
    categoryIndex: number;
}) {
    return (
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
            {data.map((item, index) => {
                return (
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
                );
            })}
        </Col>
    );
}
