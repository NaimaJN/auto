import * as Auto from "@auto-it/core";
import { dummyLog } from "@auto-it/core/dist/utils/logger";
import { makeHooks } from "@auto-it/core/dist/utils/make-hooks";
import * as utilities from "../src/utilities";
import CocoapodsPlugin, {
  ICocoapodsPluginOptions,
  getParsedPodspecContents,
  getVersion,
  updatePodspecVersion,
} from "../src";

const specWithVersion = (version: string) => `
      Pod:: Spec.new do | s |
        s.name             = 'Test'
        s.version = '${version}'
        s.summary = 'A short description of Test.'

      # This description is used to generate tags and improve search results.
      #   * Think: What does it do? Why did you write it ? What is the focus ?
      #   * Try to keep it short, snappy and to the point.
      #   * Write the description between the DESC delimiters below.
      #   * Finally, don't worry about the indent, CocoaPods strips it!

      s.description = << -DESC
      TODO: Add long description of the pod here.
        DESC

      s.homepage = 'https://github.com/intuit/auto'
      # s.screenshots = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
      s.license = { : type => 'MIT', : file => 'LICENSE' }
      s.author = { 'hborawski' => 'harris_borawski@intuit.com' }
      s.source = { : git => 'https://github.com/intuit/auto.git', : tag => s.version.to_s }

      s.ios.deployment_target = '11.0'

      s.source_files = 'Test/Classes/**/*'


      # s.public_header_files = 'Pod/Classes/**/*.h'
      # s.frameworks = 'UIKit', 'MapKit'
      # s.dependency 'Alamofire'
      end
      `;

const mockPodspec = (contents: string) => {
  return jest.spyOn(utilities, "getPodspecContents").mockReturnValue(contents);
};

let exec = jest.fn().mockResolvedValueOnce("");
jest.mock("../../../packages/core/dist/utils/exec-promise", () => ({
  // @ts-ignore
  default: (...args) => exec(...args),
}));

