const removeTypename = <T>(data: T): T => {
    if (Array.isArray(data)) {
        return data.map((item) => removeTypename(item)) as T;
    } else if (data && typeof data === "object") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __typename, ...rest } = data as { __typename?: string };
        return Object.fromEntries(Object.entries(rest).map(([key, value]) => [key, removeTypename(value)])) as T;
    }
    return data;
};

export default removeTypename;
