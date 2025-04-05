import nextJest from "next/jest";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(jestConfig);
