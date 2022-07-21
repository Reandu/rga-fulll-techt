module.exports = {
    default: [
      "--require-module ts-node/register",
      "--require features/**/*step.ts",
      "--publish-quiet",
    ].join(" "),
  };