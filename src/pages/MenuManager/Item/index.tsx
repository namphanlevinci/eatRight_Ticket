import { useEffect, useState } from 'react';
import icon_plus from '../../Merchant/assets/icon/icon_plus.svg';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { AlertContext } from 'context/alertContext';
import { useContext } from 'react';
import { ColumnsItem } from './columns';
import Header from 'pages/Merchant/Header';
import MenuBar from '../Components/MenuBar';
import SearchInput from 'pages/Merchant/Header/SearchInput';
import CustomButton from '../Components/CustomButton';
import { GET_PRODUCT_LIST } from 'graphql/product';
import { useLazyQuery } from '@apollo/client';
const Index = () => {
    const history = useNavigate();
    const [productList, setMenuList] = useState<any>([]);
    const [isLoading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState<any>({});
    const { openModal } = useContext(AlertContext);
    const [apiGetProduct] = useLazyQuery(GET_PRODUCT_LIST);

    const windowHeight = window.innerHeight;

    const handleTableChange = (
        pagination: any,
        filters?: any,
        sorter?: any,
    ) => {
        const { field, order } = sorter;
        const { current: page, pageSize } = pagination;
        setPageInfo((prev: any) => ({
            ...prev,
            page,
        }));
        const params: any = {
            page,
            pageSize,
        };
        if (field && order) {
            params.position = order == 'descend' ? 'DESC' : 'ASC';
            params.field = field;
        }
        getProducts(params);
    };
    const objectReturn = (field: string, sort: string) => {
        return {
            [field]: sort,
        };
    };
    const getProducts = ({
        search,
        page,
        pageSize,
        field,
        position,
    }: {
        search?: string;
        page?: number;
        pageSize?: number;
        field?: string;
        position?: string;
    }) => {
        setLoading(true);
        apiGetProduct({
            variables: {
                search: search || '',
                currentPage: page || 1,
                pageSize: pageSize || 10,
                sort: objectReturn(field || 'entity_id', position || 'DESC'),
            },
        })
            .then((res) => {
                setMenuList(res?.data?.merchantProducts?.items ?? []);
                setPageInfo({
                    totalPage: res?.data?.merchantProducts?.total_count,
                    pageSize:
                        res?.data?.merchantProducts?.items?.length > 10
                            ? res?.data?.merchantProducts?.items?.length
                            : 10,
                });
                setLoading(false);
            })
            .catch((err) => {
                openModal(err.message);
            });
    };

    const searchData = (textSearch: string) => {
        getProducts({ search: textSearch, page: 1 });
        setPageInfo((prev: any) => ({
            ...prev,
            page: 1,
            textSearch,
        }));
    };

    const onChange = (e: { target: { value: string } }) => {
        searchData(e.target.value);
    };

    const debouncedOnChange = debounce(onChange, 500);

    useEffect(() => {
        getProducts({
            search: '',
            page: 1,
            pageSize: 10,
            // field: "name",
            // position: "ASC",
        });
    }, []);

    return (
        <div style={{ padding: 16 }}>
            <Header />
            <div className="container-box body_history">
                <MenuBar title="Menu Management / Items" />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 24,
                        marginBottom: 24,
                    }}
                >
                    <SearchInput
                        onChange={debouncedOnChange}
                        placeholder="Enter item name..."
                    />
                    <CustomButton
                        style={{ marginLeft: 16 }}
                        leftIcon={icon_plus}
                        title="New Item"
                        onClick={() => history('new_item')}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Table
                        rowKey="order_number"
                        columns={ColumnsItem}
                        dataSource={[...productList]}
                        loading={isLoading}
                        className="table-menu"
                        rowClassName="custom-row"
                        scroll={{ y: windowHeight - 300 }}
                        key="key_Items"
                        pagination={{
                            current: pageInfo?.page,
                            pageSize: pageInfo?.pageSize,
                            total: pageInfo?.totalPage,
                            showSizeChanger: true,
                        }}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Index;
