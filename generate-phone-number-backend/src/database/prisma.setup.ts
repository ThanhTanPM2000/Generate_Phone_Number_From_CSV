import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const testConnection = async () => {
  try {
    await db.$connect();
    await db.$disconnect();
    console.log("PostgresQl set up succeffully");
  } catch (err) {
    console.log("Connection Failed");
    throw err;
  }
};

testConnection();

export default db;
