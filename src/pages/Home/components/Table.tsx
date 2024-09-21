import { useMediaQuery } from 'react-responsive';
import {
    StyledTable,
    StyledTableName,
    StyledTableSize,
    StyledTableStatus,
    StyledLine,
    CountAvailable,
    BellNeeded,
} from '../styled';
import { ColorsThemeType, useTheme } from 'context/themeContext';
import bellAlarm from 'assets/alarm_8721062.gif';

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
    isNeedServe?: boolean;
    __typename: string;
}

interface ITable {
    item: IItem;
    onClick?: () => void;
}

enum TableStatus {
    Available,
    Dining,
    Reserved,
    Unavailable,
    Disabled,
}

const getStatusTableByCardIds = (item: IItem) => {
    const tempNumber = item.size - item.numberOfCustomer;
    let status = TableStatus.Disabled;
    if (tempNumber < 0) {
        status = TableStatus.Unavailable;
    }
    if (item.cartIds.length == 0 && item.size > 0) {
        status = TableStatus.Available;
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
    const status = parseInt(`${item.status}`);
    let color = '#ffffff';
    switch (status) {
        case TableStatus.Available:
            color = theme.sUCCESS2Default;
            break;
        case TableStatus.Dining:
            color = theme.pRIMARY6Primary;
            break;
        case TableStatus.Reserved:
            color = theme.tERTIARY2Default;
            break;
        case TableStatus.Unavailable:
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
        case TableStatus.Available:
            return 'Available';
        case TableStatus.Dining:
            return 'Dining';
        case TableStatus.Reserved:
            return 'Reserved';
        case TableStatus.Unavailable:
            return 'Unavailable';
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
                status == TableStatus.Unavailable
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
                <CountAvailable
                    style={{
                        background: theme.pRIMARY6Primary,
                        color: theme.pRIMARY2,
                    }}
                >
                    <div>{item.cartIds.length}</div>
                </CountAvailable>
            )}
            {item.isNeedServe && (
                <BellNeeded>
                    <img src={bellAlarm} style={{ height: 40, width: 40 }} />
                </BellNeeded>
            )}
            <StyledLine background={getColorByStatus(item, theme)} />
        </StyledTable>
    );
};

export default Table;
