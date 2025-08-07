# Database Setup Guide

## Setting up PostgreSQL with Supabase

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be created

### 2. Get Database Connection String

1. In your Supabase dashboard, go to **Settings** → **Database**
2. Find the **Connection string** section
3. Copy the **URI** connection string
4. Replace `[YOUR-PASSWORD]` with your database password

### 3. Set Environment Variables

Create a `.env.local` file in your project root and add:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

### 4. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to your database
npx prisma db push

# (Optional) View your database in Prisma Studio
npx prisma studio
```

### 5. Deploy to Vercel

1. Add the `DATABASE_URL` environment variable in your Vercel project settings
2. Deploy your application

## Database Schema

The application uses the following tables:

- `download_records` - Individual download events
- `download_stats` - Overall download statistics
- `country_analytics` - Downloads by country
- `os_analytics` - Downloads by operating system
- `browser_analytics` - Downloads by browser
- `device_type_analytics` - Downloads by device type
- `hourly_analytics` - Downloads by hour of day
- `daily_analytics` - Downloads by day of week

## Benefits

✅ **Persistent Data**: Downloads are stored permanently in the database
✅ **No Reset on Deploy**: Data persists across deployments
✅ **Real Analytics**: Track actual user behavior
✅ **Scalable**: Can handle thousands of downloads
✅ **Backup**: Supabase provides automatic backups
