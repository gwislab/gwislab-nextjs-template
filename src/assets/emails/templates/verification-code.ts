import { IVerificationCodeParams } from 'interfaces';

export const verificationCodeEn = ({
  username,
  subject,
  code,
  expiresAt,
}: IVerificationCodeParams) => `

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
      .code {
        font-size: 20px;
        font-weight: bold;
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
             Doormot got your back
              </p>
              <p>
                Use the verification code below to reset your forgotten password
              </p>
              <p class="code">${code}</p>
              <p style="font-size: small;">This code will expire at ${expiresAt}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export const verificationCodeFr = ({
  username,
  subject,
  code,
  expiresAt,
}: IVerificationCodeParams) => `

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
      .code {
        font-size: 20px;
        font-weight: bold;
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
            Doormot vous couvre
              </p>
              <p>
              Utilisez le code de vérification ci-dessous pour réinitialiser votre mot de passe oublié
              </p>
              <p class="code"> ${code}</p>
              <p style="font-size: small;">Ce code expirera à ${expiresAt}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`;
