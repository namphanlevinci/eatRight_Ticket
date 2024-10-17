import { useQuery } from '@apollo/client';
import { GET_CAGORYLIST } from 'graphql/category/category';
import { useEffect, useState } from 'react';

export type ItemType = {
    uid: string;
    level: number;
    name: string;
    path: string;
    children_count: string;
    children?: ItemType[];
    products: {
        items: ProductType[];
    };
};
export type ProductType = {
    __typename: string;
    id: number;
    name: string;
    sku: string;
    url_key: string;
    open_price: boolean | number;
    price: {
        regularPrice: {
            amount: {
                value: number;
                currency: string;
            };
        };
    };
    display_platforms: string[];
    small_image?: {
        url: string;
        label: string;
    };
};
export const useCategory = () => {
    const { data, loading } = useQuery(GET_CAGORYLIST, {
        variables: {
            pageSize: 100,
            currentPage: 1,
        },
        fetchPolicy: 'cache-and-network',
    });
    const [category, setCategory] = useState([]);
    useEffect(() => {
        if (data?.categories?.items[0]?.children) {
            localStorage.setItem(
                'category',
                JSON.stringify(data?.categories?.items[0]?.children),
            );
            setCategory(data?.categories?.items[0]?.children);
        } else {
            const categoryString = localStorage.getItem('category');
            if (categoryString) {
                setCategory(JSON.parse(categoryString));
            }
        }
    }, [data]);
    return { data: category, loading };
};
