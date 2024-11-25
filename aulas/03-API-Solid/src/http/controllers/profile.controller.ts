import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify()

  console.log(req.user.sub)

  return rep.status(200).send()
}
