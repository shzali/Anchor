import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./",
})

const config = {
  clearMocks: true,
  // preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./singleton.ts"],
}

export default createJestConfig(config)
