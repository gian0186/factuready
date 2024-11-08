import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);


const globalForPrisma = global as typeof global & { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
