import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

interface BlogPost {
  id: string;
  title: string;
  createdTime: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
        equals: "Done",
      },
    },
  });

  return response.results
    .map((page) => {
      if (!("properties" in page)) {
        // Handle partial page objects if necessary, or filter them out
        return null;
      }

      const typedPage = page as PageObjectResponse;

      const titleProperty = typedPage.properties.Name;
      const title =
        titleProperty && titleProperty.type === "title"
          ? titleProperty.title[0]?.plain_text || ""
          : "";

      return {
        id: typedPage.id,
        title,
        createdTime: typedPage.created_time,
      };
    })
    .filter(Boolean) as BlogPost[]; // Filter out nulls and assert type
}

export async function getSingleBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });

    if (!("properties" in page)) {
      return null;
    }

    const typedPage = page as PageObjectResponse;

    const titleProperty = typedPage.properties.Name;
    const title =
      titleProperty && titleProperty.type === "title"
        ? titleProperty.title[0]?.plain_text || ""
        : "";

    return {
      id: typedPage.id,
      title,
      createdTime: typedPage.created_time,
    };
  } catch (error) {
    console.error("Error retrieving single blog post:", error);
    return null;
  }
}

interface Project {
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
    filter: {
      property: "Status",
      status: {
        equals: "Done",
      },
    },
    sorts: [
      {
        property: "Created time",
        direction: "descending",
      },
    ],
  });

  return response.results
    .map((page) => {
      if (!("properties" in page)) {
        return null;
      }

      const typedPage = page as PageObjectResponse;

      const nameProperty = typedPage.properties.Name;
      const name =
        nameProperty && nameProperty.type === "title"
          ? nameProperty.title[0]?.plain_text || ""
          : "";

      const descriptionProperty = typedPage.properties.Description;
      const description =
        descriptionProperty && descriptionProperty.type === "rich_text"
          ? descriptionProperty.rich_text.reduce(
              (a, i) => a + " " + (i.plain_text ?? ""),
              "",
            )
          : "";

      const liveUrlProperty = typedPage.properties["Live URL"];
      const liveUrl =
        liveUrlProperty && liveUrlProperty.type === "url"
          ? liveUrlProperty.url || undefined
          : undefined;

      const githubUrlProperty = typedPage.properties["GitHub URL"];
      const githubUrl =
        githubUrlProperty && githubUrlProperty.type === "url"
          ? githubUrlProperty.url || undefined
          : undefined;

      const imageUrlProperty = typedPage.properties.Image;
      const imageUrl =
        imageUrlProperty && imageUrlProperty.type === "files"
          ? imageUrlProperty.files[0]?.file?.url ||
            imageUrlProperty.files[0]?.external?.url ||
            undefined
          : undefined;

      return {
        id: typedPage.id,
        name,
        description,
        liveUrl,
        githubUrl,
        imageUrl,
      };
    })
    .filter(Boolean) as Project[];
}

interface Heading {
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
    if (block.type === "heading_1" && block.parent) {
      const text = block.parent.replace(/^#\s/, ""); // Remove markdown heading syntax
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-*|-*$/g, ""); // Basic slug generation
      headings.push({ id, text, level: 1 });
    } else if (block.type === "heading_2" && block.parent) {
      const text = block.parent.replace(/^##\s/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-*|-*$/g, "");
      headings.push({ id, text, level: 2 });
    } else if (block.type === "heading_3" && block.parent) {
      const text = block.parent.replace(/^###\s/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-*|-*$/g, "");
      headings.push({ id, text, level: 3 });
    }
  });

  return { content: mdString.parent, headings };
}

export async function getSingleProject(id: string): Promise<Project | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });

    if (!("properties" in page)) {
      return null;
    }

    const typedPage = page as PageObjectResponse;

    const nameProperty = typedPage.properties.Name;
    const name =
      nameProperty && nameProperty.type === "title"
        ? nameProperty.title[0]?.plain_text || ""
        : "";

    const descriptionProperty = typedPage.properties.Description;
    const description =
      descriptionProperty && descriptionProperty.type === "rich_text"
        ? descriptionProperty.rich_text.reduce(
            (a, i) => a + " " + (i.plain_text ?? ""),
            "",
          )
        : "";

    const liveUrlProperty = typedPage.properties["Live URL"];
    const liveUrl =
      liveUrlProperty && liveUrlProperty.type === "url"
        ? liveUrlProperty.url || undefined
        : undefined;

    const githubUrlProperty = typedPage.properties["GitHub URL"];
    const githubUrl =
      githubUrlProperty && githubUrlProperty.type === "url"
        ? githubUrlProperty.url || undefined
        : undefined;

    const imageUrlProperty = typedPage.properties.Image;
    const imageUrl =
      imageUrlProperty && imageUrlProperty.type === "files"
        ? imageUrlProperty.files[0]?.file?.url ||
          imageUrlProperty.files[0]?.external?.url ||
          undefined
        : undefined;

    return {
      id: typedPage.id,
      name,
      description,
      liveUrl,
      githubUrl,
      imageUrl,
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
  const databaseId = "2f9e511d9a074163bd3a813b80fccbbd"; // User provided Notion DB ID
  let filter: any = {};

  if (startDate || endDate) {
    const dateFilterStart: any = { property: "Created", date: {} };
    const dateFilterEnd: any = { property: "Created", date: {} };

    if (startDate) {
      if (!filter.and) filter.and = [];
      dateFilterStart.date.on_or_after = startDate;
      filter.and.push(dateFilterStart);
    }

    if (endDate) {
      if (!filter.and) filter.and = [];
      dateFilterEnd.date.on_or_before = endDate;
      filter.and.push(dateFilterEnd);
    }
  }

  if (query) {
    if (!filter.and) filter.and = [];
    filter.and.push({
      property: "Name",
      title: {
        contains: query,
      },
    });
  }
  console.log(
    JSON.stringify(
      {
        ...(Object.keys(filter).length > 0 && {
          filter: filter,
        }),
      },
      null,
      2,
    ),
  );

  const response = await notion.databases.query({
    database_id: databaseId,
    ...(Object.keys(filter).length > 0 && {
      filter: filter,
    }),
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });

  return response.results
    .map((page) => {
      if (!("properties" in page)) {
        return null;
      }

      const typedPage = page as PageObjectResponse;

      const titleProperty = typedPage.properties.Name;
      const title =
        titleProperty && titleProperty.type === "title"
          ? titleProperty.title[0]?.plain_text || ""
          : "";

      const urlProperty = typedPage.properties.URL;
      const url =
        urlProperty && urlProperty.type === "url" ? urlProperty.url || "" : "";

      const dateProperty = typedPage.properties.Created;
      const date =
        dateProperty && dateProperty.type === "created_time"
          ? dateProperty.created_time || ""
          : "";

      const descriptionProperty = typedPage.properties.Description;
      const description =
        descriptionProperty && descriptionProperty.type === "rich_text"
          ? descriptionProperty.rich_text.reduce(
              (a, i) => a + " " + (i.plain_text ?? ""),
              "",
            )
          : undefined;

      return {
        id: typedPage.id,
        title,
        url,
        date,
        description,
      };
    })
    .filter(Boolean) as ReadingListItem[];
}
