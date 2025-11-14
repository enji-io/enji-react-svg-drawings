if (process.env.npm_execpath.indexOf('pnpm') === -1) {
  console.error('Please use pnpm instead of npm or yarn to install dependencies');
  process.exit(1);
}
