import React from 'react';
import icon_plus from 'pages/Merchant_v2/OrderList/assets/icon/icon_plus.svg';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { AlertContext } from 'context/alertContext';
import { useContext } from 'react';
import { columnsCategory } from './columns';
import MenuBar from '../Components/MenuBar';
import CustomButton from '../Components/CustomButton';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORY_LIST } from 'graphql/category';
import { BASE_ROUTER } from 'constants/router';
import SearchInput from 'components/SearchInput';

const Index = () => {
    const history = useNavigate();
    const [categoryList, setCategoryList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [totalPage, setTotalPage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const { openModal } = useContext(AlertContext);
    const [apiGetCategory] = useLazyQuery(GET_CATEGORY_LIST);
    const windowHeight = window.innerHeight;

    const handleTableChange = (
        pagination: any,
        filters?: any,
        sorter?: any,
    ) => {
        const { field, order } = sorter;
        setCurrentPage(pagination.current);
        getCategory({
            search,
            page: pagination.current,
            field: getFieldFormatedBySort(field),
            position: order == 'descend' ? 'DESC' : 'ASC',
        });
    };

    const getCategory = ({ search, page, field, position }: any) => {
        setLoading(true);
        apiGetCategory({
            variables: {
                search,
                currentPage: page,
                pageSize: 10,
                field: field ?? 'id',
                position: position ?? 'ASC',
            },
            fetchPolicy: 'cache-and-network',
        })
            .then((res) => {
                setCategoryList(res?.data?.merchantCategories?.items ?? []);
                setTotalPage(
                    res?.data?.merchantCategories?.page_info?.total_pages,
                );
                setLoading(false);
            })
            .catch((err) => {
                openModal(err.message);
            });
    };
    const searchData = () => {
        getCategory({ search, page: 1 });
        setCurrentPage(1);
    };
    const delayedSearchData = debounce(() => searchData(), 350);

    React.useEffect(() => {
        delayedSearchData();
    }, [search]);

    return (
        <div style={{ padding: 16 }}>
            <div className="container-box body_history">
                <MenuBar />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 24,
                        marginBottom: 24,
                    }}
                >
                    <SearchInput
                        value={search}
                        onChange={(e) => setSearch(e?.target?.value)}
                        placeholder="Category name ..."
                    />
                    <CustomButton
                        style={{ marginLeft: 16 }}
                        leftIcon={icon_plus}
                        title="New category"
                        onClick={() => history(BASE_ROUTER.CATEGORY_PAGE_NEW)}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Table
                        loading={isLoading}
                        rowKey="order_number"
                        columns={columnsCategory}
                        dataSource={categoryList}
                        className="table-menu"
                        onRow={(record: any) => ({
                            onClick: () => {
                                history(
                                    `/menuManager/edit_category/${record?.id}`,
                                );
                            },
                        })}
                        scroll={{ y: windowHeight - 300 }}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,
                            total: totalPage * 10,
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

const getFieldFormatedBySort = (field: string) => {
    if (field === 'id') {
        return 'entity_id';
    }
    return field;
};
