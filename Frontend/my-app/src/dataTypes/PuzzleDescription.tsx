import { PuzzleSolutionStep } from './PuzzleSolutionStep';

export default interface PuzzleDescription {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  type: string;
  brand: string;
  material: string[];
  imagePath: string[];
  avgScore: number | string;
  solutionSteps: PuzzleSolutionStep[];
  solutionCost: number;
}
