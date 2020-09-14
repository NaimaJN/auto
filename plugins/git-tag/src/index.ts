import {
  Auto,
  determineNextVersion,
  execPromise,
  IPlugin,
  getCurrentBranch,
  DEFAULT_PRERELEASE_BRANCHES,
} from "@auto-it/core";
import { inc, ReleaseType } from "semver";

/** Manage your projects version through just a git tag. */
export default class GitTagPlugin implements IPlugin {
  /** The name of the plugin */
  name = "git-tag";

  /**
   * Function that gets the latest version for the git-tag managed plugin.
   * This API is for other plugins to use to build off of this one.
   */
  getLatestFunction?: () => Promise<string>;

  /** Tap into auto plugin points. */
  apply(auto: Auto) {
    /** Get the latest tag in the repo, if none then the first commit */
    const getTag = async () => {
      try {
        return await (
          this.getLatestFunction || auto.git!.getLatestTagInBranch
        )();
      } catch (error) {
        return auto.prefixRelease("0.0.0");
      }
    };

    auto.hooks.getPreviousVersion.tapPromise(this.name, async () => {
      if (!auto.git) {
        throw new Error(
          "Can't calculate previous version without Git initialized!"
        );
      }

      return getTag();
    });

    auto.hooks.version.tapPromise(this.name, async (version) => {
      if (!auto.git) {
        return;
      }

      const lastTag = await getTag();
      const newTag = inc(lastTag, version as ReleaseType);

      if (!newTag) {
        auto.logger.log.info("No release found, doing nothing");
        return;
      }

      const prefixedTag = auto.prefixRelease(newTag);

      auto.logger.log.info(`Tagging new tag: ${lastTag} => ${prefixedTag}`);
      await execPromise("git", [
        "tag",
        prefixedTag,
        "-m",
        `"Update version to ${prefixedTag}"`,
      ]);
    });

    auto.hooks.next.tapPromise(this.name, async (preReleaseVersions, bump) => {
      if (!auto.git) {
        return preReleaseVersions;
      }

      const prereleaseBranches =
        auto.config?.prereleaseBranches ?? DEFAULT_PRERELEASE_BRANCHES;
      const branch = getCurrentBranch() || "";
      const prereleaseBranch = prereleaseBranches.includes(branch)
        ? branch
        : prereleaseBranches[0];
      const lastRelease = await auto.git.getLatestRelease();
      const current =
        (await auto.git.getLastTagNotInBaseBranch(prereleaseBranch)) ||
        (await auto.getCurrentVersion(lastRelease));
      const prerelease = determineNextVersion(
        lastRelease,
        current,
        bump,
        prereleaseBranch
      );

      await execPromise("git", [
        "tag",
        prerelease,
        "-m",
        `"Tag pre-release: ${prerelease}"`,
      ]);
      await execPromise("git", ["push", auto.remote, branch, "--tags"]);

      preReleaseVersions.push(prerelease);
      return preReleaseVersions;
    });

    auto.hooks.publish.tapPromise(this.name, async () => {
      auto.logger.log.info("Pushing new tag to GitHub");

      await execPromise("git", [
        "push",
        "--follow-tags",
        "--set-upstream",
        auto.remote,
        getCurrentBranch() || auto.baseBranch,
      ]);
    });
  }
}
