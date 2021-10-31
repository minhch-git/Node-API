import nodemailer from "nodemailer";

const adminUser = "minhch.vn@gmail.com";
const adminPassword = "Minh.it.01";
const mailHost = "smtp.gmail.com";
const mailPort = 587;
const senderEmail = "Minh ChCam <minhch.vn@gmail.com>";

/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */
const sendMail = (to, subject, htmlContent) => {
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1d05103e01a9c4",
            pass: "5b057bf965657c"
        }
    });
    let mailOptions = {
        from: senderEmail,
        to: to,
        subject: subject,
        html: htmlContent,
    };
    return transport.sendMail(mailOptions); // promise
};

export default sendMail;


