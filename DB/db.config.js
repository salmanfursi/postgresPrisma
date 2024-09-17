import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client with logging enabled
const prisma = new PrismaClient({
  log: ['query'], // Log all queries for debugging
});

// Function to check database connection
async function checkDatabaseConnection() {
  try {
    // Execute a simple query to check the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connected to PostgreSQL database successfully.');
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL database:', error);
  }
}

// Call the function to check the database connection on startup
checkDatabaseConnection();

export default prisma;
