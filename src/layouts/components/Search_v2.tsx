import SearchIcon from 'assets/icons_v2/SearchIcon';
import { useTheme } from 'context/themeContext';
import { updateSearchOrder } from 'features/global/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const SearchV2 = () => {
    const { theme } = useTheme();
    const { searchTextOrder } = useSelector((state: RootState) => state.global);
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
                    width: 150
                }}
                placeholder="Order number..."
                value={searchTextOrder}
                onChange={(e) => {
                    dispatch(
                        updateSearchOrder({
                            searchTextOrder: e.target.value,
                        }),
                    );
                }}
            />
            <SearchIcon />
        </div>
    );
};

export default SearchV2;
