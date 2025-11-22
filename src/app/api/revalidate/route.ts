import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// This is a private API route, secured by a secret token.
export async function GET(request: NextRequest) {
  // 1. Check for the secret token
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Get the path to revalidate
  const path = request.nextUrl.searchParams.get("path");

  // 3. If a path is provided, revalidate it
  if (path) {
    // Using revalidatePath instead of revalidateTag for broader compatibility
    // as we haven't implemented tagging in the Notion fetch functions yet.
    
    // For dynamic routes like /blogs/[id], we use 'page' type to revalidate all instances
    if (path.includes("[id]")) {
      revalidatePath(path, "page");
      console.log(`Revalidated all pages matching: ${path}`);
    } else {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }
    
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  }

  // 4. If no path is provided, return an error
  return NextResponse.json(
    {
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    },
    { status: 400 },
  );
}
