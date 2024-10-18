import { Popover, Row } from 'antd';
import FilterIcon from 'assets/icons_v2/FilterIcon';
import CheckBoxOption from 'components/CheckBoxOption';
import { useTheme } from 'context/themeContext';
import { updateFilterOrder } from 'features/global/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const FilterV2 = () => {
    const { theme } = useTheme();
    const { filterOrder } = useSelector((state: RootState) => state.global);
    const dispatch = useDispatch();

    const content = (
        <div style={{ width: 200 }}>
            <Row
                style={{
                    alignItems: 'center',
                    gap: 12,
                }}
            >
                <CheckBoxOption
                    isChecked={filterOrder?.is_dine_in}
                    name="Dine-in"
                    onChange={(value: boolean) => {
                        dispatch(
                            updateFilterOrder({
                                filterOrder: {
                                    ...filterOrder,
                                    is_dine_in: value,
                                },
                            }),
                        );
                        localStorage.setItem('is_dine_in', value.toString());
                    }}
                />
            </Row>
            <Row style={{ alignItems: 'center', gap: 12 }}>
                <CheckBoxOption
                    isChecked={filterOrder?.is_eat_out}
                    name="Eat Out"
                    onChange={(value) => {
                        dispatch(
                            updateFilterOrder({
                                filterOrder: {
                                    ...filterOrder,
                                    is_eat_out: value,
                                },
                            }),
                        );
                        localStorage.setItem('is_eat_out', value.toString());
                    }}
                />
            </Row>
        </div>
    );
    return (
        <>
            <Popover content={content} title="" trigger="click">
                <div
                    style={{
                        borderRadius: 4,
                        border: `1px solid ${theme.nEUTRALLine}`,
                        backgroundColor: theme.nEUTRALLine,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <FilterIcon />
                </div>
            </Popover>
        </>
    );
};

export default FilterV2;
