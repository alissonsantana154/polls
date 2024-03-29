import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/volting-pub-sub";

export async function pollResults(app: FastifyInstance) {
  app.get('/poll/:pollId/results', { websocket: true } ,(connection, request) => {
      const getPollParans = z.object({
        pollId: z.string().uuid()
      })

      const { pollId } = getPollParans.parse(request.params)

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message))
      })
    })
  }
