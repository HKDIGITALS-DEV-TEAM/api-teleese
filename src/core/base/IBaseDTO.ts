/**
 * Interface générique pour les DTOs.
 */
export interface IBaseDTO {
    /**
     * Identifiant unique de l'entité.
     */
    id?: string;

    /**
     * Date de création de l'entité.
     */
    createdAt?: Date;

    /**
     * Date de dernière mise à jour de l'entité.
     */
    updatedAt?: Date;
}
