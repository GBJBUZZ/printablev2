# Printable: Project Setup and Important Links

This document provides a comprehensive guide to setting up and running the "Printable" project, including necessary installations, configurations, and important links.

## 1. Important Links

* **Figma Design:** [PRINTABLE Website - Jay](https://www.figma.com/design/vmdCh1XiwtZQymozR5sUNH/PRINTABLE-Website--Jay-?node-id=0-1&p=f&t=1cnixWxNXhq8KbEZ-0)
* **GitHub Repositories:**
    * Front end for users: [https://github.com/Printable-GBJBUZZ/Front-end_printable-](https://github.com/Printable-GBJBUZZ/Front-end_printable-)
    * Frontend for merchant: [https://github.com/Printable-GBJBUZZ/printable-merchant](https://github.com/Printable-GBJBUZZ/printable-merchant)
    * Backend: [https://github.com/Printable-GBJBUZZ/Backend-Printable](https://github.com/Printable-GBJBUZZ/Backend-Printable)

## 2. Installations and Versions

* **Frontend:**
    * Node.js: 18.18 or later
    * Next.js
* **Docker:** (Required for Stirling APIs)

## 3. Stirling API Setup (using Docker)

To use the Stirling APIs, follow these steps:

1.  Pull the Stirling PDF Docker image:
    ```bash
    docker pull ghcr.io/stirling-tools/stirling-pdf:latest
    ```
2.  Run the Docker container:
    ```bash
    docker run -p 8080:8080 ghcr.io/stirling-tools/stirling-pdf:latest
    ```

## 4. Running the Applications

### 4.1. To Run Frontend (User and Merchant)

1.  **Install GitHub CLI** (or use your preferred Git client).
2.  **Clone the respective frontend repository** to your local machine:
    * For User Frontend: `git clone https://github.com/Printable-GBJBUZZ/Front-end_printable-`
    * For Merchant Frontend: `git clone https://github.com/Printable-GBJBUZZ/printable-merchant`
3.  Navigate into the cloned directory.
4.  Install dependencies:
    ```bash
    npm install
    ```
5.  In the terminal, run the development server:
    ```bash
    npm run dev
    ```

### 4.2. To Run Backend

1.  **Install Deno** on your system.
2.  **Clone the backend repository** to your local machine:
    ```bash
    git clone [https://github.com/Printable-GBJBUZZ/Backend-Printable](https://github.com/Printable-GBJBUZZ/Backend-Printable)
    ```
3.  Navigate into the cloned repository directory:
    ```bash
    cd Backend-Printable
    ```
4.  Install dependencies (if any, though Deno typically manages modules directly):
    ```bash
    npm i
    ```
    *(Note: The original instructions include `npm i`. Verify if this is for specific tooling or if Deno dependencies are managed differently, e.g., via a `deps.ts` file and `deno cache`.)*
5.  Run the backend application:
    ```bash
    deno run --allow-all main.ts
    ```

## 5. Setting Up Environment Variables (.env)

Create a `.env` file in the root directory of each respective project (User Frontend, Merchant Frontend, Backend) and add the following variables as needed.

### 5.1. User Side Frontend (`Front-end_printable-/.env`)

* `DATABASE_URL`: Postgres connection string for Neon DB (including username, password, host, database name, and SSL mode).
* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public (front-end) key for Clerk authentication.
* `CLERK_SECRET_KEY`: Secret (backend) key for Clerk authentication.
* `SIGNING_SECRET`: Webhook signing secret (ensure only one instance is used if it appears multiple times in other contexts).
* `NEXT_PUBLIC_Maps_API_KEY`: Public API key for Google Maps integration on the client side.
* `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Front-end route for Clerk’s sign-in page (e.g., `/signin`).
* `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Front-end route for Clerk’s sign-up page (e.g., `/signup`).
* `NEXT_PUBLIC_BACKEND_ROOT_URL`: Base URL for your backend server (e.g., `http://56.228.48.254:5000`).
* `NEXT_PUBLIC_STIRLING_ROOT_URL`: Base URL for the Stirling service (e.g., `http://localhost:8080`).
* `DOMAIN_BASE_URL`: Public-facing domain of the deployed app (e.g., an Ngrok URL).
* `Pdftoword_API_KEY`: API endpoint or key for PDF-to-Word conversion.
* `Pdfcompress_API_KEY`: API key for PDF compression service.
* `FRONTEND_PRINTABLE_URL`: Base URL for the “Printable” frontend (e.g., `http://51.21.65.25:3000`).

### 5.2. Merchant Side Frontend (`printable-merchant/.env`)

* `NEXT_PUBLIC_Maps_API_KEY`: Public API key for Google Maps integration on the merchant dashboard.
* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Front-end (public) key for Clerk authentication on the merchant side.
* `CLERK_SECRET_KEY`: Secret (backend) key for Clerk authentication.
* `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Merchant dashboard route for Clerk’s sign-in page (e.g., `/sign-in`).
* `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`: URL to redirect to if Clerk sign-in fails or is canceled (e.g., `/`).
* `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`: URL to redirect to if Clerk sign-up fails or is canceled (e.g., `/`).
* `NEXT_PUBLIC_BACKEND_ROOT_URL`: Base URL for the merchant-side backend server (e.g., `http://56.228.48.254:5000`).
* `PUSHER_APP_ID`: Your Pusher application ID for real-time messaging.
* `PUSHER_KEY`: Public key for Pusher (used in the client).
* `PUSHER_SECRET`: Secret key for Pusher (used on the server).
* `PUSHER_CLUSTER`: Pusher cluster region (e.g., `ap2`).

### 5.3. Backend (`Backend-Printable/.env`)

* `AWS_ACCESS_KEY_ID`: Access key ID for AWS (used to authenticate with AWS services).
* `AWS_SECRET_ACCESS_KEY`: Secret access key for AWS (paired with the access key ID).
* `BUCKET_NAME`: Name of the S3 bucket (e.g., `blog-storage-printable`) used for file storage.
* `REGION`: AWS region where the S3 bucket and other resources are located (e.g., `us-east-1`).
* `DATABASE_URL`: Postgres connection string for the Neon DB (including username, password, host, database name, and SSL mode).
* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public (front-end) key for Clerk authentication (exposed to clients).
* `CLERK_SECRET_KEY`: Secret (backend) key for Clerk authentication.
* `SIGNING_SECRET`: Webhook signing secret for verifying inbound requests (e.g., Stripe or other services).
* `PUSHER_APP_ID`: Pusher application ID for real-time messaging services.
* `PUSHER_KEY`: Public key for Pusher (used in client-side initialization).
* `PUSHER_SECRET`: Secret key for Pusher (used on the server to authenticate events).
* `PUSHER_CLUSTER`: Pusher cluster identifier (e.g., `ap2`).
* `GOOGLE_API_BASE_URL`: Base endpoint for Google’s Distance Matrix API (e.g., `https://maps.googleapis.com/maps/api/distancematrix/json`).
* `DISTANCE_MATRIX_GOOGLE_API_KEY`: API key for accessing Google’s Distance Matrix service.
* `RESEND_API`: API key/token for the Resend email-sending service (e.g., `re_BRYvaRZr_6zYuJ2yQ1TXBmBdBsWEENnra`).
