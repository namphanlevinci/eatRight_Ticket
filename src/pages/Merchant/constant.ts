export const statusConvert = {
    Complete: 'complete',
    Cooking: 'cooking',
    'Ready to Ship': 'ready_to_ship',
    Canceled: 'canceled',
    Shipping: 'shipping',
    Received: 'received',
    Processing: 'pending',
    Pending: 'pending',
    Sent: 'received',
    done: 'serving',
    processing: 'pending',
    pending: 'pending',
    sent: 'received',
    canceled: 'canceled',
    cooking: 'cooking',
    ready_to_ship: 'ready_to_ship',
    shipping: 'shipping',
    received: 'received',
    ready: 'ready_to_ship',
};

export function getRandomInt(min: number, max: number) {
    /**
     * Generate a random integer within the specified range [min, max].
     *
     * @param {number} min - Minimum value for the generated integer.
     * @param {number} max - Maximum value for the generated integer.
     * @returns {number} - A random integer within the specified range.
     */

    min = Math.ceil(min);
    max = Math.floor(max);

    // Math.random() generates a random number in the range [0, 1)
    // Multiplying by (max - min + 1) gives a range [0, max - min]
    // Adding min ensures the result is in the range [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const STATUS_COLUMNS = [
    {
        title: 'NEW',
        status: 'pending',
    },
    {
        title: 'RECEIVED',
        status: 'received',
    },
    {
        title: 'COOKING',
        status: 'cooking',
    },
    {
        title: 'READY',
        status: 'ready_to_ship',
    },
    {
        title: 'SERVING',
        status: 'serving',
    },
];

export const colorsData = {
    pending: {
        background: '--tertiary-1-bg',
        borderColor: '--tertiary-2-default',
    },
    received: {
        background: '--info-1-bg',
        borderColor: '--info-2-default',
    },
    cooking: {
        background: '--secondary-1-Light',
        borderColor: '--secondary-2-default',
    },
    ready_to_ship: {
        background: '--primary-1',
        borderColor: '--primary-6',
    },
    done: {
        background: '--success-1-bg',
        borderColor: '--success-2-default',
    },
    paid: {
        background: '--primary-1',
        borderColor: '--primary-6',
    },
    canceled: {
        background: '--error-1-bg',
        borderColor: '--error-2-default',
    },
    cancel: {
        background: '--error-1-bg',
        borderColor: '--error-2-default',
    },
    serving: {
        background: '--success-1-bg',
        borderColor: '--success-2-default',
    },
    ready: {
        background: '--primary-1',
        borderColor: '--primary-6',
    },
};
