import { Button } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { Input } from "antd";

export default function ButtonOptions({
    isSelected,
    onClick,
    title,
    selectedPaymentMethod,
    note,
    onChangeNote
}: {
    isSelected: boolean;
    onClick: any;
    title: string;
    selectedPaymentMethod: string,
    note: string,
    onChangeNote: any
}) {
    const { theme } = useTheme();
    return (
        <div style={{
            width: "100%",
            background: theme.nEUTRALBase,
            borderRadius: 8,

        }}>
            <Button
                style={{
                    height: 56,
                    width: '100%',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: "transparent",
                    outline: "none",
                    boxShadow: "none"
                }}
                onClick={onClick}
            >
                <div style={{ width: 30, display: 'flex', alignItems: 'center' }}>
                    {isSelected && <RadioBtnSelected />}
                </div>
                <Text>{title}</Text>
            </Button>
            {
                selectedPaymentMethod == "other" && title == "Other" &&
                <div style={{ width: "100%", paddingBottom: 8, display: "flex", paddingRight: 8}}>
                    <Input
                        placeholder="Note here)"
                        value={note}
                        onChange={onChangeNote}
                        style={{ height: 50, flex: 1, marginLeft: 40 }}
                    />
                </div>
            }
        </div>
    );
}

// <div style={{
//     width: "48%",
//     background: theme.nEUTRALBase,
//     borderRadius: 8,
//     border: `1px solid ${theme.nEUTRALLine}`,
// }}>
//     <Button
//         style={{
//             height: 56,
//             width: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//             border: "none",
//             background: "transparent",
//             outline: "none",
//             boxShadow: "none"
//         }}
//         onClick={onClick}
//     >
//         <div style={{ width: 28, display: 'flex', alignItems: 'center' }}>
//             {icon}
//         </div>
//         <div
//             style={{
//                 flex: 1,
//                 justifyContent: 'flex-start',
//                 display: 'flex',
//                 alignItems: 'center',
//             }}
//         >
//             <Text>{title}</Text>
//         </div>
//         <div style={{ width: 30, display: 'flex', alignItems: 'center' }}>
//             {isSelected && <RadioBtnSelected />}
//         </div>
//     </Button>
//     {
//         selectedPaymentMethod == "other" && title == "Other" &&
//         <div style={{ width: "100%", paddingBottom: 8 }}>
//             <Input
//                 placeholder="Note here)"
//                 value={note}
//                 onChange={onChangeNote}
//                 style={{ height: 50, width: "87%", marginLeft: 40 }}
//             />
//         </div>
//     }
// </div>