import { useTheme } from 'context/themeContext';
import { StyledEmtyTable } from '../styled';

const EmptyTable = () => {
    const { theme } = useTheme();
    return <StyledEmtyTable style={{ backgroundColor: theme.pRIMARY10 }} />;
};

export default EmptyTable;
