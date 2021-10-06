import { getResolvedDockerHostIP, resolveDockerHostIP } from "./docker";

function getDockerHostRegexp(): RegExp {
    return /(^|\/)(host\.docker\.internal)($|\/|:)/;
}

export async function resolveURLAsync(url: string): Promise<string> {
    const hostIP = await resolveDockerHostIP();
    return url.replace(getDockerHostRegexp(), `$1${hostIP}$3`);
}

export function resolveURLSync(url: string): string {
    const hostIP = getResolvedDockerHostIP();
    return url.replace(getDockerHostRegexp(), `$1${hostIP}$3`);
}
