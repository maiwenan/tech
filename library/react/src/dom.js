const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (next) => key => !(key in next)

export function updateDom (dom, prevProps, nextProps) {
  // 旧事件处理：删除不在nextProps中的或者在nextProps中但值不同的事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)

      dom.removeEventListener(eventType, prevProps[name])
    })

  // 删除旧属性
  Object.keys(prevProps)
    .filter(isProperty)
    // 过滤出不存在nextProps中的属性，然后删除
    .filter(isGone(nextProps))
    .forEach(name => {
      dom[name] = ''
    })

  // 新事件处理：删除不在nextProps中的或者在nextProps中但值不同的事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)

      dom.addEventListener(eventType, nextProps[name])
    })

  // 添加新属性或者修改属性值
  Object.keys(nextProps)
    .filter(isProperty)
    // 对于值不同的属性进行更新
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}

export function createDom (fiber) {
  const { type, props } = fiber
  // 类型为TEXT_ELEMENT的元素需创建文本节点，其他创建正常的dom节点即可
  const dom = type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)

  // 处理元素的props属性
  updateDom(dom, {}, props)

  return dom
}
