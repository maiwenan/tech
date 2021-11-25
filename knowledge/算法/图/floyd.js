function floyd(graph) {
  for (let k = 0; k < graph.length; k++) {
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        if (graph[i][k] + graph[k][j] <= graph[i][j]) {
          graph[i][j] = graph[i][k] + graph[k][j]
        }
      }
    }
  }

  return graph
}

const graph = [
  [0, 2, 6, 4],
  [Infinity, 0, 3, Infinity],
  [7, Infinity, 0, 1],
  [5, Infinity, 12, 0]
]

console.log(floyd(graph))

