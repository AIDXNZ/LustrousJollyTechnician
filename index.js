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

  // Youtube api to get details about music but this can be any api as well
  const ytlist = require('youtube-playlist');
  const url = 'https://www.youtube.com/playlist?list=PLmyFRwzYRiBdBKi6ftBFZiT3e_QwA8fAP';
 
  // when a listener joins the room this function will then
  // broadcast the music deatails as json to the station/room 
  // to simulate multiple people open this repl in an incognito tab or device
  room.on('peer joined', (peer) => {
    ytlist(url, ['id', 'name', 'url']).then(res => {
    //console.log(res.data); 
    room.broadcast('${res.data}');

  });
    console.log('New listener', peer)
  })
 
  room.on('peer left', (peer) => {
    console.log('Listener left...', peer)
  })


  room.on('message', (message) => {
    console.log(message)
  })



 
  // now started to listen to room
  room.on('subscribed', () => {
    console.log('Now listening!')
  })
})