module.exports = {
  'package.json': ['npm run lint:prettier', 'git add'],
  '*.js': ['npm run lint:eslint', 'npm run lint:prettier', 'git add'],
  '*.vue': [
    'npm run lint:eslint',
    'npm run lint:stylelint',
    'npm run lint:prettier',
    'git add',
  ],
}
