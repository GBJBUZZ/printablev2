import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/esign/document(.*)",
  "/docs_management(.*)",
  "/print-and-deliver(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip authentication for PDF compression
  if (req.url.includes('/api/pdfcompress')) {
    return;
  }
  
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
