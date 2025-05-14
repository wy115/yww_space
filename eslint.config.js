// 引入 ESLint 官方推荐规则（@eslint/js 是 ESLint v9 官方推荐方式）
import eslintRecommended from '@eslint/js';
// 引入插件（注意：插件本身需要已安装到 node_modules 中）
import tseslint from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser'; // ✅ 加上这个！

export default [
  // 继承 ESLint 官方推荐规则
  eslintRecommended.configs.recommended,

  {
    // 忽略某些路径，替代 .eslintignore 文件
    ignores: ['dist/', 'node_modules/'],

    // 设置语言选项
    languageOptions: {
      ecmaVersion: 'latest', // 支持最新 ECMAScript 语法
      sourceType: 'module',  // 使用 ES module 模式
      parser: 'vue-eslint-parser', // 使用 Vue 专用解析器（配合下面 options）
      parserOptions: {
        parser: '@typescript-eslint/parser', // 实际语法由 TS 解析器处理
        jsxPragma: 'React', // 支持 JSX（虽然 Vue 里一般不用）
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // 启用的插件
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tseslint,
    },

    // 报告未使用的 eslint-disable 注释
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    // 自定义规则
    rules: {
      // 👉 JavaScript 原生规则
      'no-var': 'error', // 禁止使用 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 限制连续空行数
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止 debugger
      'no-unexpected-multiline': 'error', // 禁止多行表达式意外换行
      'no-useless-escape': 'off', // 允许不必要的转义（有时正则会用到）

      // 👉 TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 使用 @ts-expect-error 替代 @ts-ignore
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any（可按需打开）
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许非空断言（可按需打开）
      '@typescript-eslint/no-namespace': 'off', // 允许使用 namespace
      '@typescript-eslint/semi': 'off', // 不强制加分号

      // 👉 Vue 相关规则
      'vue/multi-word-component-names': 'off', // 允许单词组件名（比如 index.vue）
      'vue/script-setup-uses-vars': 'error', // setup 中使用的变量必须使用
      'vue/no-mutating-props': 'off', // 允许修改 props（按需关闭）
      'vue/attribute-hyphenation': 'off', // 属性命名风格自由（不强制连字符）
    },
  },
];