export interface Game {
  categories: string[];
  id: string;
  image: string;
  name: string;
  jackpot?: string | number;
}