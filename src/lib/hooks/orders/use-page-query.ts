import { parseAsString, useQueryState } from "nuqs";

export function usePageQuery() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsString.withOptions({
      clearOnDefault: true,
    }),
  );
  return {
    page,
    setPage,
  };
}
