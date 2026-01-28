
export interface CreateArticleDto {
  title: string;
  content: string;
  genreId: number;
  cardImageKey: string | null;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}