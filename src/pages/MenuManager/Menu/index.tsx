import React from 'react';
import icon_plus from '../../Merchant/assets/icon/icon_plus.svg';
import { Table } from 'antd';
import { debounce } from 'lodash';
// import { AlertContext } from 'handlers/alertContext';
import { columnsMenu } from './columns';
import Header from 'pages/Merchant/Header';
import MenuBar from '../Components/MenuBar';
import SearchInput from 'pages/Merchant/Header/SearchInput';
import CustomButton from '../Components/CustomButton';
import { useLazyQuery } from '@apollo/client';
import { GET_MENU_LIST } from 'graphql/menu';
import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';

const Index = () => {
    const navigation = useNavigate();
    const [menuList, setMenuList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [totalPage, setTotalPage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState();
    const [apiGetMenu] = useLazyQuery(GET_MENU_LIST);

    const windowHeight = window.innerHeight;

    const handleTableChange = (
        pagination: any,
        filters?: any,
        sorter?: any,
    ) => {
        const { field, order } = sorter;
        setCurrentPage(pagination.current);
        getMenus({
            search,
            page: pagination.current,
            field,
            position: order == 'descend' ? 'DESC' : 'ASC',
        });
    };

    const getMenus = ({
        search,
        page,
        field,
        position,
    }: {
        search?: string;
        page?: number;
        field?: string;
        position?: string;
    }) => {
        setLoading(true);
        apiGetMenu({
            variables: {
                search: search || '',
                currentPage: page || 1,
                field: field ?? 'entity_id',
                position: position ?? 'ASC',
                pageSize: 10,
            },
            fetchPolicy: 'cache-and-network',
        })
            .then((res) => {
                setMenuList(res?.data?.merchantMenus?.items ?? []);
                setTotalPage(res?.data?.merchantMenus?.page_info?.total_pages);
                setLoading(false);
            })
            .catch((err) => {
                console.log('openModal', err);
            });
    };
    const searchData = () => {
        getMenus({ search, page: 1 });
        setCurrentPage(1);
    };
    const delayedSearchData = debounce(() => searchData(), 350);

    React.useEffect(() => {
        delayedSearchData();
    }, [search]);

    return (
        <div>
            <Header />
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
                        onChange={(e: any) => setSearch(e?.target?.value)}
                        placeholder="Breakfast menu ..."
                    />
                    <CustomButton
                        style={{ marginLeft: 16 }}
                        leftIcon={icon_plus}
                        title="New Menu"
                        onClick={() => navigation(BASE_ROUTER.MENU_PAGE_NEW)}
                        rightIcon={undefined}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Table
                        loading={isLoading}
                        rowKey="order_number"
                        columns={columnsMenu}
                        dataSource={menuList}
                        className="table-menu"
                        rowClassName={'row-table-menu'}
                        onRow={(record: any) => ({
                            onClick: () => {
                                navigation(
                                    `/menuManager/edit_menu/${record?.entity_id}`,
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
