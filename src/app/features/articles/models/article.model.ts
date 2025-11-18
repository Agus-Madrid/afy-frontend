export interface ArticleDto {
  id?: number;
  title: string;
  content: string;
  summary?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleQueryParams
  extends Record<string, string | number | boolean | string[] | number[] | boolean[] | null | undefined> {
  page?: number;
  size?: number;
  sort?: string | string[];
  genreId?: number;
}
