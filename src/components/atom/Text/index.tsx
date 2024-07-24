import { useTheme } from 'context/themeContext';
import styled from 'styled-components';

const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;

export const TextDefault = styled.p`
    font-family: 'Montserrat';
    color: ${getTextColor};
    font-size: 16px;
    font-weight: 400;
`;

export const Text18Default = styled.p`
    font-family: 'Montserrat';
    color: ${getTextColor};
    font-size: 18px;
    font-weight: 600;
`;

export const Text20Default = styled.p`
    font-family: 'Montserrat';
    color: ${getTextColor};
    font-size: 20px;
    font-weight: 600;
`;

export const Text24Default = styled.p`
    font-family: 'Montserrat';
    color: ${getTextColor};
    font-size: 24px;
    font-weight: 600;
`;

export const TextDarkDefault = styled.p`
    font-family: 'Montserrat';
    color: ${getTextColor};
    font-size: 16px;
    font-weight: 400;
`;

export const TextBoldDefault = styled.p`
    font-family: 'Montserrat';
    color: ${getTextColor};
    font-size: 16px;
    font-weight: 600;
`;

export const Text = ({
    children,
    style,
    ...props
}: {
    children: React.ReactNode;
    style?: React.CSSProperties;
} & any) => {
    const { theme } = useTheme();

    return (
        <TextDefault theme={theme} style={style} {...props}>
            {children}
        </TextDefault>
    );
};

export const Text18 = ({ children, style }: any) => {
    const { theme } = useTheme();

    return (
        <Text18Default theme={theme} style={style}>
            {children}
        </Text18Default>
    );
};

export const Text20 = ({ children, style }: any) => {
    const { theme } = useTheme();

    return (
        <Text20Default theme={theme} style={style}>
            {children}
        </Text20Default>
    );
};

export const Text24 = ({ children, style }: any) => {
    const { theme } = useTheme();

    return (
        <Text24Default theme={theme} style={style}>
            {children}
        </Text24Default>
    );
};

export const TextDark = ({ children, style }: any) => {
    const { theme } = useTheme();

    return (
        <TextDarkDefault theme={theme} style={style}>
            {children}
        </TextDarkDefault>
    );
};

export const TextBold = ({ children, style }: any) => {
    const { theme } = useTheme();

    return (
        <TextBoldDefault theme={theme} style={style}>
            {children}
        </TextBoldDefault>
    );
};
