import { createApiFetch, ApiError } from "@repo/api";

export { ApiError };
export const apiFetch = createApiFetch("admin_access_token");
