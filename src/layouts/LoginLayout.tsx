import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Colors } from 'themes/colors';
type Props = {
    children: React.ReactNode;
};
export default function LoginLayout(props: Props) {
    const { children } = props;
    const { theme } = useTheme();
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: theme.nEUTRALPrimary,
            }}
        >
            <div style={{ flexGrow: 1 }} />
            {children}
            <div
                style={{
                    flexGrow: 1,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%',
                            padding: 24,
                        }}
                    >
                        <Text style={{ textAlign: 'center' }}>
                            Having troubles? {ismobile && <br />}
                            <Link to={'https://levinci.group/contact-us/'}>
                                <span
                                    style={{
                                        fontSize: 18,
                                        color: theme.pRIMARY6Primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    Contact Levinci Support
                                </span>
                            </Link>
                        </Text>
                        <div>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    marginTop: 10,
                                }}
                            >
                                By continuing, you confirm that you agreed with
                                our{' '}
                            </Text>
                            <Link to="https://levinci.group/">
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 14,
                                        color: theme.pRIMARY6Primary,

                                        fontWeight: 600,
                                    }}
                                >
                                    Terms and Conditions.
                                </Text>
                            </Link>
                        </div>
                        <Text
                            style={{
                                color: Colors.grey5,
                            }}
                        >
                            Version 0.1.1.1
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
