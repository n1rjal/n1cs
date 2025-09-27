import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { getNotionProperty } from "@/utils/getNotionProperty";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  title: string;
  createdTime: string;
  category: string;
  summary: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Status", status: { equals: "Done" } },
  });

  return response.results
    .map((page) => {
      if (!("properties" in page)) return null;
      const typedPage = page as PageObjectResponse;

      return {
        id: typedPage.id,
        title: (getNotionProperty(typedPage, "Name") as string) || "",
        createdTime: typedPage.created_time,
        category: (getNotionProperty(typedPage, "Category") as string) || "",
        summary: (getNotionProperty(typedPage, "Summary") as string) || "",
      };
    })
    .filter(Boolean) as BlogPost[];
}

export async function getSingleBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    if (!("properties" in page)) return null;
    const typedPage = page as PageObjectResponse;

    return {
      id: typedPage.id,
      title: (getNotionProperty(typedPage, "Name") as string) || "",
      createdTime: typedPage.created_time,
      category: (getNotionProperty(typedPage, "Category") as string) || "",
      summary: (getNotionProperty(typedPage, "Summary") as string) || "",
    };
  } catch (error) {
    console.error("Error retrieving single blog post:", error);
    return null;
  }
}

export interface Project {
  id: string;
  name: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT_DATABASE_ID!,
    filter: { property: "Status", status: { equals: "Done" } },
    sorts: [{ property: "Created time", direction: "descending" }],
  });

  return response.results
    .map((page) => {
      if (!("properties" in page)) return null;
      const typedPage = page as PageObjectResponse;

      const imageUrls = getNotionProperty(typedPage, "Image") as
        | string[]
        | undefined;

      return {
        id: typedPage.id,
        name: (getNotionProperty(typedPage, "Name") as string) || "",
        description:
          (getNotionProperty(typedPage, "Description") as string) || "",
        liveUrl: getNotionProperty(typedPage, "Live URL") as string,
        githubUrl: getNotionProperty(typedPage, "GitHub URL") as string,
        imageUrl: imageUrls?.[0],
      };
    })
    .filter(Boolean) as Project[];
}

export async function getSingleProject(id: string): Promise<Project | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    if (!("properties" in page)) return null;
    const typedPage = page as PageObjectResponse;

    const imageUrls = getNotionProperty(typedPage, "Image") as
      | string[]
      | undefined;

    return {
      id: typedPage.id,
      name: (getNotionProperty(typedPage, "Name") as string) || "",
      description:
        (getNotionProperty(typedPage, "Description") as string) || "",
      liveUrl: getNotionProperty(typedPage, "Live URL") as string,
      githubUrl: getNotionProperty(typedPage, "GitHub URL") as string,
      imageUrl: imageUrls?.[0],
    };
  } catch (error) {
    console.error("Error retrieving single project:", error);
    return null;
  }
}

export interface ReadingListItem {
  id: string;
  title: string;
  url: string;
  date: string;
  description?: string;
}

export async function getReadingListItems(
  startDate?: string,
  endDate?: string,
  query?: string,
): Promise<ReadingListItem[]> {
  const databaseId = "2f9e511d9a074163bd3a813b80fccbbd";
  const filter: any = { and: [] };

  if (startDate)
    filter.and.push({ property: "Created", date: { on_or_after: startDate } });
  if (endDate)
    filter.and.push({ property: "Created", date: { on_or_before: endDate } });
  if (query) filter.and.push({ property: "Name", title: { contains: query } });

  const response = await notion.databases.query({
    database_id: databaseId,
    ...(filter.and.length > 0 && { filter }),
    sorts: [{ property: "Created", direction: "descending" }],
  });

  return response.results
    .map((page) => {
      if (!("properties" in page)) return null;
      const typedPage = page as PageObjectResponse;

      return {
        id: typedPage.id,
        title: (getNotionProperty(typedPage, "Name") as string) || "",
        url: (getNotionProperty(typedPage, "URL") as string) || "",
        date: (getNotionProperty(typedPage, "Created") as string) || "",
        description: getNotionProperty(typedPage, "Description") as string,
      };
    })
    .filter(Boolean) as ReadingListItem[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export async function getPostContent(
  pageId: string,
): Promise<{ content: string; headings: Heading[] }> {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  const headings: Heading[] = [];
  mdblocks.forEach((block) => {
    if (!block.parent) return;
    const text = block.parent.replace(/^#{1,3}\s/, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-*|-*$/g, "");

    if (block.type === "heading_1") headings.push({ id, text, level: 1 });
    else if (block.type === "heading_2") headings.push({ id, text, level: 2 });
    else if (block.type === "heading_3") headings.push({ id, text, level: 3 });
  });

  return { content: mdString.parent, headings };
}
