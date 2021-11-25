function dijkstra(graph, src) {
  const INF = Number.MAX_SAFE_INTEGER
  // 图的顶点个数
  const len = graph.length
  // 保存每个顶点到 src 的距离
  let dist = []
  // 记录已访问过的顶点
  let visited = []

  // 初始化数据
  for (let i = 0; i < len; i++) {
    // 初始化所有顶点到 src 的距离为无限大
    dist[i] = INF
    visited[i] = false
  }
  // 自身到自己的距离为0
  dist[src] = 0

  // 遍历所有顶点，按照顺序找出路径最小的顶点进行处理
  for (let i = 0; i < len; i++) {
    // 从 dist 队列中找出未被访问过的且路径最小的顶点
    const minIndex = minDistance(dist, visited)

    // 记录该点已访问过
    visited[minIndex] = true

    // 对 minIndex 的所有邻接点进行判断，这里涉及到两点：
    // 1. 找出 minIndex 的所有邻接点，判断依据: `graph[minIndex][v] > 0`
    // 2. 判断 minIndex 到圆点的距离加上 minIndex 到邻接点v的距离是否小于该邻接点v原来的距离，即: `dist[minIndex] + graph[minIndex][v] < dist[v]`
    for (let v = 0; v < len; v++) {
      if (graph[minIndex][v] > 0 && dist[minIndex] + graph[minIndex][v] < dist[v]) {
        dist[v] = dist[minIndex] + graph[minIndex][v]
      }
    }
  }

  return dist
}

function minDistance(dist, visited) {
  let min = Number.MAX_SAFE_INTEGER
  let minIndex = -1

  for (let i = 0; i < dist.length; i++) {
    if (!visited[i] && dist[i] <= min) {
      minIndex = i
      min = dist[i]
    }
  }
  return minIndex
}


let graph = [
  [0,2,4,0,0,0],
  [0,0,1,4,2,0],
  [0,0,0,0,3,0],
  [0,0,0,0,0,2],
  [0,0,0,3,0,2],
  [0,0,0,0,0,0]
]

console.log(dijkstra(graph, 0))
