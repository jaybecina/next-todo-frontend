import { relative } from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((file) => relative(process.cwd(), file))
    .join(' --file ')}`

const config = {
  // Type check TypeScript files
  '*/.(ts|tsx)': () => 'npx tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,prettierrc,css,scss}':
    'npx prettier --write --config .prettierrc',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}

export default config
