import SearchIcon from 'assets/icons_v2/SearchIcon';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import { updateSearch } from 'features/global/globalSlice';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const SearchV2 = () => {
    const { theme } = useTheme();
    const { searchText } = useSelector((state: RootState) => state.global);
    const isTableView = useMemo(
        () => location.pathname === BASE_ROUTER.MERCHANT_TABLEVIEW,
        [location],
    );
    const dispatch = useDispatch();
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 13px',
                backgroundColor: theme.nEUTRALLine,
                borderRadius: 6,
            }}
        >
            <input
                style={{
                    backgroundColor: theme.nEUTRALLine,
                    height: 40,
                    outline: 'none',
                    width: 150,
                }}
                placeholder={isTableView ? 'Table name...' : 'Order number...'}
                value={isTableView ? searchText?.table : searchText?.order}
                onChange={(e) => {
                    const key = isTableView ? 'table' : 'order';
                    dispatch(
                        updateSearch({
                            searchText: {
                                [key]: e.target.value,
                            },
                        }),
                    );
                }}
            />
            <SearchIcon />
        </div>
    );
};

export default SearchV2;
