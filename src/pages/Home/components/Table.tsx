import { useMediaQuery } from 'react-responsive';
import {
    StyledTable,
    StyledTableName,
    StyledTableSize,
    StyledTableStatus,
    StyledLine,
    CountAvaiable,
} from '../styled';

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

const getColorByStatus = (item: IItem) => {
    const status = getStatusTableByCardIds(item);
    let color = '#ffffff';
    switch (status) {
        case TableStatus.Avaiable:
            color = '#34A853';
            break;
        case TableStatus.Dining:
            color = '#FFB133';
            break;
        case TableStatus.Reserved:
            color = '#4285F4';
            break;
        case TableStatus.Unavaiable:
            color = '#EA4335';
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
    return (
        <StyledTable
            background={
                status == TableStatus.Disabled ||
                status == TableStatus.Unavaiable
                    ? '#0d0d0d'
                    : '#333333'
            }
            opacity={status == TableStatus.Disabled ? 0.3 : 1}
            onClick={onClick}
            ismobile={ismobile}
        >
            <StyledTableName textColor={getColorByStatus(item)}>
                {item.name}
            </StyledTableName>
            <StyledTableSize>
                {`${item.numberOfCustomer || 0}/${item.size}`}
            </StyledTableSize>
            <StyledTableStatus>{getStatusName(status)}</StyledTableStatus>

            {item.cartIds.length > 0 && (
                <CountAvaiable>
                    <div>{item.cartIds.length}</div>
                </CountAvaiable>
            )}
            <StyledLine background={getColorByStatus(item)} />
        </StyledTable>
    );
};

export default Table;
