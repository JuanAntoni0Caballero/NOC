import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

export interface Attachment {
    filename: string;
    path: string;
}

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() { }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options
        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del sistema'
        const htmlBody = `<h1>Logs del sistema</h1>`
        const attachments: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            }
        ]
        this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
        return true
    }


}