# Tutul Portfolio

A polished developer portfolio built with Next.js, TypeScript, Prisma, PostgreSQL, Cloudinary and Tailwind CSS.

Live site: https://tutul-portfolio.vercel.app/

## Overview

This repository contains a full-stack portfolio application with:

- public portfolio pages for projects, experience, skills, education and certifications
- an admin panel for managing content and messages
- image uploads via Cloudinary
- authentication for admin access
- Prisma-powered PostgreSQL data management

## Technologies

- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- Cloudinary

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a local environment file

```bash
copy .env.example .env
```

3. Populate `.env` with required values

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

4. Generate Prisma client

```bash
npm run prisma generate
```

5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).


## Notes

- Keep `.env` out of version control.
- `.gitignore` is configured to ignore local build output, environment files, Vercel metadata, and dependencies.

## License

This project is released under the MIT License. See [LICENSE](./LICENSE) for details.
