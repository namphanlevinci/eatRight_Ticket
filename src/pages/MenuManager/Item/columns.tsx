import { formatMoney } from 'utils/format';
import { ColumnType } from 'antd/es/table'; // Adjust based on your library
import { Image } from 'antd';

export const ColumnsItem: ColumnType<any>[] = [
    // {
    //     title: 'No.',
    //     dataIndex: 'id',
    //     sorter: true,
    //     key: 'id',
    //     render: (id) => (
    //         <div style={{ color: '#1D2433', fontSize: 16 }}>{id}</div>
    //     ),
    //     width: '5%',
    //     align: 'center', // Center align this column if needed
    // },
    {
        title: '',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'center', // Center align the image column
        render: (thumbnail) => (
            <div
                className="thumbnail-column"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Image
                    src={
                        thumbnail?.url ||
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    }
                    style={{ borderRadius: 8 }}
                    onClick={(e) => e.stopPropagation()}
                    className="clickable-image"
                />
            </div>
        ),
        width: 112,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        key: 'name',
        render: (name) => (
            <div
                style={{
                    color: '#389E0D',
                    fontWeight: '600',
                    fontSize: 17,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {name}
            </div>
        ),
        width: '30%',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: true,
        key: 'price',
        render: (price) => (
            <div style={{ color: '#1D2433', fontSize: 16 }}>
                {formatMoney(price?.regularPrice?.amount?.value)}
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Category',
        dataIndex: 'categories',
        key: 'categories',
        render: (categories) => (
            <div style={{ color: '#1D2433', fontSize: 16 }}>
                {categories?.[0]?.name}
            </div>
        ),
        width: '15%',
    },
    {
        title: 'Stock',
        dataIndex: 'stock_status',
        key: 'stock_status',
        render: (stock_status) => (
            <div
                style={{
                    color: stock_status?.includes?.('OUT')
                        ? 'var(--error-2-default)'
                        : 'var(--text-primary)',
                    fontSize: 16,
                }}
            >
                {stock_status?.includes?.('OUT') ? 'Out of stock' : 'In stock'}
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
        render: (qty) => (
            <div style={{ color: 'var(--text-primary)', fontSize: 16 }}>
                {qty}
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: true,
        key: 'status',
        width: '15%',
        render: (status) => (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                    style={{
                        background: status === 1 ? '#389E0D' : '#EAECF0',
                        fontWeight: '600',
                        fontSize: 17,
                        height: 44,
                        width: 100,
                        color: status === 1 ? '#fff' : '#4A505C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 300,
                    }}
                >
                    {status === 1 ? 'Active' : 'Inactive'}
                </div>
            </div>
        ),
    },
];
