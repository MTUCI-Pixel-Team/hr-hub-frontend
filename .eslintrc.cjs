module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        '@feature-sliced',
        'plugin:@conarti/feature-sliced/rules',
        'plugin:@tanstack/eslint-plugin-query/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
            map: [['@', './src']],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
    },
    plugins: ['react-refresh', '@conarti/feature-sliced'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        '@conarti/feature-sliced/layers-slices': 'error',
        '@conarti/feature-sliced/absolute-relative': 'warn',
        '@conarti/feature-sliced/public-api': 'error',
    },
}
