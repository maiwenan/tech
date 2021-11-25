function makeGraph(n, dist) {
  let graph = new Array(n).fill(1).map(_ => new Array(n).fill(Infinity))

  for (let i = 0; i < dist.length; i++) {
    const [v1, v2] = dist[i]

    graph[v1][v2] = 1
  }

  return graph
}

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

function juge(minGraph, queries) {
  let result = []

  for (let i = 0; i < queries.length; i++) {
    const [v1, v2] = queries[i]

    result[i] = minGraph[v1][v2] !== Infinity
  }

  return result
}

const n = 5
const prerequisites = [[0,1],[1,2],[2,3],[3,4]]
const queries = [[0,4],[4,0],[1,3],[3,0]]

const result = juge(floyd(makeGraph(n, prerequisites)), queries)

console.log(result)
