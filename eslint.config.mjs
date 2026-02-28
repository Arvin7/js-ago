import arvinConfig from "eslint-config-arvin";

export default [
  ...arvinConfig.configs.recommended,
  ...arvinConfig.configs.vitest,
];
