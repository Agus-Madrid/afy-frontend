import { GenreDto } from "./genre.model";
import { UserDto } from "./user.model";

export interface ArticleDto {
  id?: number;
  title: string;
  content: string;
  summary?: string;
  author?: UserDto;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  cardImageUrl?: string;
  genre?: GenreDto;
}

export interface ArticleQueryParams
  extends Record<string, string | number | boolean | string[] | number[] | boolean[] | null | undefined> {
  page?: number;
  size?: number;
  sort?: string | string[];
  genreId?: number;
}
