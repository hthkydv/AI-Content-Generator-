import { pgTable, serial, text, varchar, boolean } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aioutput', {
    id: serial('id').primaryKey(),
    formData: varchar('formData').notNull(),
    aiResponse: text("aiResponse"),
    templateSlug: varchar('templateSlug').notNull(),
    createdBy: varchar('CreatedBy').notNull(),
    createdat: varchar('createdat').notNull(),


})

export const UserSubscription = pgTable('userSubscription', {
    id: serial('id').primaryKey(),
    email: varchar('email'),
    userName: varchar('userName'),
    active: boolean('active'),
    paymentId: varchar("paymentId"),
    joinDate: varchar('joinDate')
})