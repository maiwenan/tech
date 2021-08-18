import { createDom } from './dom'

let nextUnitOfWork = null

export function workLoop(deadline) {
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  window.requestIdleCallback(workLoop)
}

// 使用requestIdleCallback作为一个渲染，其作用可类比成setTimeout(fn, 0)
// 只不过相比setTimeout，requestIdleCallback会让浏览器主线程有空闲的时候再允许我们的任务
// 相当于把控制权交给浏览器，让浏览器决定什么时候运行我们的任务
window.requestIdleCallback(workLoop)

/**
 * 把整个渲染tree任务拆分成多个小块任务，依据节点进行拆分，即每个渲染dom点就是一个小任务(fiber)
 * 这样做是为了避免渲染树太大对主线程造成阻塞
 * 每个任务单元要完成三件事：
 * 1. 把element添加到dom上
 * 2. 为当前fiber节点的子节点创建fiber节点
 * 3. 返回下一个任务单元
 * 注意需区分：
 * 1. element 节点，即react element
 * 2. dom 节点，即 DOM node
 * 3. fiber 节点，即 fiber node（从element 到 DOM 节点的中间产物，用于时间切片）
 */
export function performUnitOfWork(fiber) {
  // 创建fiber节点对应的dom节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // 1. 渲染当前fiber的dom节点到父节点的dom上
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  // 2. 为当前fiber节点的每个子element节点创建新的fiber节点
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    // 如果是第一个子节点，则当前fiber节点的child属性指向第一个子fiber节点
    if (index === 0) {
      fiber.child = newFiber
    } else {
      // 否则上一个子节点的sibling属性指向当前子fiber节点
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }

  // 3. 最后，找到下一个任务单元，先找child节点，再找sibling节点，最后找uncle节点
  if (fiber.child) {
    return fiber.child
  }
  // 如果一个fiber节点没有child节点，也没有sibling节点，说明是fiber树的一个叶子节点，这时候就要找父节点的sibling节点
  // 往父级节点逐级查找sibling节点或uncle节点
  // 如果返回空，则说明找不到下一个工作fiber节点，即整个fiber树已经处理完成
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

export function render(element, container) {
  // fiber树的跟节点，即跟节点fiber
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}
