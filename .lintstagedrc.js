import { relative } from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((file) => relative(process.cwd(), file))
    .join(' --file ')}`

const config = {
  // Lint TS and JS files using Next.js ESLint
  '**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
  // Type check TypeScript files
  '**/*.ts?(x)': () => 'npm run type-check',
}

export default config
