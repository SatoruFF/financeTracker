import { PrismaClient } from '@prisma/client';
import "dotenv/config";
export const prisma = new PrismaClient({ log: ['query', 'info', 'error'] });
//# sourceMappingURL=index.js.map