import { createContext, useContext } from 'react';
import { BreadCrumType } from '../Menu/useMenu';
import { ProductType } from '../Menu/useCategory';
import { BundleCartItem } from '../Menu/RenderProduct/type';

interface MenuContextType {
    data?: any; // Thay thế any bằng kiểu dữ liệu thích hợp
    categoryIndex: number;
    breadCrumbs: BreadCrumType[];
    setBreadCrumbs?: React.Dispatch<React.SetStateAction<BreadCrumType[]>>;
    setCategoryIndex?: React.Dispatch<React.SetStateAction<number>>;
    onSetCategoryIndex?: ({
        index,
        item,
    }: {
        index: number;
        item: any;
    }) => void;
    product?: ProductType | undefined;
    setProduct: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
    loading?: boolean;
    setUpdate?: any;
    update?: {
        product: ProductType | undefined;
        options: BundleCartItem[];
    };
    targetRef?: any;
}

export const MenuContext = createContext<MenuContextType | undefined>(
    undefined,
);

export const useMenuContext = (): MenuContextType => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error(
            'useMenuContext must be used within a MenuContext.Provider',
        );
    }
    return context;
};
