import { Text } from 'components/atom/Text';
import { TerminalContainer } from '../styled';

export const NewTerminal = ({ onClick }: { onClick: any }) => {
    return (
        <TerminalContainer onClick={onClick}>
            <div
                style={{
                    height: 82,
                    width: 82,
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F0F3F7',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                >
                    <path
                        d="M16.1538 2.15385C16.1538 0.9625 15.1913 0 14 0C12.8087 0 11.8462 0.9625 11.8462 2.15385V11.8462H2.15385C0.9625 11.8462 0 12.8087 0 14C0 15.1913 0.9625 16.1538 2.15385 16.1538H11.8462V25.8462C11.8462 27.0375 12.8087 28 14 28C15.1913 28 16.1538 27.0375 16.1538 25.8462V16.1538H25.8462C27.0375 16.1538 28 15.1913 28 14C28 12.8087 27.0375 11.8462 25.8462 11.8462H16.1538V2.15385Z"
                        fill="#1D2433"
                    />
                </svg>
            </div>
            <Text style={{ fontWeight: '600', fontSize: 20, marginTop: 12 }}>
                Add New
            </Text>
        </TerminalContainer>
    );
};
