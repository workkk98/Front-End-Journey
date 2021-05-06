module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "type-enum": [2, 'always', [
      'ts',
      'js',
      'css',
      'feat',
      'test',
      "directory",
      'vue',
      'html',
      'algorithm',
      'browser',
      'questions',
      'node'
    ]]
  }
}