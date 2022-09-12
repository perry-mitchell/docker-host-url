const { resolveURLSync } = require("../dist/resolve");
const { setDockerHostIP } = require("../dist/docker");
const { expect } = require("chai");

describe("resolve", function () {
    describe("resolveURLSync", function () {
        beforeEach(function () {
            setDockerHostIP("192.168.1.1");
        });

        afterEach(function () {
            setDockerHostIP(null);
        });

        it("resolves HTTP URLs", function () {
            expect(resolveURLSync("http://host.docker.internal/test/")).to.equal(
                "http://192.168.1.1/test/"
            );
        });

        it("resolves HTTPS URLs", function () {
            expect(resolveURLSync("https://host.docker.internal/test/")).to.equal(
                "https://192.168.1.1/test/"
            );
        });

        it("resolves URLs with other protocols", function () {
            expect(resolveURLSync("ftp://host.docker.internal/test/")).to.equal(
                "ftp://192.168.1.1/test/"
            );
        });

        it("resolves just the domain", function () {
            expect(resolveURLSync("host.docker.internal")).to.equal("192.168.1.1");
        });

        it("resolves URLs with credentials", function () {
            expect(resolveURLSync("mysql://user:pass@host.docker.internal:3306/database")).to.equal(
                "mysql://user:pass@192.168.1.1:3306/database"
            );
        });
    });
});
