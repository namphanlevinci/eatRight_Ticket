/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable curly */
import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Switch, Form, Input, Select, Button, Tooltip } from 'antd';
import { NumericFormat } from 'react-number-format';
import { useLocation } from 'react-router-dom';
import PopupAction from '../Components/PopupAction';

import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { AlertContext } from 'context/alertContext';
import { useContext } from 'react';

const { Option } = Select;

import '../index.scss';
import CustomButton from '../Components/CustomButton';
import MenuBar from '../Components/MenuBar';
import RadioOption from '../Components/Radio';
import CheckBoxOption from '../Components/CheckBoxOption';
import UploadImage from '../Components/UploadImage/UploadImage';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CATEGORY_LIST } from 'graphql/category';
import { GET_LIST_KITCHEN_STATION } from 'containers/Kitchen/printer';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT_DETAIL,
    UPDATE_PRODUCT,
} from 'graphql/product/CRUD';
import { BASE_ROUTER } from 'constants/router';
import QuestionIcon from 'assets/icons/questionIcon';
import './index.scss';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const Index = () => {
    const [apiGetCategory] = useLazyQuery(GET_CATEGORY_LIST);
    const [apiMerchantCreateProduct] = useMutation(CREATE_PRODUCT);
    const [apiMerchantUpdateProduct] = useMutation(UPDATE_PRODUCT);
    const [apiMerchantDeleteProduct] = useMutation(DELETE_PRODUCT);
    const [apiGetProductDetail] = useLazyQuery(GET_PRODUCT_DETAIL);
    const [apiGetKitchenStation] = useLazyQuery(GET_LIST_KITCHEN_STATION);
    const [isToggled, setIsToggled] = useState(true);
    const [listImage, setListImage] = useState([]);
    const [is_in_stock, setIsInStock] = useState(true);
    const [isLoading, setLoading] = React.useState(false);
    const [menuList, setMenuList] = useState([]);
    const [stations, setStations] = useState<any>([]);

    const dineInRef = useRef<any>();
    const takeAwayRef = useRef<any>();
    const openPriceRef = useRef<any>();
    const [openPrice, setOpenPrice] = useState(false);
    const history = useNavigate();
    const { id: productId } = useParams();
    const { openModal } = useContext(AlertContext);

    const location = useLocation();
    const pathname = location?.pathname;

    const refPopupDelete = useRef<any>();
    const refPopupEdit = useRef<any>();

    const [form] = Form.useForm();
    const { isOpenPrice } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (isOpenPrice) {
            setOpenPrice(true);
            openPriceRef?.current?.setValue(true);
        }
    }, [isOpenPrice]);
    const onFinish = (values: any) => {
        const dineIn = dineInRef?.current?.getValue?.() ? 'dine_in' : null;
        const takeAway = takeAwayRef?.current?.getValue?.() ? 'online' : null;
        const display_platforms = [];
        if (dineIn) display_platforms.push(dineIn);
        if (takeAway) display_platforms.push(takeAway);

        const media_gallery_entries = listImage.map((img: any) => {
            if (img?.id) {
                return {
                    id: img?.id,
                    media_type: 'image',
                };
            }
            return {
                media_type: 'image',
                label: img?.name,
                position: 0,
                disabled: false,
                types: ['image', 'small_image', 'thumbnail'],
                file: img?.name,
                content: {
                    data: {
                        base64_encoded_data: img?.thumbUrl?.replace?.(
                            'data:image/png;base64,',
                            '',
                        ),
                        name: img?.name,
                        type: 'image/png',
                    },
                },
            };
        });
        let quantity = values?.quantity;
        if (quantity && typeof quantity === 'string') {
            quantity = quantity?.replaceAll(',', '');
        }
        const payload = {
            ...values,
            display_platforms,
            is_in_stock,
            price: formatPrice(values?.price || '0'),
            status: values?.status ? 1 : 2,
            open_price: openPriceRef?.current?.getValue(),
            media_gallery_entries,
            quantity: quantity,
            kitchen_station: values?.kitchen_station || null,
        };
        setLoading(true);

        if (productId) {
            apiMerchantUpdateProduct({ variables: payload })
                .then((res) => {
                    setLoading(false);
                    if (res?.errors) {
                        openModal(res?.errors?.[0]?.message);
                        return;
                    }
                    history(BASE_ROUTER.ITEM_PAGE);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            apiMerchantCreateProduct({ variables: payload })
                .then((res) => {
                    setLoading(false);
                    if (res?.errors) {
                        openModal(res?.errors?.[0]?.message);
                        return;
                    }
                    history(BASE_ROUTER.ITEM_PAGE);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const deleteProduct = () => {
        setLoading(true);
        apiMerchantDeleteProduct({ variables: { id: productId } })
            .then((res) => {
                setLoading(false);
                if (res?.errors) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.ITEM_PAGE);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getKitchenStation = () => {
        apiGetKitchenStation({
            fetchPolicy: 'cache-and-network',
        })
            .then((res) => {
                setStations(res?.data?.getKitchenStations ?? []);
            })
            .catch((err) => {
                openModal(err.message);
            });
    };

    useEffect(() => {
        getKitchenStation();
        apiGetCategory({
            variables: {
                currentPage: 1,
                pageSize: 100,
                field: 'id',
                position: 'DESC',
            },
            fetchPolicy: 'cache-and-network',
        })
            .then((res) => {
                setMenuList(res?.data?.merchantCategories?.items ?? []);
            })
            .catch((err) => {
                openModal(err.message);
            });
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!productId) {
            return;
        }
        const getDetail = () => {
            setLoading(true);
            apiGetProductDetail({
                variables: { id: parseInt(productId) },
                fetchPolicy: 'cache-and-network',
            })
                .then(async (res) => {
                    const detail = res?.data?.merchantProduct;

                    form.setFieldsValue({
                        name: detail?.name,
                        description: detail?.description_plain_text,
                        status: detail?.status == 1 ? true : false,
                        price: detail?.price?.regularPrice?.amount?.value,
                        kitchen_station: `${detail?.kitchen_station}`,
                        sku: detail?.sku,
                        category_id: detail?.categories?.[0]?.id,
                        quantity: detail?.qty,
                    });

                    setIsToggled(detail?.status == 1 ? true : false);
                    setIsInStock(
                        detail?.stock_status == 'OUT_OF_STOCK' ? false : true,
                    );

                    openPriceRef?.current?.setValue(
                        detail?.open_price ? true : false,
                    );
                    setOpenPrice(detail?.open_price ? true : false);
                    if (detail?.display_platforms?.includes?.('dine_in')) {
                        dineInRef?.current?.setValue(true);
                    }
                    if (detail?.display_platforms?.includes?.('online')) {
                        takeAwayRef?.current?.setValue(true);
                    }
                    setListImage([]);

                    const fileList = detail?.media_gallery_entries?.map?.(
                        (obj: any, index: number) => {
                            return {
                                uid: obj?.uid,
                                name: obj?.label,
                                status: 'done',
                                url: detail?.media_gallery?.[index]?.url,
                                id: obj?.id,
                            };
                        },
                    );

                    setListImage(fileList);
                })
                .catch((err) => {
                    openModal(err.message);
                });
        };

        getDetail();
        setLoading(false);
    }, [productId, menuList]);
    return (
        <div>
            <Loading loading={isLoading} />
            <div className="container-box body_history">
                <MenuBar />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        status: isToggled,
                        channels: ['Dine-in'],
                        stock_status: 'in_stock',
                        quantity: 10000,
                    }}
                >
                    {pathname?.includes?.('edit_item') ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 24,
                                marginBottom: 24,
                            }}
                        >
                            <CustomButton
                                style={{
                                    background: '#FEF1F2',
                                    color: '#E02D3C',
                                }}
                                title="Delete"
                                onClick={() =>
                                    refPopupDelete.current?.showModal?.()
                                }
                            />
                            <CustomButton
                                style={{
                                    background: '#F8F9FC',
                                    color: '#333',
                                    marginLeft: 16,
                                }}
                                title="Cancel"
                                onClick={() =>
                                    refPopupEdit.current?.showModal?.()
                                }
                            />

                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    background: 'var(--primary-6)',
                                    color: '#fff',
                                    marginLeft: 16,
                                    height: 35,
                                    width: 70,
                                    fontWeight: '600',
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 24,
                                marginBottom: 24,
                            }}
                        >
                            <CustomButton
                                style={{
                                    background: '#FEF1F2',
                                    color: '#E02D3C',
                                }}
                                title="Cancel"
                                onClick={() => history(BASE_ROUTER.ITEM_PAGE)}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    background: 'var(--primary-6)',
                                    color: '#fff',
                                    marginLeft: 16,
                                    height: 35,
                                    width: 70,
                                    fontWeight: '600',
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    )}

                    <div className="menu_new">
                        <Row gutter={16}>
                            <Col span={12}>
                                <p className="menu_new_name">Category</p>
                                <Form.Item
                                    name="category_id"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select one!',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="custom-select"
                                        style={{
                                            border: 'none',
                                            boxShadow: 'none',
                                        }}
                                        placeholder="Select a group"
                                        defaultActiveFirstOption
                                    >
                                        {menuList?.map?.((m: any) => {
                                            return (
                                                <Option
                                                    key={m?.id}
                                                    value={m?.id}
                                                >
                                                    <div
                                                        onClick={() => {
                                                            form.setFieldValue(
                                                                'kitchen_station',
                                                                `${m?.kitchen_station}`,
                                                            );
                                                            let isOpen =
                                                                m?.open_price;
                                                            if (isOpenPrice) {
                                                                isOpen = true;
                                                            }
                                                            openPriceRef?.current?.setValue(
                                                                isOpen,
                                                            );
                                                            setOpenPrice(
                                                                isOpen,
                                                            );
                                                        }}
                                                    >
                                                        {m?.name}
                                                    </div>
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <p className="menu_new_name">Item ID</p>
                                <Form.Item
                                    name="sku"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter sku',
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={productId ? true : false}
                                        placeholder="Item ID"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <p className="menu_new_name">Name</p>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Name',
                                },
                            ]}
                        >
                            <Input placeholder="Item name" />
                        </Form.Item>

                        <p className="menu_new_name">Status</p>
                        <Form.Item
                            className="custom-form-item"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch
                                checked={isToggled}
                                onChange={(checked) => setIsToggled(checked)}
                                style={{
                                    backgroundColor: isToggled
                                        ? 'var(--primary-6)'
                                        : '#d9d9d9',
                                }}
                                size="default"
                            />
                        </Form.Item>

                        <p className="menu_new_name">
                            Image ({listImage?.length}/5)
                        </p>
                        <UploadImage
                            listImage={listImage}
                            setListImage={setListImage}
                        />

                        <p className="menu_new_name">Description (optional)</p>
                        <Form.Item name="description">
                            <Input placeholder="Item description" />
                        </Form.Item>

                        <p className="menu_new_name">Price</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Item
                                style={{ width: '35%' }}
                                name="price"
                                rules={
                                    openPrice
                                        ? []
                                        : [
                                              {
                                                  validator: (_, value) => {
                                                      if (!value) {
                                                          return Promise.reject(
                                                              'Please enter price',
                                                          );
                                                      }
                                                      const formatedValue =
                                                          formatPrice(value);
                                                      if (formatedValue >= 0) {
                                                          return Promise.resolve();
                                                      }
                                                      return Promise.reject(
                                                          'Please enter a number 0 or greater in this field',
                                                      );
                                                  },
                                              },
                                          ]
                                }
                            >
                                <NumericFormat
                                    prefix="$"
                                    allowLeadingZeros
                                    thousandSeparator=","
                                    decimalScale={2}
                                    placeholder="Item price"
                                    fixedDecimalScale
                                    style={{
                                        height: 30,
                                        paddingInline: 12,
                                    }}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        form.setFieldsValue({ price: value }); // Cập nhật giá trị không định dạng vào form
                                    }}
                                />
                            </Form.Item>
                            <div
                                style={{
                                    marginTop: -24,
                                    marginLeft: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CheckBoxOption
                                    ref={openPriceRef}
                                    name="Open price"
                                    customStyle={{
                                        fontWeight: '600',
                                        marginTop: 0,
                                    }}
                                    onChange={(value: boolean) =>
                                        setOpenPrice(value)
                                    }
                                />
                                <Tooltip
                                    placement="bottomLeft"
                                    title={
                                        ' Allow custom pricing at checkout. Set price used as editable default.'
                                    }
                                    arrow={true}
                                    color="#fff"
                                    style={{
                                        color: '#000',
                                    }}
                                    overlayInnerStyle={{ color: '#000' }}
                                >
                                    <Button
                                        ghost
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 100,
                                            padding: 0,
                                        }}
                                    >
                                        <QuestionIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <p className="menu_new_name">Quantity</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Item
                                style={{ width: '35%' }}
                                name="quantity"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject(
                                                    'Please enter Quantity',
                                                );
                                            }
                                            const formatedValue =
                                                formatPrice(value);
                                            if (formatedValue >= 0) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                'Please enter a number 0 or greater in this field',
                                            );
                                        },
                                    },
                                ]}
                            >
                                <NumericFormat
                                    prefix=""
                                    allowLeadingZeros
                                    thousandSeparator=","
                                    decimalScale={0}
                                    placeholder="Quantity..."
                                    fixedDecimalScale
                                    style={{ height: 30, paddingInline: 12 }}
                                />
                            </Form.Item>
                        </div>
                        <p className="menu_new_name">Channel</p>
                        <CheckBoxOption ref={dineInRef} name="Dine-in" />
                        <CheckBoxOption ref={takeAwayRef} name="Take away" />

                        <p className="menu_new_name">Inventory</p>
                        <span
                            style={{
                                color: 'var(--text-secondary)',
                                marginTop: 16,
                            }}
                        >
                            Stock status
                        </span>
                        <RadioOption
                            name="In stock"
                            checked={is_in_stock}
                            onChecked={() => setIsInStock(true)}
                        />
                        <RadioOption
                            name="Out of stock"
                            checked={!is_in_stock}
                            onChecked={() => setIsInStock(false)}
                        />
                        <p className="menu_new_name">Kitchen Station</p>
                        <Form.Item
                            name="kitchen_station"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select an kitchen station',
                                },
                            ]}
                        >
                            <Select
                                className="custom-select"
                                style={{ border: 'none', boxShadow: 'none' }}
                                placeholder="Select kitchen station"
                            >
                                {stations?.map?.((m: any) => (
                                    <Option key={m?.id} value={m?.id}>
                                        {m?.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </Form>

                <PopupAction
                    title="Delete this Item?"
                    content={'Once deleted it, cannot be undone'}
                    onConfirm={deleteProduct}
                    onCancel={() => {}}
                    ref={refPopupDelete}
                />
                <PopupAction
                    title="Cancel editing?"
                    content={"Your changes won't be saved"}
                    onConfirm={() => {
                        history(BASE_ROUTER.ITEM_PAGE);
                    }}
                    onCancel={() => {}}
                    ref={refPopupEdit}
                    titleActionLeft="Keep editing"
                    titleActionRight="Confirm cancel"
                />
            </div>
        </div>
    );
};

export default Index;

function formatPrice(value: string | number) {
    if (typeof value === 'number') return value;
    return +value?.slice(1).replaceAll(',', '');
}
