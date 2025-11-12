import { GenreType } from "../enum/genre-type.enum";

export interface GenreDto {
  id: number;
  name: string;
  description?: string;
  urlImage: string;
  genreType: GenreType;
}