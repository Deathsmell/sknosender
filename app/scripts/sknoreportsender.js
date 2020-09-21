const nodemailer = require('nodemailer')
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const Mailing = {};


/**
 * Initialize default environment
 * */
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    EMAIL_SEND_TO,
    DEFAULT_MESSAGE_SUBJECT,
} = process.env;


const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
);


Mailing.sendEmail = async (message) => {
    await oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });
    const accessToken = await oauth2Client.getAccessToken();
    const smtpTransport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken,
            tls: {
                rejectUnauthorized: false,
            },
        },
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: EMAIL_SEND_TO,
        subject: DEFAULT_MESSAGE_SUBJECT,
        generateTextFromHTML: true,
        html: message,
    }

    try {
        await smtpTransport.sendMail(mailOptions)
    } catch (err) {
        throw 'Cannot send message\n' + err.toString()
    }

}

module.exports = Mailing