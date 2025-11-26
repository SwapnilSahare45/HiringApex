
// Type for all responses across the application
export type AppResponse<T = unknown> =
    | { success: true; data?: T; message?: string }
    | { success: false; error?: string; errors?: Record<string, string[]> };