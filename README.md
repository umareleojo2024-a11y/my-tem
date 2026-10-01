# Nigeria Chat 🇳🇬

> **Owned by Eleojocafe**  
> *Connecting 200 Million Nigerians At Home & in the Diaspora*

---

## 🌟 Overview
**Nigeria Chat** is a modern, full-stack Nigerian social networking and messaging platform engineered for high-performance communication, multimedia sharing, community groups, and local commerce in Nigerian Naira (₦).

---

## 📁 Project Architecture & Folder Structure

```
nigeria-chat/
│
├── frontend/                     # React + Vite Single Page Application
│   ├── public/
│   │   ├── logo/                 # Official Nigeria Chat vector logos
│   │   ├── icons/                # Nigerian flag & status icons
│   │   └── images/               # Default avatars & cover assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/           # Top navigation bar with branding & search
│   │   │   ├── Sidebar/          # Desktop navigation sidebar
│   │   │   ├── BottomNavigation/ # Mobile bottom navigation for Android
│   │   │   ├── Post/             # PostCard & PostCreate with reactions & comments
│   │   │   ├── Comment/          # Threaded comment section
│   │   │   ├── Chat/             # ConversationList & ChatWindow
│   │   │   ├── Message/          # MessageBubble with reply quotes & media player
│   │   │   ├── Profile/          # ProfileHeader with Naija state badge & bio editor
│   │   │   ├── Story/            # StoryTray, StoryViewer with timer, StoryCreate
│   │   │   ├── Notification/     # NotificationItem with activity icons
│   │   │   ├── MediaUpload/      # MediaUploadModal for photos, video, audio
│   │   │   └── Loading/          # Spinners and skeleton loaders
│   │   ├── pages/
│   │   │   ├── Login/            # Nigerian-branded sign-in with 1-click demo
│   │   │   ├── Register/         # Registration with 36 Nigerian states dropdown
│   │   │   ├── Home/             # Feed with Stories, Post Create, and Trending Naija
│   │   │   ├── Profile/          # User profile with posts, media & friends tabs
│   │   │   ├── Chat/             # Real-time Chat with message replies & attachments
│   │   │   ├── Notifications/    # Alerts for likes, comments, and follows
│   │   │   ├── Stories/          # 24-hour status stories grid & viewer
│   │   │   ├── Groups/           # Nigerian community groups (Tech, Food, Real Estate)
│   │   │   ├── Pages/            # Verified Nigerian brand & media pages
│   │   │   ├── Marketplace/      # Nigerian Naira (₦) buy & sell market
│   │   │   ├── Music/            # Afrobeats & Naija sounds streaming player
│   │   │   ├── Videos/           # Comedy skits & video reels
│   │   │   ├── Events/           # Festivals, tech meetups & tickets in Naira
│   │   │   └── Settings/         # Supabase connection status, dark mode & preferences
│   │   ├── services/
│   │   │   ├── supabase.js       # Real Supabase client initialization & live check
│   │   │   ├── auth.js           # Auth sign-up, sign-in, session listener
│   │   │   ├── users.js          # User profiles, search & follow management
│   │   │   ├── posts.js          # Post feeds, reactions, comments
│   │   │   ├── chat.js           # Realtime chat, messaging, subscriptions
│   │   │   ├── media.js          # Storage bucket file upload & public URL resolution
│   │   │   ├── notifications.js  # User notifications & read states
│   │   │   └── storage.js        # Supabase Storage helper
│   │   ├── hooks/
│   │   │   ├── useAuth.jsx       # Global auth session and profile context
│   │   │   ├── useChat.js        # Active conversation, realtime messages & replies
│   │   │   └── usePosts.js       # Post feed lifecycle & optimistic likes
│   │   ├── utils/
│   │   │   ├── constants.js      # 36 Nigerian states + FCT, reaction emojis, buckets
│   │   │   └── formatters.js     # Relative time, Naira (₦) currency formatting
│   │   ├── styles/
│   │   │   ├── index.css         # Responsive mobile-first layout & typography
│   │   │   └── theme.css         # Nigerian green palette & dark mode variables
│   │   ├── App.jsx               # React Router layout & 14 connected routes
│   │   └── main.jsx              # React DOM entry point
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/          # Auth, User, Post, Chat, Media, Notification
│   │   ├── routes/               # API route definitions
│   │   ├── middleware/           # Supabase JWT auth verification & error handler
│   │   ├── services/             # Supabase Admin service role client
│   │   ├── utils/                # Standardized JSON response helpers
│   │   └── server.js             # Express server setup with CORS & logging
│   ├── package.json
│   └── .env.example
│
├── supabase/                     # Supabase Backend Configuration
│   ├── migrations/               # Auto profile creation triggers & realtime tables
│   ├── schema.sql                # Complete schema for 20 tables
│   ├── policies.sql              # Row Level Security (RLS) policies
│   └── storage.sql               # 7 Storage buckets and access policies
│
├── android/                      # Native Capacitor Android Project
│   ├── app/                      # Android application module
│   ├── build.gradle              # Top-level Gradle build file
│   ├── settings.gradle           # Gradle settings
│   └── variables.gradle          # Android SDK versions & dependencies
│
├── README.md
└── .gitignore
```

