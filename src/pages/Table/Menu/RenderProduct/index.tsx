import { StyledCartBorder } from 'pages/Table/Cart/styled';
import { ProductType } from '../useCategory';
import { Col, Row, Spin } from 'antd';
import { useProductDetail } from 'pages/Table/Menu/RenderProduct/useProductDetail';
import RenderRight from './RenderRight';
import RenderLeft from './RenderLeft';
import RenderLeftVariants from './RenderLeft_Variants';

export default function RenderProduct({ product }: { product: ProductType }) {
    const {
        listItems,
        onSelectOption,
        total,
        productPrice,
        loading,
        listVariants,
        onSelectChangeOption,
        quantityVariant,
        onChangeQuantity,
        isDynamic,
        onSelectCheckBoxOption,
        onAddMoreOption,
    } = useProductDetail({
        product: product,
    });
    return (
        <StyledCartBorder style={{ padding: 16, marginBlock: 25 }}>
            {loading ? (
                <Spin size="large" />
            ) : listVariants.length > 0 ? (
                <Row>
                    <Col md={{ span: 16 }} xs={{ span: 24 }}>
                        <RenderLeftVariants
                            listVariants={listVariants}
                            quantityVariant={quantityVariant}
                            onChangeQuantity={onChangeQuantity}
                        />
                    </Col>
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 8 }}
                        style={{
                            minHeight: 300,
                            borderLeftWidth: 1,
                            borderLeftColor: '#666666',
                            borderLeftStyle: 'dashed',
                            paddingLeft: 20,
                        }}
                    >
                        <RenderRight
                            listVariants={listVariants}
                            quantityVariant={quantityVariant}
                            product={product}
                            productPrice={productPrice}
                            total={total}
                            isVariant={true}
                            isDynamic={isDynamic}
                        />
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col md={{ span: 16 }} xs={{ span: 24 }}>
                        <RenderLeft
                            isDynamic={isDynamic}
                            listItems={listItems}
                            onSelectOption={onSelectOption}
                            onSelectChangeOption={onSelectChangeOption}
                            onSelectCheckBoxOption={onSelectCheckBoxOption}
                            onAddMoreOption={onAddMoreOption}
                        />
                    </Col>
                    <Col
                        md={{ span: 8 }}
                        xs={{ span: 24 }}
                        style={{
                            minHeight: 300,
                            borderLeftWidth: 1,
                            borderLeftColor: '#666666',
                            borderLeftStyle: 'dashed',
                            paddingLeft: 20,
                        }}
                    >
                        <RenderRight
                            listItems={listItems}
                            product={product}
                            productPrice={productPrice}
                            total={total}
                            isDynamic={isDynamic}
                        />
                    </Col>
                </Row>
            )}
        </StyledCartBorder>
    );
}
