import { marked } from "marked";
import articleStyles from "../article.module.css";

export default function MarkdownContent({ content }: { content: string }) {
  if (!content) return null;
  return (
    <div
      className={articleStyles.markdown}
      dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
    />
  );
}
