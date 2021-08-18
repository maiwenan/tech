export function createDom(fiber) {
  const { type, props } = fiber
  // 类型为TEXT_ELEMENT的元素需创建文本节点，其他创建正常的dom节点即可
  const dom = type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)

  // 处理元素的props属性
  const isProperty = key => key !== 'children'
  Object.keys(props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = props[name]
    })

  return dom
}
