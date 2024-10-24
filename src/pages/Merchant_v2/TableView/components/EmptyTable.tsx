import { useTheme } from 'context/themeContext';
import { StyledEmtyTable } from '../styled';
import { useMediaQuery } from 'react-responsive';

const EmptyTable = () => {
    const { theme } = useTheme();
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <StyledEmtyTable
            style={{
                width: ismobile ? '45%' : '21%',
                backgroundColor: theme.pRIMARY10,
            }}
        />
    );
};

export default EmptyTable;
