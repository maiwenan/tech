import { createDom, updateDom } from './dom'

// 工作单元fiber引用
let nextUnitOfWork = null
// 根节点fiber引用
let wipRoot = null
// 上次提交到 DOM 节点的 fiber 树引用
let currentRoot = null
// 提交（commit）整颗 fiber 树（wipRoot）的变更到 DOM 上的时候，并不会遍历旧 fiber，
// 因此需要记录要删除的fiber节点
let deletions = []

export function render(element, container) {
  // fiber树的跟节点，即跟节点fiber
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    // 记录旧 fiber 节点（上一个 commit 阶段使用的 fiber 节点）的引用
    alternate: currentRoot
  }
  // 清空上一次的记录
  deletions = []
  nextUnitOfWork = wipRoot
}

export function workLoop(deadline) {
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  // 批量提交dom修改
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
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
 * 1. 把element添加到dom上 (在 commitWork 中完成)
 * 2. 为当前fiber节点的子节点创建fiber节点
 * 3. 返回下一个任务单元
 * 注意需区分：
 * 1. element 节点，即react element
 * 2. dom 节点，即 DOM node
 * 3. fiber 节点，即 fiber node（从element 到 DOM 节点的中间产物，用于时间切片）
 */
export function performUnitOfWork(fiber) {
  // 当fiber类型为函数时，使用不同函数进行diff
  const isFunctionComponent = fiber.type instanceof Function

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
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

/**
 * 更新函数组件
 */
function updateFunctionComponent(fiber) {
  // 调用函数生成函数组件的渲染内容
  const elements = [fiber.type(fiber.props)]

  reconcileChildren(fiber, elements)
}

/**
 * 更新浏览器宿主元素
 */
function updateHostComponent(fiber) {
  // 创建fiber节点对应的dom节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // 2. 为当前fiber节点的每个子element节点创建新的fiber节点
  const elements = fiber.props.children

  reconcileChildren(fiber, elements)
}

/**
 * 调和（reconcile）旧的 fiber 节点 和新的 react elements。
 * 在迭代整个 elements 数组的同时我们也需迭代旧的 fiber 节点（wipFiber.alternate）,
 * 在迭代过程中主要比较 oldFiber 和 element 的差异：
 * 1. element 是我们想要渲染到 DOM 上的东西
 * 2. oldFiber 是我们上次渲染 fiber 树
 * 比较步骤：
 * 1. 对于新旧节点类型是相同的情况，我们可以复用旧的 DOM，仅修改上面的属性
 * 2. 如果类型不同，意味着我们需要创建一个新的 DOM 节点
 * 3. 如果类型不同，并且旧节点存在的话，需要把旧节点的 DOM 给移除
 * @param {*} wipFiber 当前正在工作的fiber节点
 * @param {*} elements
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null
  // 旧的fiber节点的第一个子fiber节点
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child

  while (
    index < elements.length ||
    oldFiber != null
  ) {
    const element = elements[index]
    let newFiber = null
    const sameType =
      oldFiber &&
      element.type &&
      oldFiber.type === element.type

    // 1. 新旧节点类型是相同，更新dom
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        // 复用原来dom节点
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        // 标记dom的操作类型：更新dom节点
        effetTag: 'UPDATE'
      }
    }
    // 2. 类型不同，创建并添加dom
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        // 标记dom的操作类型: 新建dom节点
        effetTag: 'PLACEMENT'
      }
    }
    //类型不同并且旧节点存在，删除dom
    if (oldFiber && !sameType) {
      oldFiber.effetTag = 'DELETION'
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 如果是第一个子节点，则当前fiber节点的child属性指向第一个子fiber节点
    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      // 否则上一个子节点的sibling属性指向当前子fiber节点
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}

function commitRoot() {
  // 提交本次更新要删除dom的fiber节点
  deletions.forEach(commitWork)

  commitWork(wipRoot.child)
  // 记录上次提交 DOM 节点修改的 fiber 树引用
  currentRoot = wipRoot
  wipRoot = null
}

/**
 * performUnitOfWork 一边遍历element节点，一边生成dom节点并添加到其父节点上。
 * 在完成整棵树的渲染前，浏览器还要中途阻断这个过程。 那么用户就有可能看到渲染未完全的 UI
 * 因此我们把performUnitOfWork中的第一步移到commitWork中完成，即performUnitOfWork完成所有树节点遍历后，再一次性提交dom的修改
 */
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  let domParentFiber = fiber.parent
  // 往上遍历知道找到有dom节点的父级fiber节点
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom

  if (
    fiber.effetTag === 'PLACEMENT' &&
    fiber.dom != null
  ) {
    // 添加当前fiber的dom节点到父节点的dom上
    domParent.appendChild(fiber.dom)
  } else if (
    fiber.effetTag === 'UPDATE' &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effetTag === 'DELETION') {
    commitDeletion(fiber, domParent)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    // 删除该fiber的dom节点
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}





