import React from 'react';
import ReactPaginate from 'react-paginate';
import { Select } from 'antd';
import './index.css';

interface IProps {
    count: number;
    pageCount: number;
    page: number;
    rowPerPage: number;
    onPageChange: (page: number) => void;
    onRowPerPageChange: (value: number) => void;
    showRowPerPage?: boolean;
}

const Pagination: React.FC<IProps> = ({
    count,
    pageCount,
    page,
    rowPerPage,
    onPageChange,
    onRowPerPageChange,
    showRowPerPage = true,
}) => {
    const handlePageChange = (page: number) => {
        onPageChange(page + 1);
    };

    const getTotalTitle = (count: number, page: number, rowPerPage: number) => {
        const start = page * rowPerPage + 1;

        const end = (page + 1) * rowPerPage;

        if (start > end || count === 0 || start > count) {
            return '';
        }

        if (count < end) {
            return `${start} - ${count} of ${count} items`;
        }
        return `${start} - ${end} of ${count} items`;
    };

    const handleRowPerPageChange = (value: number) => {
        onRowPerPageChange(value);
    };

    if (count === 0) {
        return null;
    }

    return (
        <div className="paginate">
            <div>
                {showRowPerPage && (
                    <>
                        <Select
                            onChange={(value) => handleRowPerPageChange(value)}
                            value={rowPerPage}
                            size="middle"
                            style={{
                                height: 40,
                            }}
                        >
                            <Select.Option value={10}>10 / page</Select.Option>
                            <Select.Option value={20}>20 / page</Select.Option>
                            <Select.Option value={30}>30 / page</Select.Option>
                            <Select.Option value={40}>40 / page</Select.Option>
                        </Select>
                        <p>{getTotalTitle(count, page, rowPerPage)}</p>
                    </>
                )}
            </div>
            <ReactPaginate
                previousClassName="previous-item"
                previousLabel={
                    <i
                        style={{ fontSize: 12, padding: '0 4px' }}
                        className="las la-angle-left"
                    />
                }
                nextClassName="next-item"
                nextLabel={
                    <i
                        style={{ fontSize: 12, padding: '0 4px' }}
                        className="las la-angle-right"
                    />
                }
                pageCount={pageCount}
                forcePage={page}
                onPageChange={({ selected }) => {
                    handlePageChange(selected);
                }}
                pageClassName="pagination-item"
                containerClassName={'container'}
                activeClassName={'active_link'}
            />
        </div>
    );
};

export default Pagination;
