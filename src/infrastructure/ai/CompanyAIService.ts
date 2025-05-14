import OpenAI from 'openai';
import { ICompanyQuestion } from '@features/company/data/schema/interfaces/ICompanyQuestion';
import { config } from '@config/env';

/**
 * @file Contient des fonctions utilitaires pour la génération de questions dynamiques
 *       lors de l'enregistrement d'une entreprise avec l'IA.
 */

const openai = new OpenAI({ apiKey: config.openai.key });

/**
 * Service permettant de générer dynamiquement des questions pour la création d'une compagnie.
 */
export class CompanyAIService {
    static async generateQuestions(category: string): Promise<ICompanyQuestion[]> {
        const prompt = `Donne-moi 5 questions essentielles pour enregistrer une entreprise du type "${category}".
    Format JSON: [{question: "...", type: "text" | "email" | "password"| "number" | "file" | "audio" | "single_choice" | "multiple_choice", options: ["..."] }]`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'system', content: prompt }],
        });

        return JSON.parse(response.choices[0].message?.content || '[]');
    }
}

type QuestionType = {
    question: string;
    type: string;
    options?: string[];
};

/**
 * Définit les questions en fonction du type d'entreprise.
 */
const questions: Record<string, QuestionType[]> = {
    restaurant: [
        { question: 'Quel est le nom de votre restaurant ?', type: 'text' },
        {
            question: 'Quels types de plats proposez-vous ?',
            type: 'multi-choice',
            options: ['Français', 'Italien', 'Asiatique', 'Autres'],
        },
        { question: "Quels sont vos horaires d'ouverture ?", type: 'text' },
    ],
    hotel: [
        { question: 'Combien de chambres votre hôtel possède-t-il ?', type: 'number' },
        {
            question: 'Quels services proposez-vous ?',
            type: 'multi-choice',
            options: ['WiFi', 'Piscine', 'Parking', 'Petit-déjeuner'],
        },
    ],
};

/**
 * Génère une liste de questions adaptées au type d'entreprise sélectionné.
 * @param {string} type - Type de l'entreprise (ex: "restaurant", "hotel").
 * @returns {QuestionType[]} La liste des questions à poser.
 */
export function generateCompanyQuestions(type: string): QuestionType[] {
    return (questions[type] || []).map((q) => ({
        ...q,
        options: 'options' in q ? [...(q.options ?? [])] : undefined, // ✅ Vérifie si `options` existe
    }));
}
