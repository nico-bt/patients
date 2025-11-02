# Patient Registration

👋 Hello  
I've seen on LinkedIn and on your website that you currently have several open positions.  
I applied for the Frontend (semi-senior) role.  

Also, before any contact, I looked for recent code challenges on GitHub to present something in advance.  
I found [this one:](https://github.com/JJQuartino/ChallengeLightIt/blob/main/README.md)
that seems more fullstack oriented.  
I did it anyway as a spontaneous presentation.

### Live: 🔗 https://patients-lemon.vercel.app/

It is a Next.js application to register and manage patients.  
You can:
- Add/delete patients.
- Upload images
- Search patients by name

Techs used:
- Nextjs
- Typescript
- Tailwind
- Client side validation: React Hook Form + Zod
- Server side validation: Zod
- Database: Prisma ORM (Postgres) + Supabase
- Images: bucket in Supabase Storage


## Comments
- Followed the "Next way" of using server actions to access the database directly from Server Components.  
I did not create a separate API layer for client-side access.

- Kept the server actions files close to where they are used. Other option could be to create a dedicated "actions/" folder.
  
- Used Supabase instead of a local Docker database to store patients and images in the cloud.  
  This cloud instance can act as development/staging environment.
  
- The patient schema and crud operations are defined with Prisma ORM, stored in a Postgres db on Supabase.
  
- Images are uploaded to a bucket on Supabase and then, the resulting URL is saved in a "patient.photo" field.  

- The phone input uses `react-international-phone` package.  
  And also I've validated the numbers using https://github.com/google/libphonenumber  
  May be this validation could be a litte too strict, and could be better to validate in the future sending an sms only.  
  And just give the user more freedom for entering phone numbers with a less strict validation.


## Entity Diagram
<img width="887" height="505" alt="image" src="https://github.com/user-attachments/assets/37a3b0ce-6a18-4624-8b11-cef365f6c715" />


## Next steps / improvements

- Add pagination, infinite scrolling or "show more" to limit the number of items
- Add "edit patient" feature
- Add filters and sorting options (by email, country code, etc.)
- Add role-based authentication (e.g. admin, staff)
- Add caching for patient list
- Add tests

❤️ Hope you like it!  

---
## Notes for local setup 
After cloning the repo, you’ll need to create a `.env` file with your database access keys.    
If we were using a shared staging environment, this `.env` file could be provided privately via ClickUp, Slack, or another secure channel.  

### Example `.env` file

> ⚠️ Replace the values below with your own Supabase project credentials.

```env
# Connect to Supabase via connection pooling (used by Prisma in production)
DATABASE_URL="YOUR_DB_URL"

# Direct connection to the database (used for local migrations)
DIRECT_URL="YOUR_URL"

# Supabase project configuration for client-side access
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co

# Public anon key for the Supabase client SDK
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

And then: 
```bash
npm install
npm run dev
