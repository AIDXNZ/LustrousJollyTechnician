const JSON = require('json')
const Room = require('ipfs-pubsub-room')
const IPFS = require('ipfs')
const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
})
 
// IPFS node is ready, so we can start using ipfs-pubsub-room
ipfs.on('ready', () => {

  // the pubsub room is like a radio station 
  const room = Room(ipfs, 'random name you come up with')

 
  // when a listener joins the room this function will then
  // broadcast the music deatails as json to the station/room 
  // to simulate multiple people open this repl in an incognito tab or device
  room.on('peer joined', (peer) => {
    
    room.broadcast('Hello from macbook');
    console.log('New listener', peer)
  })
 
  room.on('peer left', (peer) => {
    console.log('Listener left...', peer)
  })


  room.on('message', (message) => {
    const data = JSON.parseLookup(message.data)
    //const msg = JSON.parse(data)
    console.log(message.data.toString())
    //console.log(data)
  })



 
  // now started to listen to room
  room.on('subscribed', () => {
    console.log('Now listening!')
  })
})