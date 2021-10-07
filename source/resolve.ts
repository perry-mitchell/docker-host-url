import { getResolvedDockerHostIP, resolveDockerHostIP } from "./docker";

function getDockerHostRegexp(): RegExp {
    return /(^|\/)(host\.docker\.internal)($|\/|:)/;
}

export async function resolveURLAsync(url: string): Promise<string> {
    const hostIP = await resolveDockerHostIP();
    if (!hostIP) return url;
    return url.replace(getDockerHostRegexp(), `$1${hostIP}$3`);
}

export function resolveURLSync(url: string): string {
    const hostIP = getResolvedDockerHostIP();
    if (!hostIP) return url;
    return url.replace(getDockerHostRegexp(), `$1${hostIP}$3`);
}
