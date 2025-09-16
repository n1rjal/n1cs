import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blockId = searchParams.get("blockId");

  if (!blockId) {
    return new NextResponse("Missing blockId", { status: 400 });
  }

  try {
    const block = await notion.blocks.retrieve({ block_id: blockId });

    if ((block as any).type !== "image") {
      return new NextResponse("Block is not an image", { status: 400 });
    }

    const imageBlock = block as ImageBlockObjectResponse;
    const imageUrl =
      imageBlock.image.type === "external"
        ? imageBlock.image.external.url
        : imageBlock.image.file.url;

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image from Notion", {
        status: imageResponse.status,
      });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type");

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType || "image/png",
        "Cache-Control": "public, max-age=3540, s-maxage=3540", // Cache for 59 minutes
      },
    });
  } catch (error) {
    console.error(`Error retrieving image for blockId: ${blockId}`, error);
    return new NextResponse("Error retrieving image", { status: 500 });
  }
}
