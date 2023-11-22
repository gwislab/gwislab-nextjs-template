import { INewSignupParams } from 'interfaces';

export const newSignupTemplateEn = ({
  username,
  subject,
  verificationLink,
  expiresAt,
}: INewSignupParams) => `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Doormot - ${subject} </title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      .container {
        font-family: 'Montserrat', sans-serif;
        width: 70%;
        min-width: 600px;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="wrapper">
        <div class="content">
          <h1>${subject}</h1>
          <div class="body">
            <p>
              Hello
              <b>${username}</b>
            </p>
            <p >
              Welcome to doormot
              </p>
              <p>
                Click on the link below to verify your email address
              </p>
              <p>
              <a href="${verificationLink}">Verify my Email</a>
              </p>
              <p style="font-size: small;">This link will expire at ${expiresAt}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`;

export const newSignupTemplateFr = ({
  username,
  subject,
  verificationLink,
  expiresAt,
}: INewSignupParams) => `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Doormot - ${subject} </title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      .container {
        font-family: 'Montserrat', sans-serif;
        width: 70%;
        min-width: 600px;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="wrapper">
        <div class="content">
          <h1>${subject}</h1>
          <div class="body">
            <p>
              Salut
              <b>${username}</b>
            </p>
            <p >
            Bienvenue sur doormot
              </p>
              <p>
              Cliquez sur le lien ci-dessous pour vérifier votre adresse e-mail.
              </p>
              <p>
              <a href="${verificationLink}">Vérifier mon adresse e-mail</a>
              </p>
              <p style="font-size: small;">Ce lien expirera à ${expiresAt}</p>

          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`;
