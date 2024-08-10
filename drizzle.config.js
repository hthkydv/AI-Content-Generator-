/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./Utils/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:vXyZq6rY1Txj@ep-sparkling-butterfly-a1zupcou.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'

  }
};