import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
} from "nuqs";

export function useTableFilters({ title }: { title: string }) {
  const [query, setQuery] = useQueryState(
    title,
    parseAsArrayOf(parseAsString.withDefault("")).withDefault([]).withOptions({
      clearOnDefault: true,
    }),
  );
  // console.log({ query });
  return {
    query,
    setQuery,
  };
}
