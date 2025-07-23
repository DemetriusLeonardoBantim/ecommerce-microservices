import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthService } from "./services/auth.service";

export async function middleware(request: NextRequest) {
  console.log("caiu aqui");
  const authService = new AuthService();
  const user = authService.getUser();
  console.log(user);
  if (authService.isTokenExpired() || !user) {
    const { pathname } = new URL(request.url);

    return NextResponse.redirect(
      new URL(`/login?redirect_to=${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/checkout/:path*", "/my-orders"],
};
