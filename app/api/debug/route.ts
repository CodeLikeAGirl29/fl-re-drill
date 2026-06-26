import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase-token")?.value;
  return Response.json({
    hasToken: !!token,
    tokenLength: token?.length ?? 0,
  });
}
