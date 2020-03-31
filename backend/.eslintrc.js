module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    /** Nem todo metodo usara a palavra "this", pois os controllers e app vão
     * estar em uma classe, mas não utilizarão o "this" diretamente */
    'class-methods-use-this': 'off',
    /** (IMPORTANTE) Permite que receba o parametro e faça alterações nele,
     * usado pelo Sequelize */
    'no-param-reassign': 'off',
    /** Nem todas as variaveis estarao em camelCase, poderao ter "-" ou "_"
     * como separação */
    camelcase: 'off',
    /** (IMPORTANTE) Permite a declacao da variavel "next", mesmo sem utilizar
     * pois utilizaremos dentro dos middlewares.
     */
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    // Faz com que o "prettier" retorne uma menssagem de erro quando houver
    'prettier/prettier': 'error',
    // Identacao por com 2 espacos"TAB"
    // "indent": [2, "tab"],
  },
};
