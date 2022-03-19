import { createClient } from "redis"
import { WebSocketServer } from "ws"

const messageChannel = "[MESSAGE]"

const wsserver = new WebSocketServer({ port: 8080 })
console.log("WebSocket server started on port 8080.")

const publisher = createClient()
await publisher.connect()
const subscriber = publisher.duplicate()
await subscriber.connect()

const broadcast = (wsserver: WebSocketServer, message: string): void => {
  wsserver.clients.forEach((client) => {
    client.send(message)
  })
}

wsserver.on('connection', (sock, _req): void => {
  sock.on('message', async (message, _isBinary): Promise<void> => {
    console.log(`Publish ${message}`)
    await publisher.publish(messageChannel, message.toString())
  })
})

subscriber.subscribe(messageChannel, (message): void => {
  console.log(`Subscribe ${message}`)
  broadcast(wsserver, message)
})