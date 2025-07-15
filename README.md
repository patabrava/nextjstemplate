# Next.js SaaS Starter Kit 2.0

A comprehensive, production-ready SaaS starter kit built with Next.js 15, featuring authentication, subscriptions, AI integration, and modern UI components.

# Project Overview

This project is a Next.js starter kit with a comprehensive set of features for building a modern web application. It includes authentication, database integration, UI components, and a subscription-based billing system. The project is built with TypeScript and uses Tailwind CSS for styling.

## Core Technologies

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Supabase MCP](https://supabase.com/docs/guides/auth) 
- **Database:** [Supabase MCP](https://supabase.com/)
- **AI Integration:** [Google Gemini](https://ai.google.dev/)
- **Subscription Management:** [Polar](https://polar.sh/)

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

Authentication is handled using [Supabase MCP](https://supabase.com/docs/guides/auth). The `lib/auth.ts` file provides helper functions for getting the current user and session. The `lib/supabase/server.ts` and `lib/supabase/client.ts` files configure the Supabase MCP client for server-side and client-side usage, respectively.

The `middleware.ts` file protects routes by checking for a valid session.

## Database

The project uses [Supabase MCP](https://supabase.com/) for its database. The database schema is defined in `db/schema.ts`. The schema includes a `Subscription` table for managing user subscriptions.

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



### 💳 Subscription & Billing
- **Polar.sh** integration for subscription management
- Two-tier pricing: Starter ($99/month) & Professional ($499/month)
- Real-time webhook processing
- Customer portal for self-service billing
- Subscription status tracking (active, canceled, expired)
- Payment gating with elegant overlays

### 🤖 AI Integration
- **Gemini** powered chatbot
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



### 📊 Analytics & Monitoring
- **PostHog** integration for product analytics
- User behavior tracking
- Custom event monitoring
- Error tracking and insights

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase MCP
- **Authentication**: Supabase MCP
- **Payments**: Polar.sh
- **AI**: Google Gemini
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
- Supabase MCP project
- Polar.sh account for subscriptions
- Gemini API key for AI features

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
# Supabase MCP Configuration
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url_here"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key_here" 
SERVICE_ROLE="your_supabase_service_role_key_here"

# Google Gemini API
GEMINI_API_KEY="your_gemini_api_key_here"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"

# Polar.sh
POLAR_ACCESS_TOKEN="your_polar_access_token_here"
```

```

4. **Supabase MCP Setup**
- Create a project at [Supabase](https://supabase.com/)
- Copy your project URL and anon key from the project settings
- Configure the MCP server integration

5. **Polar.sh Setup**
- Create products for your pricing tiers
- Set up webhook endpoints for subscription events
- Configure your pricing structure

6. **Start Development Server**
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
- Built-in chatbot with Google Gemini
- Markdown rendering for rich responses
- Conversation history and context

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
- Add new OAuth providers as needed through Supabase MCP
- Customize user profile fields in database schema

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase MCP Documentation](https://supabase.com/docs)
- [Polar.sh Documentation](https://docs.polar.sh)
- [Google Gemini Documentation](https://ai.google.dev/)
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

## Chat Functionality

The application includes an AI-powered chat feature using Google's Gemini 2.5 Flash model. The chat functionality:

- **Real-time streaming**: Messages are streamed in real-time for a responsive chat experience
- **Modern UI**: Clean, iMessage-style chat interface with proper message alignment
- **Markdown support**: Supports rich text formatting in responses
- **Error handling**: Robust error handling with user-friendly messages
- **Loading states**: Visual feedback during message processing

### Chat Implementation

- **API Route**: `/app/api/chat/route.ts` - Handles chat requests and integrates with Google Gemini API
- **Chat Page**: `/app/dashboard/chat/page.tsx` - Main chat interface using AI SDK React hooks
- **Model**: Uses `gemini-2.5-flash` with thinking disabled for faster responses

## Environment Setup

Before running the application, you need to set up the following environment variables:

```bash
# Supabase MCP Configuration
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url_here"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key_here"
SERVICE_ROLE="your_supabase_service_role_key_here"

# Google Gemini API
GEMINI_API_KEY="your_gemini_api_key_here"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"

# Polar.sh
POLAR_ACCESS_TOKEN="your_polar_access_token_here"
```

### Getting API Keys

1. **Google Gemini API Key**: 
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Create a new API key
   - Add it to your `.env.local` file as `GEMINI_API_KEY`

2. **Supabase MCP Configuration**:
   - Create a project at [Supabase](https://supabase.com/)
   - Copy your project URL and anon key from the project settings
   - Set up MCP server integration

## Authentication
