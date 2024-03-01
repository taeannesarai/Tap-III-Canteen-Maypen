import ejs from 'ejs';
import nodemailer from "nodemailer";
import { htmlToText } from 'html-to-text';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Email {
    #templateURL = path.join(__dirname, '../views/emails/');

    constructor(user) {
        this.to = user.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.from = `[TAP III Lunch System User] <${process.env.EMAIL_FROM}>`;
    }

    // CONFIGURE NODE MAILER 
    createMailTransport() {
        // reference to credential for sending emails
		if (process.env.NODE_ENV != 'production') {
			return nodemailer.createTransport({
				host: 'sandbox.smtp.mailtrap.io',
				port: 2525,
				auth: {
					user: process.env.MAILTRAP_USER,
					pass: process.env.MAILTRAP_PASS,
				},
			});
		} else {
            // USE VALID MAIL SERVER LIKE GMAIL
            return nodemailer.createTransport({
                host: 'mail.somedomain.com', //AN ACTUAL MAIL SERVER
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            });
        }
    }

    async sendMail(template, subject, user) {
        
        const transport = this.createMailTransport();

        const html = await ejs.renderFile(this.#templateURL + template + '.ejs', {
            subject: subject,
            logo: `${process.env.BASE_URL}/public/assets/logo.png`,
            user_f_name: this.first_name,
            user_l_name: this.last_name,
            user_trn: this.trn,
            user_location: this.location,
            ...user,
            
        });

        return await transport.sendMail({
            to: `${this.to}, ${process.env.COPY_EMAIL}`,
            from: this.from,
            subject: subject,
            html: html,
            text: htmlToText(html),
        });
    }
}