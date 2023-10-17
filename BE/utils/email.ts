import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { google } from "googleapis";

const G_ID: string =
  "403139932252-k0ksvgd56ohc39lsckt5bt3oquahgnvb.apps.googleusercontent.com";
const G_SECRET: string = "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";
const G_REFRESH: string =
  "1//04bsN5npSCiQqCgYIARAAGAQSNwF-L9Irifs6Ypy-8tdvnhCU0OPHZDjC8st6x82OOKEzVryQnYpRCh6rzl-4DLsGrrkA7var9dI";
const G_URL: string = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });

const url: string = `http://localhost:5173`;

export const sendMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "cfoonyemmemme@gmail.com",
        clientId: G_ID,
        clientSecret: G_SECRET,
        refreshToken: G_REFRESH,
        accessToken,
      },
    });

    const token = jwt.sign({ id: user._id }, "token");

    let myURL: string = `${url}/${token}/verify`;

    const mailerOption = {
      from: "mail to verify <cfoonyemmemme@gmail.com>",
      to: "cfoonyemmemme@gmail.com",
      subject: "verify",
      html: `<p>send an email 
      <br />
      <br />
      use this link to verify your account:
      <br />
      <br />
      <a href="${myURL}">Click here</a>
      <p/>`,
    };

    transport.sendMail(mailerOption);
  } catch (error: any) {
    console.log(error);
  }
};
