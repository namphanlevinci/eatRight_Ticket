export const CartData = {
    items: [
        {
            uid: 'NjU5',
            id: '659',
            prices: {
                total_item_discount: {
                    value: 18200,
                    __typename: 'Money',
                },
                price: {
                    value: 91000,
                    __typename: 'Money',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 18200,
                            __typename: 'Money',
                        },
                        __typename: 'Discount',
                    },
                ],
                __typename: 'CartItemPrices',
            },
            product: {
                name: 'Combo 5 miếng gà',
                sku: 'five-pcs',
                small_image: {
                    url: 'https://fnb.uat.test88.info/media/catalog/product/cache/8f2845148f4df4a54ff55952d98e98e9/e/e/ee8e7512368728-6mingggin_1.png',
                    label: 'Combo 5 miếng gà',
                    __typename: 'ProductImage',
                },
                __typename: 'BundleProduct',
            },
            quantity: 1,
            bundle_options: [
                {
                    id: 38,
                    label: 'Main',
                    type: 'checkbox',
                    values: [
                        {
                            id: 151,
                            label: 'Gà Cay',
                            price: 0,
                            quantity: 5,
                            __typename: 'SelectedBundleOptionValue',
                        },
                    ],
                    __typename: 'SelectedBundleOption',
                },
                {
                    id: 39,
                    label: 'Change Fried Fries',
                    type: 'radio',
                    values: [
                        {
                            id: 322,
                            label: 'Khoai Tây Chiên-Large',
                            price: 0,
                            quantity: 1,
                            __typename: 'SelectedBundleOptionValue',
                        },
                    ],
                    __typename: 'SelectedBundleOption',
                },
            ],
            __typename: 'BundleCartItem',
        },
        {
            uid: 'ODIx',
            id: '821',
            prices: {
                total_item_discount: {
                    value: 8000,
                    __typename: 'Money',
                },
                price: {
                    value: 40000,
                    __typename: 'Money',
                },
                discounts: [
                    {
                        label: 'Discount',
                        amount: {
                            value: 8000,
                            __typename: 'Money',
                        },
                        __typename: 'Discount',
                    },
                ],
                __typename: 'CartItemPrices',
            },
            product: {
                name: 'Gà Phô Mai',
                sku: 'Gà Phô Mai',
                small_image: {
                    url: 'https://fnb.uat.test88.info/media/catalog/product/cache/8f2845148f4df4a54ff55952d98e98e9/d/1/d1834d87116836-2mingggin_1_2.png',
                    label: 'Gà Phô Mai',
                    __typename: 'ProductImage',
                },
                __typename: 'SimpleProduct',
            },
            quantity: 1,
            __typename: 'SimpleCartItem',
        },
    ],
    applied_coupons: null,
    prices: {
        discounts: [
            {
                amount: {
                    value: 26200,
                    __typename: 'Money',
                },
                label: 'Discount',
                __typename: 'Discount',
            },
        ],
        grand_total: {
            value: 104800,
            __typename: 'Money',
        },
        __typename: 'CartPrices',
    },
    __typename: 'Cart',
};
