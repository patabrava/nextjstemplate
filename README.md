# Next.js SaaS Starter Kit 2.0

A comprehensive, production-ready SaaS starter kit built with Next.js 15, featuring authentication, subscriptions, AI integration, and modern UI components.

# Project Overview

This project is a Next.js starter kit with a comprehensive set of features for building a modern web application. It includes authentication, database integration, UI components, and a subscription-based billing system. The project is built with TypeScript and uses Tailwind CSS for styling.

## Core Technologies

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Database:** [Supabase](https://supabase.com/)
- **Subscription Management:** [Polar](https://polar.sh/)
- **Image Uploads:** [UploadThing](https://uploadthing.com/)

## Project Structure

The project follows a standard Next.js App Router structure.

```
nextjs-starter-kit/
├── app/                  # Application routes
│   ├── (main)/           # Main application layout
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   └── ...
├── components/           # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── homepage/         # Components for the homepage
│   └── ...
├── db/                   # Database schema
│   └── schema.ts
├── hooks/                # Custom React hooks
├── lib/                  # Library functions and utilities
│   ├── auth/             # Authentication-related functions
│   ├── supabase/         # Supabase client configuration
│   └── ...
├── public/               # Static assets
└── ...
```

## Components

The project uses a combination of custom components and components from the [Shadcn UI](https://ui.shadcn.com/) library.

### UI Components (`components/ui`)

This directory contains a set of reusable UI components from Shadcn UI, including:

- `Avatar`
- `Button`
- `Card`
- `Dialog`
- `DropdownMenu`
- `Input`
- `Label`
- `...and more`

### Homepage Components (`components/homepage`)

These components are used to build the landing page of the application:

- `HeroSection`: The main hero section of the homepage.
- `Integrations`: A section to display integrations with other services.
- `Footer`: The footer of the application.

### Dashboard Components (`app/dashboard/_components`)

These components are specific to the dashboard pages:

- `Sidebar`: The sidebar navigation for the dashboard.
- `Navbar`: The top navigation bar for the dashboard.
- `SectionCards`: Cards to display different sections of the dashboard.
- `Chatbot`: A chatbot component.
- `ChartInteractive`: An interactive chart component.

## Pages & Routing

The application uses the Next.js App Router for routing. The main pages are:

- `/`: The homepage.
- `/sign-in`: The sign-in page.
- `/sign-up`: The sign-up page.
- `/dashboard`: The main dashboard page, which is a protected route.
- `/dashboard/chat`: A page with a chatbot.
- `/dashboard/payment`: A page to manage subscriptions.
- `/dashboard/settings`: A page for user settings.
- `/dashboard/upload`: A page to upload images.
- `/pricing`: The pricing page.
- `/privacy-policy`: The privacy policy page.
- `/terms-of-service`: The terms of service page.

## Authentication

Authentication is handled using [Supabase Auth](https://supabase.com/docs/guides/auth). The `lib/auth.ts` file provides helper functions for getting the current user and session. The `lib/supabase/server.ts` and `lib/supabase/client.ts` files configure the Supabase client for server-side and client-side usage, respectively.

The `middleware.ts` file protects routes by checking for a valid session.

## Database

The project uses [Supabase](https://supabase.com/) for its database. The database schema is defined in `db/schema.ts`. The schema includes a `Subscription` table for managing user subscriptions.

## Styling

The project uses [Tailwind CSS](https://tailwindcss.com/) for styling. The configuration is in `tailwind.config.ts`. The project also uses `tailwindcss-animate` for animations.

## Hooks

The project includes a custom hook:

- `use-mobile`: A hook to detect if the user is on a mobile device.

## Libraries & Utilities

The project uses several other libraries and utilities:

- `zod`: For schema validation.
- `react-hook-form`: for building forms.
- `recharts`: For creating charts.
- `react-markdown`: To render Markdown content.
- `sonner`: For displaying toast notifications.
- `uploadthing`: For handling file uploads.
- `polar-sh/sdk`: For integrating with the Polar subscription service.

## ✨ Features

### 🔐 Authentication & User Management
- **Better Auth v1.2.8** - Modern authentication system
- Google OAuth integration
- Session management with database persistence
- User profile management with image uploads
- Account linking for multiple providers

### 💳 Subscription & Billing
- **Polar.sh** integration for subscription management
- Two-tier pricing: Starter ($99/month) & Professional ($499/month)
- Real-time webhook processing
- Customer portal for self-service billing
- Subscription status tracking (active, canceled, expired)
- Payment gating with elegant overlays

### 🤖 AI Integration
- **OpenAI** powered chatbot
- React Markdown rendering for rich responses
- Multi-step conversation support
- Integrated chat widget in dashboard

### 🎨 Modern UI/UX
- **Tailwind CSS v4** - Latest utility-first styling
- **shadcn/ui** components - Accessible, customizable
- **Radix UI** primitives - Unstyled, accessible components
- Dark/light theme support with smooth transitions
- Responsive design with mobile-first approach
- Loading skeletons and optimistic UI updates

### 🗄️ Database & Storage
- **Neon PostgreSQL** - Serverless database
- **Drizzle ORM** - Type-safe database toolkit
- **Cloudflare R2** - Scalable file storage with zero egress fees
- Database migrations with Drizzle Kit
- Drag & drop file uploads with progress tracking

### 📊 Analytics & Monitoring
- **PostHog** integration for product analytics
- User behavior tracking
- Custom event monitoring
- Error tracking and insights

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Authentication**: Better Auth v1.2.8
- **Payments**: Polar.sh
- **AI**: OpenAI SDK
- **Storage**: Cloudflare R2
- **Analytics**: PostHog
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── dashboard/           # Protected dashboard area
│   │   ├── _components/     # Dashboard components
│   │   ├── chat/           # AI chat interface
│   │   ├── upload/         # File upload with R2
│   │   ├── payment/        # Subscription management
│   │   └── settings/       # User settings & billing
│   ├── pricing/            # Public pricing page
│   └── api/                # API routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── homepage/           # Landing page sections
├── lib/
│   ├── auth/              # Authentication config
│   ├── subscription.ts    # Subscription utilities
│   └── upload-image.ts    # R2 file upload utilities
└── db/
    ├── schema.ts          # Database schema
    └── drizzle.ts         # Database connection
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Cloudflare R2 bucket for file storage
- Polar.sh account for subscriptions
- OpenAI API key for AI features
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd next-starter-2.0
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file with:
```env
# Database
DATABASE_URL="your-neon-database-url"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Polar.sh
POLAR_ACCESS_TOKEN="your-polar-access-token"
POLAR_WEBHOOK_SECRET="your-webhook-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
R2_UPLOAD_IMAGE_ACCESS_KEY_ID="your-r2-access-key-id"
R2_UPLOAD_IMAGE_SECRET_ACCESS_KEY="your-r2-secret-access-key"
R2_UPLOAD_IMAGE_BUCKET_NAME="your-r2-bucket-name"

# Polar.sh Pricing Tiers
NEXT_PUBLIC_STARTER_TIER="your-starter-product-id"
NEXT_PUBLIC_STARTER_SLUG="your-starter-slug"
```

4. **Database Setup**
```bash
# Generate and run migrations
npx drizzle-kit generate
npx drizzle-kit push
```

5. **Cloudflare R2 Setup**
- Create a Cloudflare account and set up R2 storage
- Create a bucket for file uploads
- Generate API tokens with R2 permissions
- Configure CORS settings for your domain

6. **Polar.sh Setup**
- Create products for your pricing tiers
- Set up webhook endpoints for subscription events
- Configure your pricing structure

7. **Start Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🎯 Key Features Explained

### Subscription Management
- Automatic subscription status checking
- Payment gating for premium features
- Integration with Polar.sh customer portal
- Webhook handling for real-time updates

### AI Chat Integration
- Built-in chatbot with OpenAI
- Markdown rendering for rich responses
- Conversation history and context

### File Upload System
- **Cloudflare R2 integration** with S3-compatible API
- **Drag & drop interface** with visual feedback
- **File validation** - Type checking and size limits
- **Progress tracking** - Real-time upload progress
- **Image gallery** - View uploaded files with metadata
- **Copy URLs** - Easy sharing and integration

### Analytics & Tracking
- PostHog event tracking
- User behavior monitoring
- Custom analytics dashboard

## 🔧 Customization

### Adding New Features
1. Create components in `components/`
2. Add API routes in `app/api/`
3. Update database schema in `db/schema.ts`
4. Run `npx drizzle-kit generate` and `npx drizzle-kit push`

### Styling
- Modify `app/globals.css` for global styles
- Use Tailwind classes for component styling
- Customize theme in `tailwind.config.ts`

### Authentication
- Configure providers in `lib/auth/auth.ts`
- Add new OAuth providers as needed
- Customize user profile fields in database schema

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [Polar.sh Documentation](https://docs.polar.sh)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and modern web technologies.
