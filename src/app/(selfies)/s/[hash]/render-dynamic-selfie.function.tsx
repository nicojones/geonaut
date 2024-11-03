import { SelfieCardLoader } from "@/components";

const regex = /(?:https:\/\/travel\.kupfer\.es)?\/s\/([a-zA-Z0-9]+)/g;

export const renderDynamicSelfie = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  text.replace(regex, (match: string, hash: string, offset: number) => {
    parts.push(<span className="quill-part" key={lastIndex} dangerouslySetInnerHTML={{ __html: text.substring(lastIndex, offset) }} />);
    parts.push(<SelfieCardLoader key={offset} hash={hash} />);
    lastIndex = offset + match.length;
    return match;
  });

  parts.push(<span key={lastIndex} dangerouslySetInnerHTML={{ __html: text.substring(lastIndex) }} />);

  return parts;
};
