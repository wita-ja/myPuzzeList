export default interface PuzzleSubmitDto {
  title: string;
  description: string | undefined;
  difficulty: string;
  type: string;
  brand: string;
  imagePath: string[];
  materials: string[];
}
