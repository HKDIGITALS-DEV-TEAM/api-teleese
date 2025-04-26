/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
    authorize: (roles: string[]) => any;
  }

  interface FastifyRequest {
    user?: any;
  }

  interface FastifyReply {
    sendFile(filename: string, rootPath?: string): FastifyReply;
  }
  interface FastifyRequest {
    user?: { userId: string; role: string };
  }
}
