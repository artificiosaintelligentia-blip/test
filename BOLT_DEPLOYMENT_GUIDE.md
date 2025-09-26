# Bolt.new Deployment Guide

## Project Overview
- **Framework**: Next.js 13.5.1 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with OAuth providers
- **UI**: Radix UI + Tailwind CSS + shadcn/ui
- **Payments**: Stripe integration
- **Type**: Medium consultation platform

## Bolt.new Configuration

### Node Version
- **Recommended**: Node.js 20.x
- **Current**: Node.js 22.x (also supported)

### Package Manager
- **Use**: npm (default)

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm run start
```

### Framework
- **Type**: Next.js (Server/SSR)
- **Router**: App Router

## Environment Variables

### Required Variables
```bash
# Database (CRITICAL - Must be set)
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth (CRITICAL - Must be set)
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secure-secret-key-here"
```

### Optional Variables (Features will be disabled if missing)
```bash
# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
APPLE_ID="your-apple-id"
APPLE_SECRET="your-apple-secret"

# Stripe Payment Processing
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email Provider (currently disabled)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@yourdomain.com"
```

## Database Setup

### 1. Create PostgreSQL Database
- Set up a PostgreSQL database in your hosting provider
- Note the connection details (host, port, username, password, database name)

### 2. Set DATABASE_URL
- Format: `postgresql://username:password@host:port/database`
- Example: `postgresql://user:pass@db.example.com:5432/topmediums`

### 3. Run Database Migrations
After first deployment, run:
```bash
npx prisma migrate deploy
```

## Deployment Steps

### 1. Initial Setup
1. Create PostgreSQL database
2. Configure all environment variables in bolt.new
3. Deploy the code

### 2. Post-Deployment
1. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
2. (Optional) Seed the database:
   ```bash
   npm run db:seed
   ```

### 3. Verification
1. Check that the app loads at your domain
2. Test authentication (if OAuth is configured)
3. Verify database connections work

## File Structure
```
project/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utilities and configurations
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
└── next.config.js         # Next.js configuration
```

## Key Features
- **User Management**: Registration, authentication, profiles
- **Consultant System**: Consultant profiles, specialties, ratings
- **Session Management**: Live consultations, appointments
- **Payment System**: Stripe integration for credits/wallet
- **Admin Panel**: User and consultant management
- **Responsive UI**: Mobile-friendly design

## Troubleshooting

### Build Issues
- Ensure all environment variables are set
- Check that DATABASE_URL is properly formatted
- Verify Node.js version compatibility

### Runtime Issues
- Check database connectivity
- Verify NEXTAUTH_SECRET is set
- Ensure all required environment variables are configured

### Database Issues
- Run `npx prisma migrate deploy` after deployment
- Check database permissions
- Verify DATABASE_URL format

## Security Notes
- Never commit `.env` files
- Use strong NEXTAUTH_SECRET in production
- Configure proper CORS settings
- Set up proper database access controls

## Support
- Check the logs in bolt.new dashboard
- Verify environment variables are set correctly
- Ensure database is accessible from the deployment environment




