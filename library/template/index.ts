// 模板引擎版本

const settings = {
  evalute: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g
}
const escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};
const escapeRe = /'|\\|\n|\r|\u2028|\u2029/g

function template(tpl: string) {
  let source = "var __p='';\n";

  source = source + "with(data){\n"
  source = source + "__p+='";

  tpl = tpl.replace(escapeRe, match => `\\${escapes[match]}`)
    .replace(settings.interpolate, (match, $1) => {
      return "'+\n(" + $1 + " == null ? '' : " + $1 + ")+\n'"
    })
    .replace(settings.evalute, (match, $1) => {
      return "';\n " + $1 + "\n__p+='"
    })
  source = source + tpl + "';\n }; \n return __p;";

  const fn = new Function('data', source)

  return (data: unknown): string => fn(data)
}

export default template
