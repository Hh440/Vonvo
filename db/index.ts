//import { PrismaClient } from '@prisma/client'
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma


// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma



// // lib/prisma.ts or db.ts
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;
