import {PrismaClient} from "@prisma/client"

interface CustomNodeJsGlobal extends globalThis.Global{
    prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prismaClient;

export default prismaClient;