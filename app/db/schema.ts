import { 
    pgTable, 
    serial, 
    uuid, 
    varchar, 
    text, 
    timestamp, 
    boolean, 
    pgEnum 
  } from 'drizzle-orm/pg-core';
  
  export const authTypeEnum = pgEnum('auth_type', ['google', 'magic_link']);
  
  export const users = pgTable('users', {

    id: uuid('id').defaultRandom().primaryKey(),
   
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    profileImage: text('profile_image'),
    
 
    authType: authTypeEnum('auth_type').notNull(),
    
    
    googleId: varchar('google_id', { length: 255 }).unique(),
    
 
    lastMagicLinkToken: varchar('last_magic_link_token', { length: 100 }),
    magicLinkTokenExpiry: timestamp('magic_link_token_expiry'),
    
  
    emailVerified: boolean('email_verified').default(false),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  });
