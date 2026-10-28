# 🛒 BazarDor — Daily Market Prices

### A Modern Daily Essential Market Price Tracker

BazarDor is a modern, responsive web application designed to help people in Bangladesh explore the prices of essential daily commodities. Users can browse products, compare price trends, explore categories, and view market-wise pricing information through a clean and user-friendly interface.

> **BazarDor — Essential market prices at a glance.**

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
- [Production Build](#-production-build)
- [Deployment](#-deployment)
- [Price Disclaimer](#-price-disclaimer)
- [Project Links](#-project-links)
- [Project Goals](#-project-goals)

## 📖 About the Project

BazarDor aims to make everyday market-price information easier to access. The application organizes essential commodities into categories and highlights price increases and decreases, helping users understand market price movements more easily.

The project uses Next.js App Router and an external API to retrieve and display commodity information. It is designed with responsive layouts to provide a consistent browsing experience across mobile phones, tablets, and desktop computers.

Authentication is implemented using Better Auth where configured.

## ✨ Features

- 📈 **Price Trend Tracking** — Explore products with increased or decreased prices.
- 🛍️ **Product Catalogue** — Browse essential commodities in a responsive product grid.
- 🗂️ **Category Navigation** — Explore products organized by category.
- ↕️ **Product Sorting** — Sort products by price where supported.
- 🔎 **Product Details** — View product information, units, price summaries, and market-wise prices when available.
- 🔐 **Authentication** — Sign in and register using the configured authentication system.
- 👤 **User Account Features** — Access account-related functionality where implemented.
- 🔔 **Toast Notifications** — Receive feedback for user actions where configured.
- ⏳ **Loading States** — Display loading indicators while content is being retrieved.
- 📱 **Responsive Design** — Support mobile, tablet, and desktop screen sizes.
- 🚫 **Error Handling** — Provide appropriate error and not-found interfaces where implemented.
- 🌐 **API Integration** — Retrieve product and category information from the BazarDor API.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework, routing, and server-side rendering |
| React | Component-based user interfaces |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive layouts |
| Better Auth | Authentication |
| MongoDB | Database integration, where configured |
| REST API | Product and category data |
| React Hot Toast | Notifications, if installed |
| Git | Version control |
| GitHub | Source code hosting |
| Vercel | Deployment and hosting |

## 🗺️ Application Routes

| Route | Description |
|---|---|
| `/` | Homepage and featured content |
| `/product` | Browse all products |
| `/price-up` | View products with increased prices |
| `/price-down` | View products with decreased prices |
| `/category/[categoryId]` | Browse products by category |
| `/products/[productId]` | View individual product details |
| `/sign-in` | Sign in to an account |
| `/sign-up` | Create a new account |

**Note:** The routes above are based on the project structure discussed during development. Verify that each route exists in the current repository before publishing this README.

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
│   │   │
│   │   ├── product/
│   │   │   └── page.jsx
│   │   │
│   │   ├── price-up/
│   │   │   └── page.js
│   │   │
│   │   ├── price-down/
│   │   │   └── page.js
│   │   │
│   │   ├── category/
│   │   │   └── [categoryId]/
│   │   │       └── page.jsx
│   │   │
│   │   ├── products/
│   │   │   └── [productId]/
│   │   │       └── page.jsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   │   └── page.jsx
│   │   │   └── sign-up/
│   │   │       └── page.jsx
│   │   │
│   │   └── api/
│   │       └── auth/
│   │           └── [...all]/
│   │               └── route.js
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

**Important:** This is a representative project structure, not a verified listing of every file. Keep the structure synchronized with the actual files in your repository.

## ⚙️ Getting Started

### Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/) — an LTS version is recommended.
- npm — included with Node.js.
- [Git](https://git-scm.com/) — for version control.

### 1. Clone the Repository

```bash
git clone https://github.com/Atik-Hassan-Abddula/bazar-dor.git
```

### 2. Navigate to the Project Directory

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory of the project.

Add the environment variables required by your application.

Example:

```env
BETTER_AUTH_SECRET=your_secure_secret
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URL=your_database_connection_string
```

**Important:** These are example variable names. Use the exact names required by your current authentication and database configuration. If your project uses additional variables, such as Google OAuth credentials, configure them as well.

### Security Guidelines

- Never commit `.env.local` to a public repository.
- Never expose database connection strings or authentication secrets.
- Configure production environment variables in your hosting provider's settings.
- Keep `.gitignore` configured to exclude sensitive environment files.

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

Open the following URL in your browser:

[http://localhost:3000](http://localhost:3000)

The application will reload as you make changes to the source code.

## 🏗️ Production Build

Check whether the application builds successfully:

```bash
npm run build
```

If the build completes successfully, start the production server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to test the production build locally.

## 🚀 Deployment

BazarDor can be deployed using [Vercel](https://vercel.com/).

### Deployment Steps

1. Push your latest changes to GitHub.
2. Import the repository into Vercel.
3. Configure all required environment variables in the Vercel project settings.
4. Deploy the application.
5. Verify that the production build completes successfully.
6. Test product listings, category navigation, price-trend pages, product details, and authentication.
7. Confirm that API requests and database connections work in production.

### Deploy with the Vercel CLI

Install or run the Vercel CLI:

```bash
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

Make sure you are logged in to the correct Vercel account and have linked the intended project before deploying.

## 📊 Price Disclaimer

Commodity prices may vary depending on the market, location, seller, and date. Prices displayed by BazarDor are provided for informational purposes only.

Users should verify current prices with local markets or sellers before making purchasing decisions. Price trends depend on the accuracy and availability of the underlying data source.

## 🌐 Project Links

- **GitHub Repository:** [BazarDor on GitHub](https://github.com/Atik-Hassan-Abddula/bazar-dor)
- **Live Website:** [Add or verify your production URL](https://bazar-dor-kappa-eight.vercel.app)

> Make sure the live website link points to your current production deployment before publishing the README.

## 🎯 Project Goals

- Make essential commodity prices easier to access.
- Help users understand daily price increases and decreases.
- Organize products into clear and accessible categories.
- Provide a responsive experience across devices.
- Practice modern web development with Next.js, React, APIs, and authentication.
- Build a practical application that can help people make more informed purchasing decisions.

---

<p align="center">
  <strong>🛒 BazarDor</strong>
  <br />
  Daily market prices, made easier to explore.
  <br /><br />
  Built with Next.js and React.
</p>
