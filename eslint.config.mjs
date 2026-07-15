import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Firebase returns dynamic data — `any` is acceptable here
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars are warnings, not errors
      "@typescript-eslint/no-unused-vars": "warn",
      // setState inside useEffect is a valid initialization pattern
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      // Allow <img> for skill icons loaded from external CDN URLs
      "@next/next/no-img-element": "warn",
    },
  },
]);

export default eslintConfig;
