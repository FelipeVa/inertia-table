export declare function useParams(): {
    getParam: (key: string, defaultValue?: Record<string, any> | undefined | string | boolean) => any;
    params: Record<string, any>;
    currentPath: string;
};
