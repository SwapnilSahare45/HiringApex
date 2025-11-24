
// Type for all responses across the application
export type AppResponse<T = undefined> = {
    success: boolean;
    message?: string;
    data?: T;
    error?: string,
    errors?: Record<string, string[]>;
};