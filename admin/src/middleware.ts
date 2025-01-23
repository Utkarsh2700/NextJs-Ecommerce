// // import { auth } from "@/app/api/auth/[...nextauth]/options";
// // import { NextRequest } from "next/server";

// // export default function middleware(requsest:NextRequest){

// // }

// // export default auth((req) => {
// //   if (!req.auth && req.nextUrl.pathname !== "/login") {
// //     const newUrl = new URL("/login", req.nextUrl.origin);
// //     return Response.redirect(newUrl);
// //   }
// // });

// // export const config = {
// //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // };

// // export { auth as middleware } from "@/app/api/auth/[...nextauth]/options";

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { adminEmails, auth } from "./app/api/auth/[...nextauth]/options";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   // console.log(se)
//   if (adminEmails.includes(session?.user.email)) {
//     throw "not an admin";
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// // export { auth as middleware } from "@/app/api/auth/[...nextauth]/options";

// import { auth } from "./app/api/auth/[...nextauth]/options";
// export default auth((req) => {
//   // req.auth
//   // console.log({req.auth})
// });

// // Optionally, don't invoke Middleware on some paths
// // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// export { auth as middleware } from "./app/api/auth/[...nextauth]/options";

// import { NextRequest, NextResponse } from "next/server";
// import { adminEmails, auth } from "./app/api/auth/[...nextauth]/options";

// export default async function middleware(req: NextRequest) {
//   const session = await auth(req);
//   if (!session || !session.user || !adminEmails.includes(session.user.email)) {
//     return NextResponse.json(
//       { error: "Forbidden: You do not have access to this resource." },
//       { status: 403 }
//     );
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/categories", "/api/products", "/api/uploads"],
// };

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { adminEmails } from "./app/api/auth/[...nextauth]/options";

export const adminEmails = ["meutkarshsharma@gmail.com"];

export default async function middleware(req: NextRequest) {
  // Extract the token from cookies using getToken
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log({ token });

  // Check if the token exists and the user is authorized
  if (!token || !token.email || !adminEmails.includes(token.email)) {
    throw { message: "not an admin" };
    // throw { message: "not an admin", name: "Authrization Erorr" };
    // return NextResponse.json(
    //   { error: "Forbidden: You do not have access to this resource." },
    //   { status: 403 }
    // );
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware only to specific API routes
export const config = {
  matcher: "/api/:path",
  runtime: "nodejs",
};
