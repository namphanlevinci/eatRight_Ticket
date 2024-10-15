import { Fragment } from 'react/jsx-runtime';
import {
    SDuration,
    SSideBar,
    SSubtitle,
    STableContainer,
    STitle,
} from './styled';

interface ITable {
    cartIds: { cartId: string }[];
    hasReadyItem: boolean;
    id: number;
    is_counter: number;
    name: string;
    note: string | null;
    numberOfCustomer: number;
    size: number;
    status: string;
}

interface IProps {
    tables: ITable[];
}

const Tables = ({ tables }: IProps) => {
    console.log(
        tables?.filter((table) => table?.name).sort((a, b) => a.size - b.size),
    );
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '5%',
                rowGap: '5%',
                padding: '0 24px 24px'
            }}
        >
            {tables
                ?.filter((table) => table?.name)
                .sort((a, b) => a.size - b.size)
                ?.map((table, idx) => (
                    <Fragment key={idx}>
                        <Table
                            tableData={table}
                            size={table.size > 6 ? 'large' : 'small'}
                        />
                    </Fragment>
                ))}
        </div>
    );
};

export default Tables;

interface IPropsTable {
    tableData: ITable;
}

const Table = ({
    tableData,
    size,
}: IPropsTable & { size: 'small' | 'large' }) => {
    const sizes: Record<
        string,
        { width: string; maxWidth: string; minWidth: string }
    > = {
        small: {
            width: '20%',
            maxWidth: '200px',
            minWidth: '200px',
        },
        large: {
            width: '30%',
            maxWidth: '320px',
            minWidth: '320px',
        },
    };

    return (
        <STableContainer
            // width={sizes[size].width}
            // maxWidth={sizes[size].maxWidth}
            {...sizes[size]}
        >
            <SSideBar left={true} />
            <SSideBar />
            <STitle>
                {tableData?.name || 'Table name'}
                {size.charAt(0).toUpperCase()}
            </STitle>
            <SSubtitle>Emily Nguyen</SSubtitle>
            <SDuration>00:46</SDuration>
        </STableContainer>
    );
};
