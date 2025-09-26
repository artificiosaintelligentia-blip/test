# Bolt.new Deployment Checklist

## Pre-Deployment Setup

### ✅ Environment Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Your production domain
- [ ] `NEXTAUTH_SECRET` - Secure random string
- [ ] `GOOGLE_CLIENT_ID` (optional) - Google OAuth
- [ ] `GOOGLE_CLIENT_SECRET` (optional) - Google OAuth
- [ ] `APPLE_ID` (optional) - Apple OAuth
- [ ] `APPLE_SECRET` (optional) - Apple OAuth
- [ ] `STRIPE_SECRET_KEY` (optional) - Stripe payments
- [ ] `STRIPE_PUBLISHABLE_KEY` (optional) - Stripe payments
- [ ] `STRIPE_WEBHOOK_SECRET` (optional) - Stripe webhooks

### ✅ Database Setup
- [ ] PostgreSQL database created
- [ ] Database credentials obtained
- [ ] DATABASE_URL configured correctly
- [ ] Database accessible from deployment environment

### ✅ OAuth Setup (Optional)
- [ ] Google OAuth app created (if using Google login)
- [ ] Apple Developer account configured (if using Apple login)
- [ ] OAuth redirect URLs configured

### ✅ Stripe Setup (Optional)
- [ ] Stripe account created
- [ ] API keys obtained
- [ ] Webhook endpoint configured

## Bolt.new Configuration

### ✅ Project Settings
- [ ] Node Version: 20.x (recommended)
- [ ] Package Manager: npm
- [ ] Build Command: `npm run build`
- [ ] Start Command: `npm run start`
- [ ] Framework: Next.js (Server/SSR)

### ✅ Files to Deploy
- [ ] All source code files
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `prisma/schema.prisma`
- [ ] `prisma/seed.ts`
- [ ] `.env.example` (for reference)

## Post-Deployment Steps

### ✅ Database Migration
```bash
npx prisma migrate deploy
```

### ✅ Optional Database Seeding
```bash
npm run db:seed
```

### ✅ Verification
- [ ] App loads at your domain
- [ ] Authentication works (if configured)
- [ ] Database connections work
- [ ] No console errors
- [ ] All features function correctly

## Environment Variable Examples

### Production DATABASE_URL
```
DATABASE_URL="postgresql://username:password@host:port/database"
```

### Production NEXTAUTH_URL
```
NEXTAUTH_URL="https://yourdomain.com"
```

### Production NEXTAUTH_SECRET
Generate with: `openssl rand -base64 32`

## Common Issues & Solutions

### Build Fails
- Check all environment variables are set
- Verify DATABASE_URL format
- Ensure Node.js version compatibility

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check database is accessible
- Run migrations: `npx prisma migrate deploy`

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Ensure OAuth providers are configured correctly

### Payment Issues
- Verify Stripe keys are correct
- Check webhook endpoint is configured
- Ensure webhook secret matches

## Security Checklist

- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] OAuth secrets are properly configured
- [ ] Stripe keys are production keys (not test)
- [ ] No sensitive data in code
- [ ] Environment variables are not logged

## Performance Optimization

- [ ] Database indexes are optimized
- [ ] Images are optimized
- [ ] CDN is configured (if needed)
- [ ] Caching is properly configured
- [ ] Database connection pooling is set up

## Monitoring & Maintenance

- [ ] Error monitoring is set up
- [ ] Database backups are configured
- [ ] Logs are being collected
- [ ] Performance monitoring is active
- [ ] Security scanning is enabled

## Final Verification

- [ ] All pages load correctly
- [ ] User registration works
- [ ] User login works
- [ ] Consultant features work
- [ ] Payment system works (if enabled)
- [ ] Admin panel is accessible
- [ ] Mobile responsiveness is good
- [ ] No console errors
- [ ] Database queries are fast
- [ ] Authentication is secure

## Support Resources

- [Bolt.new Documentation](https://docs.bolt.new)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)