describe("Cocoapods Plugin", () => {
  let hooks: Auto.IAutoHooks;
  const prefixRelease: (a: string) => string = (version: string) => {
    return `v${version}`;
  };

  const options: ICocoapodsPluginOptions = {
    podspecPath: "./Test.podspec",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    exec.mockClear();
    const plugin = new CocoapodsPlugin(options);
    hooks = makeHooks();
    plugin.apply({ hooks, logger: dummyLog(), prefixRelease } as Auto.Auto);
  });

  describe("getParsedPodspecContents", () => {
    test("should return null if contents cant be parsed with regex", () => {
      mockPodspec("bad podspec");

      expect(getParsedPodspecContents("./Test.podspec")).toBeNull();
    });
    test("should return parsed contents", () => {
      mockPodspec(specWithVersion("0.0.1"));
      const contents = getParsedPodspecContents("./Test.podspec");
      expect(contents).toHaveProperty("groups", { version: "0.0.1" });
    });
  });
  describe("getVersion", () => {
    test("should throw error if parsed podspec is returned as null", () => {
      mockPodspec("bad podspec");

      expect(() => getVersion("./Test.podspec")).toThrow();
    });
    test("should return version", () => {
      mockPodspec(specWithVersion("0.0.1"));

      expect(getVersion("./Test.podspec")).toBe("0.0.1");
    });
  });
  describe("updatePodspecVersion", () => {
    test("should throw error if there is an error writing file", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      jest
        .spyOn(utilities, "writePodspecContents")
        .mockImplementationOnce(() => {
          throw new Error("Filesystem Error");
        });

      await expect(
        updatePodspecVersion("./Test.podspec", "0.0.2")
      ).rejects.toThrowError(
        "Error updating version in podspec: ./Test.podspec"
      );
    });
    test("should successfully write new version", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const mock = jest.spyOn(utilities, "writePodspecContents");

      await updatePodspecVersion("./Test.podspec", "0.0.2");
      expect(mock).lastCalledWith(expect.any(String), specWithVersion("0.0.2"));
    });
  });
  describe("modifyConfig hook", () => {
    test("should set noVersionPrefix to true", () => {
      const config = {};
      expect(hooks.modifyConfig.call(config as any)).toStrictEqual({
        noVersionPrefix: true,
      });
    });
  });
  describe("getPreviousVersion hook", () => {
    test("should get previous version from podspec", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      expect(await hooks.getPreviousVersion.promise()).toBe("v0.0.1");
    });

    test("should throw if no version found", async () => {
      mockPodspec(specWithVersion(""));

      await expect(hooks.getPreviousVersion.promise()).rejects.toThrowError(
        "Version could not be found in podspec: ./Test.podspec"
      );
    });
  });
  describe("version hook", () => {
    test("should version release - patch version", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const mock = jest.spyOn(utilities, "writePodspecContents");

      await hooks.version.promise(Auto.SEMVER.patch);

      expect(mock).lastCalledWith(expect.any(String), specWithVersion("0.0.2"));
    });
    test("should version release - minor version", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const mock = jest.spyOn(utilities, "writePodspecContents");

      await hooks.version.promise(Auto.SEMVER.minor);

      expect(mock).lastCalledWith(expect.any(String), specWithVersion("0.1.0"));
    });
    test("should version release - major version", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const mock = jest.spyOn(utilities, "writePodspecContents");

      await hooks.version.promise(Auto.SEMVER.major);

      expect(mock).lastCalledWith(expect.any(String), specWithVersion("1.0.0"));
    });
    test("should throw if there is an error writing new version", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const mock = jest
        .spyOn(utilities, "writePodspecContents")
        .mockImplementationOnce(() => {
          throw new Error("Filesystem Error");
        });

      await expect(
        hooks.version.promise(Auto.SEMVER.major)
      ).rejects.toThrowError(
        "Error updating version in podspec: ./Test.podspec"
      );

      expect(mock).lastCalledWith(expect.any(String), specWithVersion("1.0.0"));
    });
  });

  describe("publish hook", () => {
    test("should push to trunk if no specsRepo in options", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const plugin = new CocoapodsPlugin(options);
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(2);
      expect(exec).lastCalledWith("pod", ["trunk", "push", "./Test.podspec"]);
    });

    test("should push with different pod command if in options", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const plugin = new CocoapodsPlugin({...options, podCommand: 'notpod'});
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(2);
      expect(exec).lastCalledWith("notpod", ["trunk", "push", "./Test.podspec"]);
    });

    test("should push with different pod command with spaces if in options", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const plugin = new CocoapodsPlugin({...options, podCommand: 'bundle exec pod'});
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(2);
      expect(exec).lastCalledWith("bundle", ["exec", "pod", "trunk", "push", "./Test.podspec"]);
    });

    test("should push to trunk if no specsRepo in options with flags", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const plugin = new CocoapodsPlugin({ ...options, flags: ["--sources", "someOtherSpecsRepo"]});
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(2);
      expect(exec).lastCalledWith("pod", ["trunk", "push", "--sources", "someOtherSpecsRepo", "./Test.podspec"]);
    });

    test("should push to specs repo if specsRepo in options", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const plugin = new CocoapodsPlugin({
        ...options,
        specsRepo: "someSpecsRepo",
      });
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(5);
      expect(exec).toHaveBeenNthCalledWith(2, "pod", [
        "repo",
        "list"
      ]);
      expect(exec).toHaveBeenNthCalledWith(3, "pod", [
        "repo",
        "add",
        "autoPublishRepo",
        "someSpecsRepo",
      ]);
      expect(exec).toHaveBeenNthCalledWith(4, "pod", [
        "repo",
        "push",
        "autoPublishRepo",
        "./Test.podspec",
      ]);
      expect(exec).toHaveBeenNthCalledWith(5, "pod", [
        "repo",
        "remove",
        "autoPublishRepo",
      ]);
    });

    test("should push to specs repo if specsRepo in options with flags", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      const plugin = new CocoapodsPlugin({
        ...options,
        specsRepo: "someSpecsRepo",
        flags: [
          "--sources",
          "someOtherSpecsRepo"
        ]
      });
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(5);
      expect(exec).toHaveBeenNthCalledWith(2, "pod", [
        "repo",
        "list"
      ]);
      expect(exec).toHaveBeenNthCalledWith(3, "pod", [
        "repo",
        "add",
        "autoPublishRepo",
        "someSpecsRepo",
      ]);
      expect(exec).toHaveBeenNthCalledWith(4, "pod", [
        "repo",
        "push",
        "--sources",
        "someOtherSpecsRepo",
        "autoPublishRepo",
        "./Test.podspec",
      ]);
      expect(exec).toHaveBeenNthCalledWith(5, "pod", [
        "repo",
        "remove",
        "autoPublishRepo",
      ]);
    });
    test("should delete autoPublishRepo if it exists and push to specs repo if specsRepo in options", async () => {
      mockPodspec(specWithVersion("0.0.1"));

      exec = jest.fn().mockImplementation((...args) => {
        if (args[1]?.[1] === 'list') {
          return `
autoPublishRepo
- Type: git (master)
- URL:  someSpecsRepo
- Path: /Users/someUser/.cocoapods/repos/autoPublishRepo

master
- Type: git (master)
- URL:  https://github.com/CocoaPods/Specs.git
- Path: /Users/someUser/.cocoapods/repos/master

trunk
- Type: CDN
- URL:  https://cdn.cocoapods.org/
- Path: /Users/someUser/.cocoapods/repos/trunk
          `
        }
      })

      const plugin = new CocoapodsPlugin({
        ...options,
        specsRepo: "someSpecsRepo",
      });
      const hook = makeHooks();
      plugin.apply({
        hooks: hook,
        logger: dummyLog(),
        prefixRelease,
      } as Auto.Auto);

      await hook.publish.promise(Auto.SEMVER.patch);

      expect(exec).toBeCalledTimes(6);
      expect(exec).toHaveBeenNthCalledWith(2, "pod", [
        "repo",
        "list"
      ]);
      expect(exec).toHaveBeenNthCalledWith(3, "pod", [
        "repo",
        "remove",
        "autoPublishRepo"
      ]);
      expect(exec).toHaveBeenNthCalledWith(4, "pod", [
        "repo",
        "add",
        "autoPublishRepo",
        "someSpecsRepo",
      ]);
      expect(exec).toHaveBeenNthCalledWith(5, "pod", [
        "repo",
        "push",
        "autoPublishRepo",
        "./Test.podspec",
      ]);
      expect(exec).toHaveBeenNthCalledWith(6, "pod", [
        "repo",
        "remove",
        "autoPublishRepo",
      ]);
    });
  });
});
