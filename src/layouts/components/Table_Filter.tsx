import { Popover, Row } from 'antd';
import FilterIcon from 'assets/icons_v2/FilterIcon';
import CheckBoxOption from 'components/CheckBoxOption';
import { useTheme } from 'context/themeContext';
import { updateMerchantFilterTable } from 'features/global/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const TableFilter = () => {
    const { theme } = useTheme();
    const { merchantFilterTable } = useSelector(
        (state: RootState) => state.global,
    );
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
                    isChecked={merchantFilterTable?.isAvailable}
                    name="Available"
                    onChange={(value: boolean) => {
                        dispatch(
                            updateMerchantFilterTable({
                                merchantFilterTable: {
                                    ...merchantFilterTable,
                                    isAvailable: value,
                                },
                            }),
                        );
                    }}
                />
            </Row>
            <Row style={{ alignItems: 'center', gap: 12 }}>
                <CheckBoxOption
                    isChecked={merchantFilterTable?.isDinning}
                    name="Dinning"
                    onChange={(value) => {
                        dispatch(
                            updateMerchantFilterTable({
                                merchantFilterTable: {
                                    ...merchantFilterTable,
                                    isDinning: value,
                                },
                            }),
                        );
                    }}
                />
            </Row>
            <Row style={{ alignItems: 'center', gap: 12 }}>
                <CheckBoxOption
                    isChecked={merchantFilterTable?.isReserve}
                    name="Reserved"
                    onChange={(value) => {
                        dispatch(
                            updateMerchantFilterTable({
                                merchantFilterTable: {
                                    ...merchantFilterTable,
                                    isReserve: value,
                                },
                            }),
                        );
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

export default TableFilter;
