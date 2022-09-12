# Docker Host URL
> URL host resolver for Docker applications

This library provides URL resolving helpers that resolve URLs that contain the domain `host.docker.internal`. On Mac and Linux hosts this resolves differently, and this library is designed to handle both types of hosts.

You can pass a variety of values to the resolution functions that will detect and replace `host.docker.internal`:

 * HTTP/HTTPS URLs: `http://host.docker.internal/some/page`
 * Other protocols: `ftp://host.docker.internal/dir`
 * Just the domain: `host.docker.internal`
 * URLs with credentials: `mysql://user:password@host.docker.internal:3306/dbname`

## Installation

Install this library as a dependency to use in any environment:

```shell
npm install docker-host-url --save
```

## Usage

Consider an internal application URL like `http://host.docker.internal:8080/api/resource` - when being requested from inside a Docker application this may not resolve correctly. Using this library, a call like the following would be able to resolve it to an IP address:

```typescript
import { resolveURL } from "docker-host-url";

// ...

const url = await resolveURL("http://host.docker.internal:8080/api/resource");
// url = http://172.17.0.1:8080/api/resource
```

Whereas URLs _not_ containing `host.docker.internal` will not be changed:

```typescript
const url = await resolveURL("https://test.com:8080/api/resource");
// url = https://test.com:8080/api/resource
```

This difference allows you to continue using this library in production as it will have no effect on other domains.

### Sync usage

This library makes async calls to resolve the `host.docker.internal` domain, so sync use is not possible without first performing some async call. In situations where you're able to run some async task before the application properly starts, you can call the `init` function to resolve the domain early, allowing you to later call `resolveURLSync` synchronously.
