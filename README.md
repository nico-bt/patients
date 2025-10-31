# Patient Registration

👋 Hello  
I've seen on linkedin and in your website that you currently have several open positions.  
So I have applied for frontend (semi-senior).  

Also, previous any contact, I looked for recent code challenges in github to present in advance.  
And I found [this one:](https://github.com/JJQuartino/ChallengeLightIt/blob/main/README.md)
that seems more fullstack oriented.  
But did it anyway as a spontaneous presentation.

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
- Followed the "Next way" of using server actions and getting direct access to db via Server Components.  
I did not create a separate api to access via client side.

- I've kept the server actions files close to where they are used. Other option could be to create a separate "actions" folder.
  
- I took the liberty of using Supabase instead of a local Docker database to store patients and images in the cloud.  
  This cloud instance can be used as a development/staging environment.
  
- Patients schema and crud operations are defined using Prisma ORM, stored in a postgres db on Supabase.
  
- Images are uploaded to a bucket on Supabase and then the resulting url is stored in a patient.photo item.  

- The phone input uses `react-international-phone` package.  
  And also I've validated the numbers using https://github.com/google/libphonenumber  
  May be this validation could be a litte too strict, and could be better to validate in the future sending an sms only.  
  And just give the user more freedom for entering phone numbers with a less strict validation.


## Entity Diagram
<img width="887" height="505" alt="image" src="https://github.com/user-attachments/assets/37a3b0ce-6a18-4624-8b11-cef365f6c715" />


## Next steps / improvements

- Add pagination or infinite scrolling or "show more" to limit the number of items
- Add "edit patient" feature
- Add tests

❤️ Hope you like it!  

PD: for running locally, after cloning the repo, you will need to add an .env file with keys to access db.  
Hypothetically, if we were using a cloud database for staging, the .env file could be shared privately via ClickUp, Slack, or another method.
