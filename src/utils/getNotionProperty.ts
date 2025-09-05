import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getNotionProperty = (
  typedPage: PageObjectResponse,
  propertyName: keyof PageObjectResponse["properties"],
): string | string[] | undefined => {
  const prop = typedPage.properties[propertyName];
  if (!prop) return;

  switch (prop.type) {
    case "title":
      return prop.title.map((t) => t.plain_text).join(" ") || "";
    case "rich_text":
      return prop.rich_text.map((t) => t.plain_text).join(" ") || "";
    case "number":
      return prop.number !== null ? prop.number.toString() : "";
    case "select":
      return prop.select?.name ?? "";
    case "multi_select":
      return prop.multi_select.map((s) => s.name) || [];
    case "date":
      return prop.date?.start ?? "";
    case "files":
      return (
        prop.files.map((f) =>
          f.type === "external"
            ? f.external.url
            : f.type === "file"
              ? f.file.url
              : "",
        ) || []
      );
    case "checkbox":
      return prop.checkbox ? "true" : "false";
    case "url":
      return prop.url ?? "";
    case "email":
      return prop.email ?? "";
    case "phone_number":
      return prop.phone_number ?? "";
    case "formula":
      switch (prop.formula.type) {
        case "string":
          return prop.formula.string ?? "";
        case "number":
          return prop.formula.number !== null
            ? prop.formula.number.toString()
            : "";
        case "boolean":
          return prop.formula.boolean ? "true" : "false";
        case "date":
          return prop.formula.date?.start ?? "";
        default:
          return "";
      }
    case "relation":
      return prop.relation.map((r) => r.id) || [];
    case "created_time":
      return prop.created_time ?? "";
    case "created_by":
    default:
      return;
  }
};
