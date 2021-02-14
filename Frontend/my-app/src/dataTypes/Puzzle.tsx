//TODO after making api check if it's still needed
export default interface Puzzle {
  id: string;
  difficulty: number;
  difficultyName: string;
  imagePath: string;
  //difficultyId: uuidv4(),
  //puzzleImages_id: uuidv4(),
  solution_id: string;
  title: string;
  description: string;
  type: string;
  brand: string;
  material: string[];
  avgScore: number | null;
  userScore: string | number | null;
  approved: boolean;
}
