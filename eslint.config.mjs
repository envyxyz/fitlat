import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Design-system enforcement: the raw patterns each Fitlat primitive exists to
// replace. Keep these two arrays as the single named list — if another
// file-scoped no-restricted-syntax block is ever added to this config, ESLint
// flat config REPLACES (doesn't merge) same-key blocks for overlapping files,
// so any new rule below must be appended to every such block too.
const noHardcodedHex = {
  selector:
    "Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/], TemplateElement[value.raw=/#([0-9a-fA-F]{3}){1,2}/]",
  message:
    "No hardcoded hex colors — use a Fitlat token (bg-canvas, text-ink, border-hairline, …) from src/styles/tokens.css.",
};

const noRgbFunction = {
  selector:
    "CallExpression[callee.name=/^rgba?$/], Literal[value=/rgba?\\(/], TemplateElement[value.raw=/rgba?\\(/]",
  message: "No raw rgb()/rgba() colors — use a Fitlat token from src/styles/tokens.css instead.",
};

const noArbitraryTinyText = {
  selector: "Literal[value=/text-\\[(9|10)px\\]/], TemplateElement[value.raw=/text-\\[(9|10)px\\]/]",
  message: "9px/10px text is below Fitlat's minimum type size — use text-caption (13px) or larger.",
};

const noRawIconSizing = {
  selector:
    "JSXAttribute[name.name='className'][value.value=/\\b(w-[0-9]+ h-[0-9]+|h-[0-9]+ w-[0-9]+)\\b/]",
  message: "Raw icon-sizing classes (w-N h-N) belong inside an Icon primitive's own file, not on a call site.",
};

const noUnpairedOutlineNone = {
  selector: "JSXAttribute[name.name='className'][value.value=/focus:outline-none/][value.value!=/focus-visible:/]",
  message: "focus:outline-none with no paired focus-visible: ring is a keyboard-accessibility bug.",
};

const designSystemRules = [
  noHardcodedHex,
  noRgbFunction,
  noArbitraryTinyText,
  noRawIconSizing,
  noUnpairedOutlineNone,
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    name: "fitlat/design-system-enforcement",
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      // Primitives are the one legitimate place these patterns are allowed —
      // this is where the tokens/behaviors they ban get *defined*.
      "src/components/ui/**",
      "src/styles/**",
    ],
    rules: {
      "no-restricted-syntax": ["error", ...designSystemRules],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".agents/**",
    "scratch_frames/**",
  ]),
]);

export default eslintConfig;
