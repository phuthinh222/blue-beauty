import { createApiFetch, ApiError } from "@repo/api";

export { ApiError };
export const apiFetch = createApiFetch("user_access_token");
