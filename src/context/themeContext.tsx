import React, { createContext, useState, useContext, ReactNode } from 'react';

export const themeMode = {
    lightTheme: {
        semanticPositive: '#198754',
        semanticWarning: '#ffc107',
        semanticCritcal: '#dc3545',
        semanticInfo: '#4285f4',
        semanticInfoLight: '#0dcaf0',
        fieldBackground: '#eaecf0',
        formBackground: '#ffffff',
        fieldTextIcon: '#333741',
        itemCardBackground: '#f9f9f9',
        itemCardText: '#1e1e1e',
        tabBGContainer: '#f9f9f9',
        pRIMARY1: '#e6f5ff',
        pRIMARY2: '#a0cff2',
        pRIMARY3: '#73b0e6',
        pRIMARY4: '#4a91d9',
        pRIMARY5: '#2573cc',
        pRIMARY6Primary: '#0455bf',
        pRIMARY7: '#003d99',
        pRIMARY8: '#002a73',
        pRIMARY9: '#00194d',
        pRIMARY10: '#000b26',
        tEXTPrimary: '#1d2433',
        tEXTSecondary: '#4a505c',
        tEXTDisabled: '#6c707a',
        nEUTRALPrimary: '#ffffff',
        nEUTRALBase: '#f8f9fc',
        nEUTRALSecBG: '#f1f3f9',
        nEUTRALLine: '#e1e6ef',
        tERTIARY1BG: '#f8f5ff',
        tERTIARY2Default: '#8a54f7',
        tERTIARY3Hover: '#6d35de',
        tERTIARY4Pressed: '#5221b5',
        sUCCESS1BG: '#edfdf8',
        sUCCESS2Default: '#08875d',
        sUCCESS3Hover: '#03724d',
        sUCCESS4Pressed: '#066042',
        wARNING1BG: '#fff8eb',
        wARNING2Default: '#b25e09',
        wARNING3Hover: '#96530f',
        wARNING4Pressed: '#7f460d',
        eRROR1BG: '#fef1f2',
        eRROR2Default: '#e02d3c',
        eRROR3Hover: '#ba2532',
        eRROR4Pressed: '#981b25',
        sECONDARY1Light: '#fffcea',
        sECONDARY2Default: '#ff9d00',
        sECONDARY3Hover: '#e27500',
        sECONDARY4Pressed: '#983d08',
    },
    darkTheme: {
        semanticPositive: '#146c43',
        semanticWarning: '#cc9a05',
        semanticCritcal: '#b02a37',
        semanticInfo: '#346ac3',
        semanticInfoLight: '#0aa1c0',
        fieldBackground: '#161b26',
        formBackground: '#1f242f',
        fieldTextIcon: '#f5f5f6',
        itemCardBackground: '#0c111d',
        itemCardText: '#fefefe',
        tabBGContainer: '#182230',
        pRIMARY1: '#2b323d',
        pRIMARY2: '#26364d',
        pRIMARY3: '#253d5d',
        pRIMARY4: '#1e4272',
        pRIMARY5: '#14498e',
        pRIMARY6Primary: '#0b50aa',
        pRIMARY7: '#266dbd',
        pRIMARY8: '#498cd1',
        pRIMARY9: '#71ace1',
        pRIMARY10: '#9eccee',
        tEXTPrimary: '#ffffff',
        tEXTSecondary: '#c2c2c4',
        tEXTDisabled: '#9d9ea1',
        nEUTRALPrimary: '#1b1f27',
        nEUTRALBase: '#0a0d14',
        nEUTRALSecBG: '#23272f',
        nEUTRALLine: '#3f444d',
        tERTIARY1BG: '#03010a',
        tERTIARY2Default: '#4110a2',
        tERTIARY3Hover: '#5c29c2',
        tERTIARY4Pressed: '#7e51d6',
        sUCCESS1BG: '#03120d',
        sUCCESS2Default: '#7ef1cb',
        sUCCESS3Hover: '#92f6d5',
        sUCCESS4Pressed: '#a4f4d9',
        wARNING1BG: '#130d01',
        wARNING2Default: '#eda154',
        wARNING3Hover: '#eaad71',
        wARNING4Pressed: '#ecba88',
        eRROR1BG: '#0e0203',
        eRROR2Default: '#c82835',
        eRROR3Hover: '#d24b57',
        eRROR4Pressed: '#de6e77',
        sECONDARY1Light: '#131101',
        sECONDARY2Default: '#f29a0d',
        sECONDARY3Hover: '#f4922a',
        sECONDARY4Pressed: '#f09f70',
    },
};

interface ThemeContextProps {
    theme: typeof themeMode.lightTheme;
    toggleTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: themeMode.lightTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(themeMode.lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === themeMode.lightTheme
                ? themeMode.darkTheme
                : themeMode.lightTheme,
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
