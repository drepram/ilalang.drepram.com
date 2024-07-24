import { PrismaClient } from "@prisma/client";

// Check if the `global` object already has a `prisma` instance.
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Create a new instance if it does not exist yet.
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;

// // // import {PrismaClient} from "@prisma/client";

// // // import Adapters from "next-auth/adapters";

// // // const prismaClientPropertyName = `__prevent-name-collision__prisma`;
// // // type GlobalThisWithPrismaClient = typeof globalThis & {
// // // 	[prismaClientPropertyName]: PrismaClient;
// // // };

// // // const getPrismaClient = () => {
// // // 	if (process.env.NODE_ENV === `production`) {
// // // 		return new PrismaClient();
// // // 	} else {
// // // 		const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
// // // 		if (!newGlobalThis[prismaClientPropertyName]) {
// // // 			newGlobalThis[prismaClientPropertyName] = new PrismaClient();
// // // 		}
// // // 		return newGlobalThis[prismaClientPropertyName];
// // // 	}
// // // };
// // // const prisma= getPrismaClient();

// // // export default Adapters.Prisma.Adapter({prisma});

// import { PrismaClient } from '@prisma/client' 

// declare global {
//   var prisma: PrismaClient | undefined 
// }

//  export const prisma =
//   global.prisma ||
//   new PrismaClient()

//  if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient();
//   }
//   prisma = (global as any).prisma;
// }
