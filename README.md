# 🛒 BazarDor — বাজার দর

### Daily Essential Market Price Tracker

BazarDor is a modern and responsive web application designed to help people in Bangladesh explore the prices of essential daily commodities. Users can browse products, compare price trends, explore categories, and view market-wise pricing information through a clean and user-friendly interface.

> **বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Application Routes](#-application-routes)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Run Locally](#-run-locally)
- [Deployment](#-deployment)
- [Price Disclaimer](#-price-disclaimer)
- [Project Links](#-project-links)

## 📖 About the Project

BazarDor aims to make everyday market-price information easier to access. The application organizes essential commodities into categories and highlights price increases and decreases so users can understand price movements more easily.

The project uses Next.js App Router and a product API to organize and display commodity information. Authentication features are handled through Better Auth where configured.

## ✨ Features

- 📈 **Price Trend Tracking** — View products with increased or decreased prices.
- 🛍️ **Product Catalogue** — Browse essential commodities in a responsive grid.
- 🗂️ **Category Navigation** — Explore products by category.
- ↕️ **Price Sorting** — Sort products by price where supported.
- 🔎 **Product Details** — View product information, units, price summaries, and market-wise prices when available.
- 🔐 **Authentication** — Sign-in and registration using configured authentication providers.
- 👤 **Profile Management** — Manage account information where implemented.
- 🔔 **Toast Notifications** — Display feedback for user actions where configured.
- ⏳ **Loading States** — Improve the browsing experience with loading indicators.
- 📱 **Responsive Design** — Support mobile, tablet, and desktop screens.
- 🚫 **Error Handling** — Provide appropriate not-found and error interfaces.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and routing |
| React | User interface |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive layouts |
| Better Auth | Authentication |
| MongoDB | Database, if configured |
| React Hot Toast | Notifications, if installed |
| Vercel | Deployment |

## 🗺️ Application Routes

| Route | File Name | Description |
|---|---|---|
| `/` | `src/app/page.js` | Homepage and product catalogue |
| `/price-up` | `src/app/price-up/page.js` | Products with increased prices |
| `/price-down` | `src/app/price-down/page.js` | Products with decreased prices |
| `/category/[slug]` | `src/app/category/[slug]/page.js` | Category-specific products |
| `/product/[slug]` | `src/app/product/[slug]/page.js` | Product details |
| `/signin` | `src/app/signin/page.js` | User sign-in |
| `/signup` | `src/app/signup/page.js` | User registration |
| `/profile` | `src/app/profile/page.js` | User profile management |

*Only include routes that exist in the actual project. Dynamic routes use square brackets in their folder names.*

## 📁 Project Structure

```text
bazar-dor/
├── public/
│   ├── logo-icon.png
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── globals.css
│   │   ├── loading.js
│   │   ├── not-found.js
│   │   │
│   │   ├── price-up/
│   │   │   └── page.js
│   │   │
│   │   ├── price-down/
│   │   │   └── page.js
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.js
│   │   │
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.js
│   │   │
│   │   ├── signin/
│   │   │   └── page.js
│   │   │
│   │   ├── signup/
│   │   │   └── page.js
│   │   │
│   │   └── profile/
│   │       └── page.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── Groceries.jsx
│   │   ├── PriceUp.jsx
│   │   ├── PriceDown.jsx
│   │   ├── ProductCard.jsx
│   │   └── Footer.jsx
│   │
│   └── lib/
│       └── auth.js
│
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
├── next.config.js
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

**Important:** This is an example structure, not a verified listing of every file in your repository. Keep only the folders and files that actually exist in your project.

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS version recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Atik-Hassan-Abddula/bazar-dor.git
```

### 2. Navigate to the project

```bash
cd bazar-dor
```

### 3. Install dependencies

```bash
npm install
```

## 🔑 Environment Variables

Create a `.env.local` file in the project root and configure the environment variables required by your application.

Example:

```env
BETTER_AUTH_SECRET=your_secure_secret
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URL=your_database_connection_string
```

Use the exact variable names expected by your application's authentication and database configuration. Add OAuth credentials if Google or GitHub sign-in is configured.

**Security:** Never commit `.env.local`, database connection strings, authentication secrets, or OAuth client secrets to GitHub.

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 🚀 Deployment

BazarDor can be deployed on [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in the Vercel project settings.
4. Deploy the application.
5. Test the deployed routes, API requests, and authentication flows.

## 📊 Price Disclaimer

Commodity prices can change depending on market, location, seller, and date. Prices displayed by BazarDor should be treated as informational and verified locally before making purchasing decisions.

## 🌐 Project Links

- **GitHub Repository:** [BazarDor on GitHub](https://github.com/Atik-Hassan-Abddula/bazar-dor)
- **Live Website:** Add your final deployed Vercel URL here.

## 📝 Project Goals

- Make essential commodity prices easier to explore.
- Present price changes in a clear and accessible format.
- Improve the user experience through responsive design.
- Practice modern web development using Next.js, React, APIs, and authentication.

---

<p align="center">
  <strong>🛒 BazarDor — বাজার দর</strong>
  <br />
  Essential market prices, made easier to explore.
</p>
