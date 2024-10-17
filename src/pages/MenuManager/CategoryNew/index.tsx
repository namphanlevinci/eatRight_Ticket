/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useRef, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Switch,
    Checkbox,
    Spin,
    Select,
    Tooltip,
} from 'antd';
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertContext } from 'context/alertContext';
import { useContext } from 'react';
import PopupAction from '../Components/PopupAction';
import '../index.scss';
import Header from 'pages/Merchant/Header';
import MenuBar from '../Components/MenuBar';
import CustomButton from '../Components/CustomButton';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORY_DETAIL,
    UPDATE_CATEGORY,
} from 'graphql/category/CRUD';
import { GET_MENU_LIST } from 'graphql/menu';
import { GET_LIST_KITCHEN_STATION } from 'containers/Kitchen/printer';
import { BASE_ROUTER } from 'constants/router';
import ModalConfirm from 'components/modal/ModalConfirm';
import QuestionIcon from 'assets/icons/questionIcon';

interface ICategory {
    name: string;
    description: string;
    is_active: string;
    menu_ids: string[];
    kitchen_station: string;
}

const Index = () => {
    const [apiMerchantCreateCategory] = useMutation(CREATE_CATEGORY);
    const [apiMerchantUpdateCategory] = useMutation(UPDATE_CATEGORY);
    const [apiMerchantDeleteCategory] = useMutation(DELETE_CATEGORY);
    const [apiGetCategoryDetail] = useLazyQuery(GET_CATEGORY_DETAIL);
    const [apiGetMenu] = useLazyQuery(GET_MENU_LIST);
    const [apiGetKitchenStation] = useLazyQuery(GET_LIST_KITCHEN_STATION);
    const [isToggled, setIsToggled] = useState(true);
    const [openPriceToggle, setOpenPriceToggle] = useState(false);
    const [data, setData] = useState<ICategory>();
    const [menuList, setMenuList] = useState<any>([]);
    const [isLoading, setLoading] = useState(false);
    const history = useNavigate();
    const { id: categoryId } = useParams();
    const [form] = Form.useForm();
    const { openModal } = useContext(AlertContext);
    const [stations, setStations] = useState([]);
    const [showModalChangeStation, setShowModalChangeStation] = useState(false);

    const location = useLocation();
    const pathname = location?.pathname;
    const refPopupDelete = useRef<any>();
    const refPopupEdit = useRef<any>();

    const handleConfirmChaneStation = () => {
        const values = form.getFieldsValue();
        const payload = {
            ...values,
            is_active: isToggled ? true : false,
        };
        if (categoryId) {
            apiMerchantUpdateCategory({
                variables: {
                    ...payload,
                    id: parseInt(categoryId),
                },
            }).then((res) => {
                setLoading(false);
                if (res?.errors && res?.errors?.length > 0) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.CATEGORY_PAGE);
            });
        }
    };

    const handleToggle = (checked: any) => {
        setIsToggled(checked);
    };

    const onFinish = (values: any) => {
        if (
            data?.kitchen_station.toString() !== values?.kitchen_station &&
            categoryId
        ) {
            setShowModalChangeStation(true);
            return;
        }
        const payload = {
            ...values,
            is_active: isToggled ? true : false,
            open_price: openPriceToggle ? true : false,
        };

        setLoading(true);
        if (categoryId) {
            apiMerchantUpdateCategory({
                variables: {
                    ...payload,
                    id: parseInt(categoryId),
                },
            }).then((res) => {
                setLoading(false);
                if (res?.errors && res?.errors?.length > 0) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.CATEGORY_PAGE);
            });
        } else {
            apiMerchantCreateCategory({ variables: payload }).then((res) => {
                setLoading(false);
                if (res?.errors && res?.errors?.length > 0) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.CATEGORY_PAGE);
            });
        }
    };
    const deleteCategory = () => {
        setLoading(true);
        apiMerchantDeleteCategory({ variables: { id: categoryId } }).then(
            (res) => {
                setLoading(false);
                if (res?.errors && res?.errors?.length > 0) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.CATEGORY_PAGE);
            },
        );
    };

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            apiGetCategoryDetail({ variables: { id: parseInt(categoryId) } })
                .then((res) => {
                    const detail = res?.data?.merchantCategory;
                    form.setFieldsValue({
                        name: detail?.name,
                        description: detail?.description,
                        is_active: detail?.is_active,
                        menu_ids: detail?.menus?.map?.(
                            (m: any) => m?.entity_id,
                        ),
                        kitchen_station: `${detail?.kitchen_station ?? ''}`,
                    });

                    setOpenPriceToggle(detail?.open_price ?? false);
                    setIsToggled(detail?.is_active);
                    setData(detail);
                    setLoading(false);
                })
                .catch((err) => {
                    openModal(err.message);
                });
        }
    }, [categoryId, menuList]);
    const getKitchenStation = () => {
        apiGetKitchenStation()
            .then((res) => {
                setStations(res?.data?.getKitchenStations ?? []);
            })
            .catch((err) => {
                openModal(err.message);
            });
    };

    useEffect(() => {
        getKitchenStation();
        apiGetMenu({
            variables: {
                search: '',
                currentPage: 1,
                field: 'entity_id',
                position: 'DESC',
                pageSize: 30,
            },
        })
            .then((res) => {
                setLoading(false);

                setMenuList(res?.data?.merchantMenus?.items ?? []);
            })
            .catch((err) => {
                openModal(err.message);
            });
    }, []);
    const { Option } = Select;

    return (
        <div style={{ padding: 16 }}>
            {showModalChangeStation && (
                <ModalConfirmChangeStation
                    isModalConfirm={showModalChangeStation}
                    onCancel={() => setShowModalChangeStation(false)}
                    onSubmit={handleConfirmChaneStation}
                />
            )}
            {isLoading && (
                <div className="loading_container">
                    <Spin />
                </div>
            )}
            <Header />
            <div className="container-box body_history">
                <MenuBar />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        status: isToggled,
                    }}
                >
                    {pathname?.includes?.('edit_category') ? (
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
                                    background: 'var(--error-1-bg)',
                                    color: 'var(--error-2-default)',
                                }}
                                title="Delete"
                                onClick={() =>
                                    refPopupDelete.current?.showModal?.()
                                }
                            />
                            <CustomButton
                                style={{
                                    background: 'var(--neutral-base)',
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
                                    borderRadius: 8,
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
                                    background: 'var(--error-1-bg)',
                                    color: 'var(--error-2-default)',
                                }}
                                title="Cancel"
                                onClick={() =>
                                    history(BASE_ROUTER.CATEGORY_PAGE)
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
                    )}
                    <div className="menu_new">
                        <p className="menu_new_name">Name</p>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the menu name',
                                },
                            ]}
                        >
                            <Input placeholder="Category name..." />
                        </Form.Item>

                        <p className="menu_new_name">Status</p>
                        <Form.Item
                            className="custom-form-item"
                            name="is_active"
                            valuePropName="checked"
                            style={{ background: 'transparent' }}
                        >
                            <Switch
                                value={isToggled}
                                onChange={handleToggle}
                                style={{
                                    backgroundColor: isToggled
                                        ? 'var(--primary-6)'
                                        : '#d9d9d9',
                                }}
                                size="default"
                            />
                        </Form.Item>

                        <p className="menu_new_name">Description (optional)</p>
                        <Form.Item name="description">
                            <Input placeholder="Description of category..." />
                        </Form.Item>

                        <p className="menu_new_name">Menu</p>
                        <Form.Item
                            className="custom-form-item"
                            name="menu_ids"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select at least 1 option',
                                },
                            ]}
                        >
                            <Checkbox.Group>
                                {menuList?.map?.(
                                    (menu: any) =>
                                        menu?.is_active && (
                                            <Checkbox
                                                className="custom-checkbox"
                                                key={menu?.entity_id}
                                                value={menu?.entity_id}
                                            >
                                                {menu?.name}
                                            </Checkbox>
                                        ),
                                )}
                            </Checkbox.Group>
                        </Form.Item>
                        <p className="menu_new_name">
                            Open Price{' '}
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
                        </p>
                        <Form.Item
                            className="custom-form-item"
                            name="open_price"
                            valuePropName="checked"
                            style={{ background: 'transparent' }}
                        >
                            <Switch
                                value={openPriceToggle}
                                onChange={(value) => {
                                    setOpenPriceToggle(value);
                                }}
                                style={{
                                    backgroundColor: openPriceToggle
                                        ? 'var(--primary-6)'
                                        : '#d9d9d9',
                                }}
                                size="default"
                            />
                        </Form.Item>

                        <p className="menu_new_name">Kitchen Station</p>
                        <Form.Item
                            name="kitchen_station"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please select an kitchen station',
                                },
                            ]}
                        >
                            <Select
                                className="custom-select"
                                style={{ border: 'none', boxShadow: 'none' }}
                                placeholder="Select kitchen station..."
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
                    title="Delete this category?"
                    content={'Once deleted, it cannot be undone'}
                    onConfirm={deleteCategory}
                    onCancel={() => {}}
                    ref={refPopupDelete}
                />
                <PopupAction
                    title="Cancel editing?"
                    content={"Your changes won't be saved"}
                    onConfirm={() => {
                        history(BASE_ROUTER.CATEGORY_PAGE);
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

interface IModal {
    isModalConfirm: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

const ModalConfirmChangeStation = ({
    isModalConfirm,
    onCancel,
    onSubmit,
}: IModal) => {
    return (
        <ModalConfirm
            isModalOpen={isModalConfirm}
            onCancel={onCancel}
            onSubmit={onSubmit}
            title="Change Station"
            content={`This action will update the station for all inherrited menu
                    items within this group Are you sure you want to proceed?`}
        />
    );
};
