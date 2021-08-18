export function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children
        // 处理 children 中有元素也是数组的情况
        .flat()
        .map(
          // 非对象child需创建文本类型元素
          child => typeof child === 'object'? child : createTextElement(child)
        )
    }
  }
}
