# Installation Instructions - Supplement Store

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation Steps

1. **Install dependencies:**

```bash
npm install
```

or

```bash
yarn install
```

2. **Run the development server:**

```bash
npm run dev
```

or

```bash
yarn dev
```

3. **Open in browser:**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js pages and routes
- `/components` - Reusable components
- `/lib` - Utilities, types and dummy data
- `/components/ui` - shadcn/ui components

## Implemented Features

### Storefront
- ✅ Homepage with best-selling products carousel
- ✅ FAQ section with expandable questions
- ✅ Products page with filters, search and sorting
- ✅ Product details page
- ✅ Shopping cart
- ✅ Checkout page

### Provider Portal
- ✅ Orders page with pagination
- ✅ Order search and filters
- ✅ Order details page
- ✅ Order status change

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Zustand (state management)
- Radix UI (base components)

## Notes

- All data is dummy (no backend)
- Cart and orders do not persist between page refreshes
- Images use Unsplash URLs as placeholders

