import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import chalk from "chalk";

export async function GET(req: NextRequest) {
  const headersList = await headers();
  const authorization = headersList.get("authorization");

  const searchParams = req.nextUrl.searchParams;
  const tag = searchParams.get("tag");

  if (authorization != process.env?.NEXTKEY)
    return NextResponse.json({ revalidate: false }, { status: 401 });

  if (tag) revalidateTag(tag);
  else return NextResponse.json({ revalidate: false }, { status: 418 });

  console.log(
    chalk.green(
      `- Revalidated tag: ${chalk.cyan(`"${tag}"`)} on ${new Date(
        Date.now()
      ).toString()}.`
    )
  );

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
