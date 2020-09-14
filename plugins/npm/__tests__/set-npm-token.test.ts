/* eslint-disable no-template-curly-in-string */

import { dummyLog } from "@auto-it/core/dist/utils/logger";
import setNpmToken, { getRegistry } from "../src/set-npm-token";
import * as utils from "../src/utils";

const loadPackageJson = utils.loadPackageJson as jest.Mock;
const readFile = utils.readFile as jest.Mock;
const writeFile = utils.writeFile as jest.Mock;
const isMonorepo = utils.isMonorepo as jest.Mock;
const getLernaJson = utils.getLernaJson as jest.Mock;

jest.mock("../src/utils.ts");
jest.mock("env-ci", () => () => ({
  isCi: true,
}));
jest.mock("registry-url", () => (scope?: string) =>
  scope ? "foo.registry.com" : "npm.registry.com"
);
jest.mock("user-home", () => "/User/name");

describe("set npm token", () => {
  beforeEach(() => {
    writeFile.mockClear();
  });

  test("should write a new npmrc", async () => {
    loadPackageJson.mockReturnValueOnce({ name: "test" });
    loadPackageJson.mockReturnValueOnce({ name: "test" });
    await setNpmToken(dummyLog());
    expect(writeFile).toHaveBeenCalledWith(
      "/User/name/.npmrc",
      "npm.registry.com/:_authToken=${NPM_TOKEN}"
    );
  });

  test("should not write a new npmrc for single private package", async () => {
    loadPackageJson.mockReturnValueOnce({ name: "test", private: true });
    isMonorepo.mockReturnValueOnce(false);

    await setNpmToken(dummyLog());
    expect(writeFile).not.toHaveBeenCalled();
  });

  test("should write a npmrc for monorepo", async () => {
    loadPackageJson.mockReturnValueOnce({ name: "test", private: true });
    loadPackageJson.mockReturnValueOnce({ name: "test", private: true });
    isMonorepo.mockReturnValueOnce(true);

    await setNpmToken(dummyLog());
    expect(writeFile).toHaveBeenCalled();
  });

  test("should get command publish registry", async () => {
    loadPackageJson.mockReturnValueOnce({ name: "test" });
    isMonorepo.mockReturnValueOnce(true);
    getLernaJson.mockReturnValue({
      command: { publish: { registry: "https://my.registry" } },
    });

    expect(await getRegistry()).toBe("https://my.registry");
  });

  test("should write a new npmrc w/o name", async () => {
    loadPackageJson.mockReturnValueOnce({});
    loadPackageJson.mockReturnValueOnce({});
    await setNpmToken(dummyLog());
    expect(writeFile).toHaveBeenCalledWith(
      "/User/name/.npmrc",
      "npm.registry.com/:_authToken=${NPM_TOKEN}"
    );
  });

  test("should use registry from packageJson", async () => {
    loadPackageJson.mockReturnValueOnce({
      name: "test",
      publishConfig: { registry: "https://my-registry.com" },
    });
    loadPackageJson.mockReturnValueOnce({
      name: "test",
      publishConfig: { registry: "https://my-registry.com" },
    });
    await setNpmToken(dummyLog());
    expect(writeFile).toHaveBeenCalledWith(
      "/User/name/.npmrc",
      "//my-registry.com/:_authToken=${NPM_TOKEN}"
    );
  });

  test("should use registry for scoped packaged", async () => {
    loadPackageJson.mockReturnValueOnce({
      name: "@scope/test",
    });
    loadPackageJson.mockReturnValueOnce({
      name: "@scope/test",
    });
    await setNpmToken(dummyLog());
    expect(writeFile).toHaveBeenCalledWith(
      "/User/name/.npmrc",
      "foo.registry.com/:_authToken=${NPM_TOKEN}"
    );
  });

  test("should not edit npmrc if it already has the token", async () => {
    loadPackageJson.mockReturnValueOnce({
      name: "test",
      publishConfig: { registry: "https://my-registry.com" },
    });
    loadPackageJson.mockReturnValueOnce({
      name: "test",
      publishConfig: { registry: "https://my-registry.com" },
    });
    readFile.mockReturnValueOnce("//my-registry.com/:_authToken=${NPM_TOKEN}");

    await setNpmToken(dummyLog());
    expect(writeFile).not.toHaveBeenCalled();
  });
});
