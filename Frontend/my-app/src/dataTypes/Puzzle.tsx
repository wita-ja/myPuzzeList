export default interface Puzzle {
  id: string;
  difficulty: number;
  imagePath: string;
  solution_id: string;
  title: string;
  description: string;
  type: string;
  brand: string;
  material: string[];
  avgScore: number | string;
  userScore: number | string;
  approved: boolean;
}
