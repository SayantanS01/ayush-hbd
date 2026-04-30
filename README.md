# Ayush's Birthday Adventure 🎉

A magical, animated, multi-page birthday website built with React, GSAP, and Framer Motion.

## 🚀 Features
- **Superhero Theme**: Vibrant cartoon animations and comic-style UI.
- **Fun & Games**: Interactive mini-games (Balloon Pop, Memory Match, Hero Jump).
- **Super Gallery**: Masonry grid with lightbox for 20 photos.
- **Admin Panel**: Fully functional dashboard to manage all content.
- **Surprise Reveal**: Cinematic monster vs superhero battle sequence.

## ⚙️ Backend Setup (Supabase)

To make your Admin Panel changes visible to everyone, follow these steps:

1. **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a free project.
2. **Set up Database & Storage**:
   - **Database**: Create a table named `birthday_content` with `id` (int8, Primary Key 1) and `content` (jsonb).
   - **Storage**: Create a public bucket named `photos` (this is where your uploaded images will be stored).
3. **Enable RLS (Optional)**: For simplicity in a birthday site, you can disable RLS or add a policy that allows everyone to select and authenticated users to update.
4. **Add Environment Variables to Vercel**:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.

## 🛠️ Local Development
1. Clone the repo.
2. Run `npm install`.
3. Run `npm run dev`.

## 📦 Deployment
The site is ready for Vercel! Just push to GitHub and connect the repo. Don't forget to add the environment variables mentioned above.

## 🔐 Admin Access
- **URL**: `/admin`
- **Password**: `ayush2026`
