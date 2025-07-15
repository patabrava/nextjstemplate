# Project Architecture Overview

This document provides an overview of the architecture of the Next.js SaaS Starter Kit.

## 1. Core Technologies

The project is built with a modern web technology stack, including:

-   **Framework:** Next.js 15.3.1 with App Router
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4 + Shadcn UI
-   **Authentication:** Better Auth v1.2.8 (Supabase Auth is mentioned in the old README, but Better Auth is the current one)
-   **Database:** Supabase MCP (Supabase is mentioned as the database in the old README, but Supabase MCP is the current one)
-   **AI Integration:** Google Gemini (via OpenAI SDK in the old README, but Google Gemini is the current one)
-   **Subscription Management:** Polar.sh
-   **Image Uploads:** Cloudflare R2 (UploadThing is mentioned in the old README, but Cloudflare R2 is the current one)
-   **Analytics:** PostHog

## 2. Project Structure

The project follows a standard Next.js App Router structure, organized as follows:

```
nextjs-starter-kit/
├── app/                  # Application routes (main, api, auth, dashboard, etc.)
│   ├── (main)/           # Main application layout
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages (protected routes)
│   │   ├── _components/  # Dashboard-specific components
│   │   ├── chat/         # AI chat interface
│   │   ├── upload/       # File upload with R2
│   │   ├── payment/      # Subscription management
│   │   └── settings/     # User settings & billing
│   ├── pricing/          # Public pricing page
│   └── ...
├── components/           # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── homepage/         # Components for the homepage
│   └── ...
├── db/                   # Database schema and connection
│   └── schema.ts         # Database schema definitions
├── hooks/                # Custom React hooks
├── lib/                  # Library functions and utilities
│   ├── auth/             # Authentication-related functions and configuration
│   ├── supabase/         # Supabase client configuration (might be deprecated if Better Auth is fully integrated)
│   ├── subscription.ts   # Subscription utilities
│   ├── upload-image.ts   # Cloudflare R2 file upload utilities
│   └── utils.ts          # General utility functions
├── public/               # Static assets
└── ...
```

## 3. Key Features

The starter kit provides a comprehensive set of features for building a modern web application:

### 3.1. Authentication & User Management

-   Modern authentication system (Better Auth)
-   Google OAuth integration
-   Session management with database persistence
-   User profile management with image uploads
-   Account linking for multiple providers

### 3.2. Subscription & Billing

-   Polar.sh integration for subscription management
-   Two-tier pricing (Starter & Professional)
-   Real-time webhook processing
-   Customer portal for self-service billing
-   Subscription status tracking
-   Payment gating for premium features

### 3.3. AI Integration

-   AI-powered chatbot using Google Gemini
-   React Markdown rendering for rich responses
-   Multi-step conversation support
-   Integrated chat widget in dashboard
-   Real-time streaming for responsive chat experience
-   Robust error handling and loading states

### 3.4. Modern UI/UX

-   Tailwind CSS for utility-first styling
-   Shadcn UI components for accessible and customizable UI
-   Radix UI primitives for unstyled, accessible components
-   Dark/light theme support
-   Responsive design with mobile-first approach
-   Loading skeletons and optimistic UI updates

### 3.5. Database & Storage

-   Supabase MCP as the database solution

### 3.6. Analytics & Monitoring

-   PostHog integration for product analytics
-   User behavior tracking
-   Custom event monitoring
-   Error tracking and insights

## 4. Data Flow and Interactions

-   **Frontend (Next.js App Router):** Handles routing, UI rendering, and client-side interactions.
-   **API Routes (`app/api`):** Serve as backend endpoints for handling authentication, chat requests, subscription webhooks, and image uploads. These routes interact with external services and the database.
-   **Authentication:** `middleware.ts` protects routes by checking for valid sessions. `lib/auth.ts` provides helper functions for user and session management.
-   **Database (`db/schema.ts`):** Defines the database schema and handles database connections and queries via Supabase MCP.
-   **External Services:**
    -   **Google Gemini API:** Integrated for AI chat functionality.
    -   **Polar.sh:** Manages subscriptions and billing, with webhooks for real-time updates.
    -   **Cloudflare R2:** Used for file storage and image uploads.
    -   **PostHog:** For analytics and user behavior tracking.

This architecture provides a robust and scalable foundation for a modern SaaS application, leveraging serverless technologies and a component-based UI approach.
