import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
    })
    return res.writeHead(201).end('Criacao de usuarios')
  }

  /** Early return */
  return res.writeHead(404).end('Not Found')
})

server.listen(3333)
