import nodemailer from 'nodemailer';
import { config } from '@config/env';

/**
 * Service pour l'envoi d'e-mails.
 */
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            secure: config.mail.secure, // true pour TLS, false pour STARTTLS
            auth: {
                user: config.mail.user,
                pass: config.mail.password,
            },
        });
    }

    /**
     * Envoie un e-mail de réinitialisation de mot de passe.
     * @param email - Adresse e-mail du destinataire.
     * @param token - Token de réinitialisation.
     */
    async sendResetPasswordEmail(email: string, token: string): Promise<void> {
        const resetLink = `${config.server.baseUrl}/auth/reset-password?token=${token}`;

        const mailOptions = {
            from: `"${config.mail.senderName}" <${config.mail.user}>`,
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            html: this.getResetPasswordTemplate(resetLink),
        };

        await this.transporter.sendMail(mailOptions);
    }

    /**
     * Envoie un e-mail de vérification d'adresse e-mail.
     * @param email - Adresse e-mail du destinataire.
     * @param token - Token de validation.
     */
    async sendVerificationEmail(email: string, token: string): Promise<void> {
        const verifyLink = `${config.server.baseUrl}/auth/verify-email?token=${token}`;

        const mailOptions = {
            from: `"${config.mail.senderName}" <${config.mail.user}>`,
            to: email,
            subject: 'Vérification de votre adresse e-mail',
            html: this.getVerificationEmailTemplate(verifyLink),
        };

        await this.transporter.sendMail(mailOptions);
    }

    /**
     * Génère le template HTML pour l'e-mail de réinitialisation de mot de passe.
     * @param resetLink - Lien de réinitialisation.
     * @returns Le HTML de l'e-mail.
     */
    private getResetPasswordTemplate(resetLink: string): string {
        return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #007bff;">🔒 Réinitialisation de votre mot de passe</h2>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Réinitialiser mon mot de passe
        </a>
        <p>Si vous n'avez pas fait cette demande, ignorez cet e-mail.</p>
      </div>
    `;
    }

    /**
     * Génère le template HTML pour l'e-mail de vérification d'adresse e-mail.
     * @param verifyLink - Lien de vérification.
     * @returns Le HTML de l'e-mail.
     */
    private getVerificationEmailTemplate(verifyLink: string): string {
        return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #28a745;">✅ Vérification de votre adresse e-mail</h2>
        <p>Merci de vous être inscrit ! Veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
        <a href="${verifyLink}" 
           style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">
          Vérifier mon e-mail
        </a>
        <p>Si vous n'avez pas créé de compte, ignorez cet e-mail.</p>
      </div>
    `;
    }
}