---

## 🗄️ Supabase Database Architecture

The application includes complete SQL schemas in the `supabase/` folder:

### 1. Database Tables (`supabase/schema.sql`)
1. `profiles`: User identity, state of origin (36 states + FCT), city, bio, online status.
2. `friendships`: Friend connections (pending, accepted, blocked).
3. `follows`: One-way follows for public updates.
4. `posts`: Feed posts with text, location tag, and visibility settings.
5. `post_media`: Associated photos, videos, and audio attachments.
6. `comments`: Threaded comments on posts.
7. `reactions`: Multi-reactions (`like`, `love`, `naija_flag` 🇳🇬, `fire` 🔥, `laugh` 😂, `clap` 👏).
8. `conversations`: Direct message threads and group chats.
9. `conversation_members`: Participants with unread timestamps and roles.
10. `messages`: Real-time chat messages with reply quotes and media.
11. `notifications`: Real-time notifications for social activity.
12. `stories`: 24-hour disappearing multimedia stories.
13. `story_views`: Story viewer tracking.
14. `groups`: Community groups with member counts and categories.
15. `group_members`: Membership tracking with roles.
16. `pages`: Verified public pages.
17. `page_followers`: Page followers.
18. `marketplace_items`: Buy and sell listings priced in Nigerian Naira (₦).
19. `events`: Cultural, tech, and entertainment events with ticket prices.
20. `reports` & `blocks`: Community safety and moderation.

### 2. Storage Buckets (`supabase/storage.sql`)
- `profile-images`
- `cover-images`
- `post-images`
- `post-videos`
- `post-audio`
- `chat-media`
- `story-media`

### 3. Setting Up Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Run `supabase/schema.sql`, then `supabase/policies.sql`, `supabase/storage.sql`, and `supabase/migrations/20261001000000_initial_schema.sql`.
4. Copy your **Project URL** and **anon public key** into `frontend/.env`.

---

## 🚀 Running the Project

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:5000`.

### 3. Android APK / AAB
To build the Android APK:
```bash
# From the root directory:
gradle :app:assembleRelease
# Or for Debug APK:
gradle :app:assembleDebug
```
For Capacitor Android module:
```bash
cd android
./gradlew assembleDebug
# Or for production App Bundle (.aab):
./gradlew bundleRelease
```

---

## 📱 Mobile Responsiveness & Android Integration
- Fully responsive layout adapting from mobile screens (320px) to large desktop monitors.
- Bottom navigation bar on mobile for fast navigation across Feed, Chat, Stories, Marketplace, Alerts, and Profile.
- Connected to Android via Capacitor with hardware-accelerated WebView rendering and Android back-button handling.

---

## 🛡️ License & Ownership
**Nigeria Chat** is owned and developed by **Eleojocafe**.
All rights reserved.
