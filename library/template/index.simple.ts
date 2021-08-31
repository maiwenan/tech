// 模板引擎简单版本

function template(tpl: string) {
  tpl = tpl.replace(/[\r\t\n]/g, '')
    .replace(/<%=(.*?)%>/g, ($0, $1) => `');p.push(${$1});p.push('`)
    .replace(/%>/g, `p.push('`)
    .replace(/<%/g, `');`)

  const body = `var p=[];with(data){p.push('${tpl}');}return p.join('');`
  const fn = new Function('data', body)

  return (data: unknown): string => fn(data)
}

export default template
