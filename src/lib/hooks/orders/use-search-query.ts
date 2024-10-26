import { parseAsString, useQueryState } from "nuqs";

export function useSearchQuery({ title }: { title: string }) {
  const [query, setQuery] = useQueryState(
    title,
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  );
  return {
    query,
    setQuery,
  };
}
