import CalenderIcon from 'assets/icons/CalendarIcon';
import { useTheme } from 'context/themeContext';
import { Colors } from 'themes/colors';

interface IProps {
    count: number;
    onClick: () => void;
}

const WaitingListButton = ({ count, onClick }: IProps) => {
    const { theme } = useTheme();
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: `${Colors.teal}`,
                padding: '12px 16px',
                height: 'fit-content',
                borderRadius: 6,
            }}
            onClick={onClick}
        >
            <CalenderIcon />
            <p
                style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: 'white',
                }}
            >
                Waiting List
            </p>
            <span
                style={{
                    border: '2px solid white',
                    fontWeight: 700,
                    color: 'white',
                    backgroundColor: `${theme.eRROR2Default}`,
                    padding: 4,
                    borderRadius: '99px',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {count}
            </span>
        </div>
    );
};

export default WaitingListButton;
