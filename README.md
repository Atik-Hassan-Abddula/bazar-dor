# 🛒 বাজার দর | BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a responsive price-tracking web application that helps users explore daily prices of essential grocery products across different markets in Bangladesh. Users can compare prices, track price changes, browse categories, and view market-wise product details.

## 🌟 Key Features

### 1. 🏠 Home Page & Product Listings
- Responsive navbar with logo, Bangla date, category navigation, and authentication buttons.
- Live-style scrolling price ticker showing product names, prices, and percentage changes.
- Hero banner with a call-to-action that scrolls to the All Products section.
- Dedicated sections for the top 6 products with increasing and decreasing prices.
- Responsive product grid with product names, emojis, units, prices, and price-change badges.

### 2. 📊 Product Details & Market Comparison
- Protected product detail pages at `/product/[slug]`.
- Minimum, maximum, and average price summaries.
- Market-wise price comparisons for individual products.
- Product category, unit, description, and current price information.

### 3. 🗂️ Category Browsing & Sorting
- Dedicated category pages with category icons and titles.
- Sort products by default order, lowest price, or highest price.
- Numeric sorting that correctly handles Bengali numerals.
- Loading skeletons and user-friendly empty states.
- Custom 404 pages with a link back to the home page.

### 4. 🔐 Authentication & Profile Management
- Email and password authentication using Better Auth.
- Google and GitHub social login.
- Sign-up, sign-in, sign-out, and protected routes.
- Toast notifications for successful actions and errors.
- Profile page with an option to update user information.

### 5. 📱 Responsive UI & User Experience
- Mobile-first layouts for phones, tablets, and desktops.
- Responsive navigation, product cards, hero banner, and footer.
- Loading skeletons while product data is fetched.
- Friendly error messages and invalid-route handling.
- Consistent styling with Tailwind CSS and DaisyUI.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Component-based user interface |
| JavaScript / TypeScript | Application logic |
| Tailwind CSS | Responsive styling |
| DaisyUI | UI components |
| Better Auth | Authentication and user management |
| MongoDB | User data storage, if configured |
| React Hot Toast | Toast notifications |
| Vercel | Deployment and hosting |
| News / Product API | Fetching application data |

> Update this list to match the packages and services actually used in your project.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- Git
- A code editor such as Visual Studio Code

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by your implementation.

Example:

```env
MONGO_DB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Configure the Google and GitHub OAuth callback URLs in their respective developer consoles. Make sure the environment variable names match your Better Auth configuration.

**Security:** Never commit `.env.local`, database credentials, OAuth secrets, or authentication secrets to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
```

If the build completes successfully, start the production server with:

```bash
npm start
```

## 📁 Main Routes

| Route | Description |
|---|---|
| `/` | Home page and product listings |
| `/category/[slug]` | Products filtered by category |
| `/product/[slug]` | Product details and market prices |
| `/signin` | User login |
| `/signup` | User registration |
| `/profile` | User profile |
| `/profile/update` | Update user information |
| `/not-found` | Optional custom not-found route |

The actual route paths should match your implementation. Next.js also supports a global `not-found.jsx` file for displaying a custom 404 page.

## 📦 Deployment

This project can be deployed on [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure all required environment variables in the Vercel project settings.
4. Configure production OAuth callback URLs.
5. Deploy the project.
6. Test page refreshes, authentication, dynamic product routes, and category routes on the deployed website.

## 📌 Important Notes

- Product prices are indicative and may change depending on market conditions.
- Product data depends on the configured API.
- Protected pages must verify the user's authenticated session on the server.
- Google and GitHub login require valid OAuth credentials.
- Dynamic routes should handle invalid slugs gracefully.
- Keep secrets in environment variables, not in source code.

## 👨‍💻 Project Information

**Project Name:** বাজার দর (BazarDor)

**Purpose:** Make essential product prices easier to explore and compare.

**Developer:** [Your Name]

**Live Link:** [Add Your Deployed Website URL]

**GitHub Repository:** [Add Your GitHub Repository URL]

---

### বাংলা সংক্ষিপ্ত পরিচিতি

বাজার দর একটি responsive web application, যার মাধ্যমে বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম, বাজারভিত্তিক মূল্য, দাম বৃদ্ধি ও হ্রাস এবং বিভিন্ন পণ্যের category সহজেই দেখা যায়। ব্যবহারকারীরা authentication-এর মাধ্যমে লগইন করে পণ্যের বিস্তারিত তথ্য দেখতে এবং নিজের profile update করতে পারেন।

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
