import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ime, prezime, email, telefon, napomena, stavke, ukupno } = body;

    // Inicijalizuj Mailjet klijent
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_SECRET_KEY!
    );

    const stavkeHTML = stavke
      .map(
        (stavka: any) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${stavka.naslov}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${stavka.autor}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${stavka.kolicina}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${stavka.cena.toLocaleString("sr-RS")} RSD</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${(stavka.cena * stavka.kolicina).toLocaleString("sr-RS")} RSD</td>
        </tr>
      `
      )
      .join("");

    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff5722; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #ff5722; color: white; padding: 12px; text-align: left; }
            .total { font-size: 24px; color: #ff5722; font-weight: bold; text-align: right; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nova narudžbina!</h1>
              <p style="margin: 10px 0 0 0;">Dušan Rakić - Raka Gegenpresing</p>
            </div>
            <div class="content">
              <div class="info-box">
                <h2 style="color: #ff5722; margin-top: 0;">Podaci o kupcu</h2>
                <p><strong>Ime i prezime:</strong> ${ime} ${prezime}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Telefon:</strong> <a href="tel:${telefon}">${telefon}</a></p>
                ${napomena ? `<p><strong>Napomena:</strong> ${napomena}</p>` : ""}
              </div>

              <div class="info-box">
                <h2 style="color: #ff5722; margin-top: 0;">Naručene knjige</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Naslov</th>
                      <th>Autor</th>
                      <th style="text-align: center;">Količina</th>
                      <th style="text-align: right;">Cena</th>
                      <th style="text-align: right;">Ukupno</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${stavkeHTML}
                  </tbody>
                </table>
                <div class="total">
                  UKUPNO: ${ukupno.toLocaleString("sr-RS")} RSD
                </div>
              </div>

              <div class="info-box" style="background: #fff3e0; border-left: 4px solid #ff5722;">
                <p style="margin: 0;"><strong>Sledeći koraci:</strong></p>
                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Kontaktirajte kupca na navedeni email ili telefon</li>
                  <li>Dogovorite način plaćanja</li>
                  <li>Nakon uplate, pošaljite knjige u elektronskom formatu na: ${email}</li>
                </ol>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const confirmationEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff5722; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #ff5722; color: white; padding: 12px; text-align: left; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Hvala na narudžbini!</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px;">Vaša narudžbina je uspešno primljena</p>
            </div>
            <div class="content">
              <p>Poštovani/a ${ime},</p>

              <p>Hvala što ste izabrali naše knjige! Vaša narudžbina je uspešno primljena i uskoro ćemo vas kontaktirati.</p>

              <div class="info-box">
                <h2 style="color: #ff5722; margin-top: 0;">Vaša narudžbina</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Knjiga</th>
                      <th style="text-align: center;">Količina</th>
                      <th style="text-align: right;">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${stavke
                      .map(
                        (stavka: any) => `
                      <tr>
                        <td style="padding: 12px; border-bottom: 1px solid #eee;">${stavka.naslov}<br><small style="color: #666;">${stavka.autor}</small></td>
                        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${stavka.kolicina}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${(stavka.cena * stavka.kolicina).toLocaleString("sr-RS")} RSD</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
                <p style="text-align: right; font-size: 20px; color: #ff5722; font-weight: bold; margin: 0;">
                  Ukupno: ${ukupno.toLocaleString("sr-RS")} RSD
                </p>
              </div>

              <div class="info-box" style="background: #e8f5e9; border-left: 4px solid #4caf50;">
                <h3 style="color: #2e7d32; margin-top: 0;">Šta dalje?</h3>
                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Kontaktiraćemo vas uskoro putem telefona ili email-a</li>
                  <li>Dogovorićemo način plaćanja koji vam odgovara</li>
                  <li>Nakon potvrđene uplate, knjige u elektronskom formatu stižu na vaš email</li>
                </ol>
              </div>

              <p>Ako imate bilo kakvih pitanja, slobodno nas kontaktirajte:</p>
              <p>
                <strong>Email:</strong> <a href="mailto:ducalion@gmail.com">ducalion@gmail.com</a><br>
                <strong>Telefon:</strong> <a href="tel:+381655025505">+381 65 502 5505</a>
              </p>

              <p style="margin-top: 30px;">Srdačan pozdrav,<br><strong>Dušan Rakić - Raka Gegenpresing</strong></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Pošalji email adminu
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SITE_MAIL_SENDER!,
            Name: "Dušan Rakić - Knjige",
          },
          To: [
            {
              Email: process.env.SITE_MAIL_RECEIVER!,
              Name: "Admin",
            },
          ],
          Subject: `Nova narudžbina od ${ime} ${prezime}`,
          HTMLPart: htmlEmail,
        },
      ],
    });

    // Pošalji potvrdu kupcu
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SITE_MAIL_SENDER!,
            Name: "Dušan Rakić - Raka Gegenpresing",
          },
          To: [
            {
              Email: email,
              Name: `${ime} ${prezime}`,
            },
          ],
          Subject: "Potvrda narudžbine - Dušan Rakić Knjige",
          HTMLPart: confirmationEmail,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
