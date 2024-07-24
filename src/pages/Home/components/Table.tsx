import { useMediaQuery } from 'react-responsive';
import {
    StyledTable,
    StyledTableName,
    StyledTableSize,
    StyledTableStatus,
    StyledLine,
    CountAvaiable,
} from '../styled';
import { ColorsThemeType, useTheme } from 'context/themeContext';

interface IItem {
    cartIds: {
        __typename: string;
        cartId: string;
    }[];
    id: number;
    numberOfCustomer: number;
    name: string;
    size: number;
    status: string | number;
    __typename: string;
}

interface ITable {
    item: IItem;
    onClick?: () => void;
}

enum TableStatus {
    Avaiable,
    Dining,
    Reserved,
    Unavaiable,
    Disabled,
}

const getStatusTableByCardIds = (item: IItem) => {
    const tempNumber = item.size - item.numberOfCustomer;
    let status = TableStatus.Disabled;
    if (tempNumber < 0) {
        status = TableStatus.Unavaiable;
    }
    if (item.cartIds.length == 0 && item.size > 0) {
        status = TableStatus.Avaiable;
    }
    if (item.status == '2') {
        status = TableStatus.Reserved;
    }
    if (item.cartIds.length > 0 && tempNumber >= 0) {
        status = TableStatus.Dining;
    }

    return status;
};

const getColorByStatus = (item: IItem, theme: ColorsThemeType) => {
    const status = getStatusTableByCardIds(item);
    let color = '#ffffff';
    switch (status) {
        case TableStatus.Avaiable:
            color = theme.sUCCESS2Default;
            break;
        case TableStatus.Dining:
            color = theme.pRIMARY6Primary;
            break;
        case TableStatus.Reserved:
            color = theme.tERTIARY2Default;
            break;
        case TableStatus.Unavaiable:
            color = theme.eRROR2Default;
            break;
        case TableStatus.Disabled:
            color = 'grey';
            break;
        default:
            break;
    }
    return color;
};

function getStatusName(status: TableStatus): string {
    switch (status) {
        case TableStatus.Avaiable:
            return 'Avaiable';
        case TableStatus.Dining:
            return 'Dining';
        case TableStatus.Reserved:
            return 'Reserved';
        case TableStatus.Unavaiable:
            return 'Unavaiable';
        case TableStatus.Disabled:
            return 'Disabled';
        default:
            return 'Unknown';
    }
}

const Table = ({ item, onClick }: ITable) => {
    const status = getStatusTableByCardIds(item);
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();
    return (
        <StyledTable
            background={
                status == TableStatus.Disabled ||
                status == TableStatus.Unavaiable
                    ? theme.tEXTDisabled
                    : theme.itemCardBackground
            }
            opacity={status == TableStatus.Disabled ? 0.6 : 1}
            onClick={onClick}
            mobileView={ismobile}
        >
            <StyledTableName textColor={getColorByStatus(item, theme)}>
                {item.name}
            </StyledTableName>
            <StyledTableSize style={{ color: theme.tEXTPrimary }}>
                {`${item.numberOfCustomer || 0}/${item.size}`}
            </StyledTableSize>
            <StyledTableStatus style={{ color: theme.tEXTPrimary }}>
                {getStatusName(status)}
            </StyledTableStatus>

            {item.cartIds.length > 0 && (
                <CountAvaiable
                    style={{
                        background: theme.pRIMARY6Primary,
                        color: theme.pRIMARY2,
                    }}
                >
                    <div>{item.cartIds.length}</div>
                </CountAvaiable>
            )}
            <StyledLine background={getColorByStatus(item, theme)} />
        </StyledTable>
    );
};

export default Table;
