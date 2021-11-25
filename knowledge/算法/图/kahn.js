/**
 * 图的拓扑排序
 */
function kahn(graph) {
  const keys = Object.keys(graph)
  const dist = new Array(keys.length).fill(0)
  const queue = []
  const result = []
  let count = 0

  for (key in graph) {
    const items = graph[key]

    for (let i = 0; i < items.length; i++) {
      dist[items[i]] += 1
    }
  }

  for (let i = 0; i < dist.length; i++) {
    if (dist[i] === 0) {
      queue.push(i)
    }
  }

  while (queue.length !== 0) {
    const v = queue.shift()
    const values = graph[v]

    count++
    result.push(v)
    for (let i = 0; i < values.length; i++) {
      if (--dist[values[i]] === 0) {
        queue.push(values[i])
      }
    }
  }

  if (count === keys.length) {
    return result
  } else {
    return -1
  }
}

// const graph = {
//   0: [1, 2],
//   1: [3],
//   2: [3],
//   3: [4, 5],
//   4: [],
//   5: []
// }
const graph = {
  0: [3],
  1: [0, 2],
  2: [3],
  3: [4, 5],
  4: [],
  5: []
}

console.log(kahn(graph))
