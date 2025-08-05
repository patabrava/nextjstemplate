# Project Architecture Overview

This document provides an overview of the architecture of the Next.js SaaS Starter Kit.

## 1. Core Technologies

The project is built with a modern web technology stack, including:

-   **Framework:** Next.js 15.3.1 with App Router
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4 + Shadcn UI
-   **Authentication:** Better Auth with Polar integration
-   **Database:** Better Auth internal database management
-   **AI Integration:** Google Gemini 2.5 Flash via AI SDK
-   **File Storage:** Cloudflare R2 (S3-compatible)
-   **Subscription Management:** Polar.sh
-   **Analytics:** Vercel Analytics

## 2. Project Structure

The project follows a standard Next.js App Router structure, organized as follows:

```
nextjs-starter-kit/
├── app/                  # Application routes (main, api, auth, dashboard, etc.)
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── chat/         # AI chat API endpoint
│   │   ├── subscription/ # Subscription management API
│   │   ├── upload-image/ # File upload API endpoint
│   │   └── webhooks/     # Webhook handlers (Polar)
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages (protected routes)
│   │   ├── _components/  # Dashboard-specific components
│   │   │   ├── chart-interactive.tsx  # Interactive charts
│   │   │   ├── chatbot.tsx           # Chat widget
│   │   │   ├── navbar.tsx            # Dashboard navigation
│   │   │   ├── section-cards.tsx     # Dashboard cards
│   │   │   └── sidebar.tsx           # Dashboard sidebar
│   │   ├── chat/         # AI chat interface
│   │   ├── upload/       # File upload with Cloudflare R2
│   │   ├── payment/      # Subscription management
│   │   └── settings/     # User settings & profile management
│   ├── pricing/          # Public pricing page
│   ├── privacy-policy/   # Privacy policy page
│   ├── terms-of-service/ # Terms of service page
│   ├── sign-in/          # Sign in page
│   ├── sign-up/          # Sign up page
│   └── success/          # Success confirmation page
├── components/           # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── homepage/         # Components for the homepage
│   │   ├── hero-section.tsx     # Landing page hero
│   │   ├── footer.tsx           # Footer component
│   │   └── integrations.tsx     # Technology integrations showcase
│   ├── logos/            # Logo components for tech stack
│   ├── provider.tsx      # Application providers
│   └── user-profile.tsx  # User profile component
├── db/                   # Database schema and types
│   └── schema.ts         # TypeScript interfaces for database entities
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── lib/                  # Library functions and utilities
│   ├── auth-client.ts    # Better Auth client configuration
│   ├── auth-utils.ts     # Authentication utility functions
│   ├── auth.ts           # Better Auth server configuration
│   ├── subscription.ts   # Polar.sh subscription utilities
│   ├── upload-image.ts   # Cloudflare R2 upload utilities
│   └── utils.ts          # General utility functions
├── public/               # Static assets
│   └── models/           # 3D models or other assets
└── scripts/              # Build and deployment scripts
```

## 3. Key Features

The starter kit provides a comprehensive set of features for building a modern web application:

### 3.1. Authentication & User Management

-   Better Auth integration with Polar.sh for unified authentication
-   Session management with secure cookie-based authentication
-   User profile management with avatar upload
-   Protected route middleware for dashboard access
-   Organization support for team-based subscriptions

### 3.2. Subscription & Billing

-   Polar.sh integration for subscription management
-   Two-tier pricing (Starter & Professional)
-   Real-time webhook processing
-   Customer portal for self-service billing
-   Subscription status tracking
-   Payment gating for premium features

### 3.3. AI Integration

-   AI-powered chatbot using Google Gemini 2.5 Flash via AI SDK
-   Streaming responses for real-time chat experience  
-   React Markdown rendering for rich formatted responses
-   Multi-step conversation support with message history
-   Integrated chat interface in dashboard
-   Robust error handling and loading states
-   Support for multimodal inputs (text and images)

### 3.4. Modern UI/UX

-   Tailwind CSS for utility-first styling
-   Shadcn UI components for accessible and customizable UI
-   Radix UI primitives for unstyled, accessible components
-   Dark/light theme support
-   Responsive design with mobile-first approach
-   Loading skeletons and optimistic UI updates

### 3.5. Database & Storage

-   Better Auth managed database for user authentication and sessions
-   Cloudflare R2 for scalable image and file storage
-   S3-compatible API for seamless file operations
-   TypeScript interfaces for type-safe database operations
-   Zero egress fees and global CDN distribution

### 3.6. Analytics & Monitoring

-   Vercel Analytics for web analytics and performance monitoring
-   User behavior tracking and insights
-   Custom event monitoring capabilities
-   Performance metrics and optimization insights

### 3.7. File Upload & Management

-   Drag-and-drop file upload interface
-   Progress tracking with visual feedback
-   Support for multiple image formats (PNG, JPG, GIF, WebP)
-   File size validation and error handling
-   Grid-based file gallery with preview functionality
-   Direct file access via public URLs
-   Integrated with user profile picture management

## 4. Data Flow and Interactions

-   **Frontend (Next.js App Router):** Handles routing, UI rendering, and client-side interactions with server-side rendering for optimal performance.
-   **API Routes (`app/api`):** Serve as backend endpoints for handling authentication, AI chat requests, file uploads, and subscription webhooks. These routes interact with external services and manage data flow.
-   **Authentication:** `middleware.ts` protects routes by checking for valid Better Auth sessions. `lib/auth.ts` provides server-side authentication utilities while `lib/auth-client.ts` handles client-side authentication state.
-   **Database:** Better Auth manages user sessions and authentication data internally, with `db/schema.ts` defining TypeScript interfaces for subscription and user data structures.
-   **External Services:**
    -   **Google Gemini 2.5 Flash API:** Integrated via AI SDK for streaming AI chat functionality with multimodal support.
    -   **Cloudflare R2:** S3-compatible storage for file uploads with public access and global CDN distribution.
    -   **Polar.sh:** Manages subscriptions, billing, and user organizations with webhooks for real-time updates.
    -   **Vercel Analytics:** Provides comprehensive analytics for performance monitoring and user insights.

## 5. Dashboard Features

The dashboard provides a comprehensive interface for users with the following sections:

-   **Overview:** Interactive charts and analytics displaying user engagement metrics
-   **Chat Interface:** Full-featured AI chat with Google Gemini integration
-   **File Upload:** Cloudflare R2 integration with drag-and-drop functionality
-   **Settings:** User profile management, organization settings, and billing controls
-   **Payment Management:** Subscription status, billing history, and plan upgrades

This architecture provides a robust and scalable foundation for a modern SaaS application, leveraging serverless technologies, modern authentication, AI capabilities, and a component-based UI approach optimized for performance and user experience.
