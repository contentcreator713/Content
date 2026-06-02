export type Platform = "tiktok" | "youtube";
export type ContentType = "script" | "hook" | "description" | "title";

export interface Template {
  id: string;
  name: string;
  platform: Platform | "both";
  contentType: ContentType;
  category: string;
  description: string;
  fields: TemplateField[];
  output: (values: Record<string, string>) => string;
}

export interface TemplateField {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea" | "select";
  options?: string[];
}

export interface GenerateRequest {
  platform: Platform;
  contentType: ContentType;
  topic: string;
  tone: string;
  targetAudience: string;
  duration?: string;
  keywords?: string;
  extraContext?: string;
}

export interface GenerateResponse {
  content: string;
  error?: string;
}
