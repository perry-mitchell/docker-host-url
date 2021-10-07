import { promises as dns } from "dns";
import detectHostIP from "docker-host-ip";

let __hostIP: string = null;

export function getResolvedDockerHostIP(): string {
    return __hostIP;
}

export async function resolveDockerHostIP(): Promise<string> {
    if (__hostIP) return __hostIP;
    try {
        const result = await dns.lookup("host.docker.internal", {
            family: 4,
        });
        if (result?.address) {
            __hostIP = result.address;
            return __hostIP;
        }
    } catch (err) {}
    __hostIP = await new Promise<string>((resolve, reject) => {
        detectHostIP((err: Error, result: string) => {
            if (err) {
                return reject(err);
            }
            resolve(result || "");
        });
    });
    return __hostIP;
}
