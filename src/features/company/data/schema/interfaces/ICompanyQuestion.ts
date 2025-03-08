/**
 * Interface représentant une question posée par l'IA lors de la création d'une compagnie.
 */
export interface ICompanyQuestion {
  question: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'file'
    | 'audio'
    | 'single_choice'
    | 'multiple_choice';
  options?: string[];
}
