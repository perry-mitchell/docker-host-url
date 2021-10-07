import { resolveURLAsync, resolveURLSync } from "./resolve";
import { resolveDockerHostIP } from "./docker";

export const resolveURL = resolveURLAsync;
export { resolveURLSync };

export async function init() {
    await resolveDockerHostIP();
}
