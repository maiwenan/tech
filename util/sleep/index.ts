// Promise
function sleep(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

// Generator
// function* sleep1(timeout) {
//   yield sleep(timeout)
// }
// sleep1().next().value.then(console.log)

// async function xxx() {

// }
