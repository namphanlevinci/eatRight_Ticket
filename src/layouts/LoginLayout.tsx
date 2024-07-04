import { Text } from 'components/atom/Text';
import React from 'react';
import { Colors } from 'themes/colors';
type Props = {
    children: React.ReactNode;
};
export default function LoginLayout(props: Props) {
    const { children } = props;
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                flexDirection: 'column',
                background: Colors.black,
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
                        <Text>
                            Having troubles?{' '}
                            <span
                                style={{
                                    fontSize: 18,
                                    color: Colors.primary,
                                    fontWeight: '600',
                                }}
                            >
                                Contact Levinci Support
                            </span>
                        </Text>
                        <div>
                            <Text style={{ textAlign: 'center', fontSize: 14 }}>
                                By continuing, you confirm that you agreed with
                                our{' '}
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: Colors.primary,
                                    marginTop: 10,
                                }}
                            >
                                Terms and Conditions.
                            </Text>
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
