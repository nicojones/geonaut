# Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Local setup

1. **Start Docker and ensure the database container is running**
   
   Navigate to the `geonaut-web` directory and start the Docker containers:
   ```bash
   cd ../geonaut-web
   docker-compose up -d db
   ```
   
   This will start the MySQL database container. Verify it's running with:
   ```bash
   docker-compose ps
   ```

2. **Configure database credentials**
   
   Ensure your environment variables (`.env` file) match the Docker database configuration:
   - `DB_HOST=localhost` (or `127.0.0.1`)
   - `DB_PORT=....`
   - `DB_NAME=....`
   - `DB_USER=....`
   - `DB_PASS=....`
   
   These credentials should correspond to the database container settings in `geonaut-web/docker-compose.yml`.

3. **Start the Next.js development server**
   
   From the `travel` directory, run:
   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Processing Selfie Uploads

If you also want to run the processing for uploading selfies, you need to start the `web` Docker container as well:

```bash
cd ../geonaut-web
docker-compose up -d web
```

This will start the PHP web container that handles selfie upload processing. The web service will be available at [http://localhost:8080](http://localhost:8080).


# Architecture

The application is built with **Next.js** and connects directly to a MySQL database on the server side using the `mysql2` package. Most of the application logic runs entirely within Next.js without requiring PHP.

## Next.js-First Architecture

- **Public/unauthenticated features**: All public-facing functionality (browsing selfies, viewing user profiles, search, etc.) operates entirely within Next.js without touching PHP.
- **Authenticated features**: Many authenticated features, including user login, are also handled directly in Next.js using server-side database queries.
- **Database access**: Next.js server components and API routes use `mysql2` to execute queries directly against the MySQL database.

### PHP Integration

PHP is currently used for specific server-side operations which have not (or will not) be migrated:

- **Image processing**: Upload, resize, rotation, format conversion, and color extraction from images
- **GPS metadata extraction**: Reading and processing EXIF data from uploaded images
- **Distance calculations**: Geographic distance computations for location-based features
- **Legacy API endpoints**: Some existing API endpoints for actions like likes, comments, and notifications (unsure)

The PHP backend (`geonaut-web`) serves as a complementary service for these specialized operations, while the primary application logic and user interface are handled by Next.js.
