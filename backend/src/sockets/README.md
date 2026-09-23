# sockets

Socket.io is attached to the HTTP server in `server.ts`. Clients join `session:{id}` rooms. The worker publishes `evaluation:ready` on Redis; this process subscribes and emits to that room.
