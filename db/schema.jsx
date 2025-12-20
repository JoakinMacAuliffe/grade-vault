import { pgTable, text, timestamp, bigint, boolean } from 'drizzle-orm/pg-core';
import { usersSync } from 'drizzle-orm/neon';

export const todos = pgTable('todos', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().generatedByDefaultAsIdentity(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => usersSync.id),
  task: text('task').notNull(),
  isComplete: boolean('is_complete').notNull().default(false),
  insertedAt: timestamp('inserted_at', { withTimezone: true }).defaultNow().notNull(),
});

export const ramos = pgTable('ramos', {
  id_ramo: char('')
})

export const semesters = pgTable('semesters', {
  
})