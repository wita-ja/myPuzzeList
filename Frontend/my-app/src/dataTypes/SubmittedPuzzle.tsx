export default interface Puzzle {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  type: string;
  brand: string;
  imagePath: string;
  materials: string[];
  approved: boolean;
  rejected: boolean;
}
