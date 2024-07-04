import { Row } from 'antd';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import BreadCrum from 'components/atom/BreadCrum/BreadCrum';
import React from 'react';
import { BreadCrumType } from '../useMenu';
import { Text } from 'components/atom/Text';

export default function BreadCrumbs({
    breadCrumbs,
}: {
    breadCrumbs: BreadCrumType[];
}) {
    return (
        <Row>
            {breadCrumbs.map((item, index) => {
                return (
                    <Row key={`${index}-bc`} align={'middle'}>
                        {index !== 0 && <ArrowRightIcon />}
                        {item.product ? (
                            <Row
                                style={{
                                    background: '#6666664D',
                                    height: 52,
                                    borderRadius: 8,
                                    gap: 10,
                                    padding: '0 20px',
                                }}
                                align={'middle'}
                            >
                                <img
                                    src={item.product?.small_image?.url}
                                    width={30}
                                />
                                <Text>{item.product.name}</Text>
                            </Row>
                        ) : (
                            <div
                                onClick={() => item.onSelect && item.onSelect()}
                            >
                                <BreadCrum
                                    isSelected={
                                        index === breadCrumbs.length - 1
                                    }
                                >
                                    {item.name}
                                </BreadCrum>
                            </div>
                        )}
                    </Row>
                );
            })}
        </Row>
    );
}
