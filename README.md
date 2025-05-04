# Better Studio Logs

A modern log viewer application built with Next.js that provides an intuitive interface for viewing, filtering, and searching through logs.

## Features

- View logs in a paginated table format
- Filter logs by:
  - Log level (TRACE, DEBUG, INFO, WARN, ERROR)
  - Date range
  - Search through message, trace, or author ID
- Sort logs by any column
- View detailed log information in a modal
- Copy log details to clipboard
- Responsive design with dark mode support

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Viewing Logs**

   - Logs are displayed in a table format with columns for timestamp, level, message, trace, and author ID
   - Click on any log entry to view its full details in a modal
   - Use the pagination controls at the bottom to navigate through logs

2. **Filtering Logs**

   - Use the level dropdown to filter by log severity
   - Enter search terms to filter by message content, trace, or author ID
   - Select date ranges using the calendar pickers to filter by timestamp

3. **Sorting**

   - Click on any column header to sort by that column
   - Click again to toggle between ascending and descending order

4. **Viewing Details**
   - Click on any log entry to open a detailed view
   - Use the copy button to copy the log details to your clipboard

## Technical Details

This project uses:

- [Next.js](https://nextjs.org) for the framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [date-fns](https://date-fns.org) for date formatting
- [Geist](https://vercel.com/font) as the primary font

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
