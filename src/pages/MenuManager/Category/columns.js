export const columnsCategory = [
    {
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
        render: (id) => {
            return (
                <div style={{ color: 'var(--text-primary)', fontSize: 16 }}>
                    {id}
                </div>
            );
        },
        sorter: true,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: (name) => {
            return (
                <div
                    style={{
                        color: 'var(--primary-6)',
                        fontWeight: '600',
                        fontSize: 17,
                    }}
                >
                    {name}
                </div>
            );
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description) => {
            return (
                <div
                    style={{
                        color: '#333',
                        fontSize: 17,
                    }}
                >
                    {description}
                </div>
            );
        },
    },
    {
        title: 'Items',
        dataIndex: 'product_count',
        key: 'product_count',
        sorter: true,
        render: (product_count) => {
            return (
                <div
                    style={{
                        color: '#333',
                        fontSize: 17,
                    }}
                >
                    {product_count}
                </div>
            );
        },
    },
    {
        title: 'Status',
        dataIndex: 'is_active',
        key: 'is_active',
        sorter: true,
        render: (is_active) => {
            if (is_active == true) {
                return (
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <div
                            style={{
                                background: 'var(--primary-6)',
                                fontWeight: '600',
                                fontSize: 17,
                                height: 44,
                                width: 100,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 300,
                            }}
                        >
                            Active
                        </div>
                    </div>
                );
            }
            return (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                        style={{
                            background: 'var(--field-background)',
                            fontWeight: '400',
                            fontSize: 17,
                            height: 44,
                            width: 100,
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 300,
                        }}
                    >
                        In Active
                    </div>
                </div>
            );
        },
    },
];
