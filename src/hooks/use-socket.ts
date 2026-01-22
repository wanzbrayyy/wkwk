import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export const useSocket = (projectId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
      path: "/api/socket/io",
      addTrailingSlash: false,
      query: {
        projectId
      }
    })

    socketInstance.on("connect", () => {
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [projectId])

  return { socket, isConnected }
}