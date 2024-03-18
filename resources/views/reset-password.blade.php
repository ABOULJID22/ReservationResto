{{-- <!-- resources/views/reset-password.blade.php -->
<!DOCTYPE html>
<html>
<head>


 </head>
<body>
    <div>
        <h2>mon application</h2>
        <p>Bonjour,</p>
        <p>Vous recevez cet email car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.</p>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="{{ $resetLink }}">Réinitialiser le mot de passe</a>
        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet email.{{$resetLink}}</p>
    </div>
</body>
</html>
 --}}

 <!DOCTYPE html>
<html>
<head>
  <title>Réinitialisation du mot de passe</title>
</head>
<body>
  <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; padding: 20px;">
    <h2 style="color: #333; font-size: 24px; margin-top: 0;">Réinitialisation du mot de passe</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Cher(e) [Nom de l'utilisateur],
    </p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Nous vous contactons pour confirmer que nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Votre sécurité est notre priorité absolue, et nous prenons toutes les mesures nécessaires pour protéger vos informations.
    </p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Si vous n'avez pas initié cette demande, veuillez ne pas tenir compte de ce message. Votre compte reste sécurisé et aucun changement n'a été apporté.
    </p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Si vous avez bien demandé cette réinitialisation, veuillez suivre les instructions ci-dessous pour terminer le processus :
    </p>
    <ol>
      <li>
        Cliquez sur le bouton ci-dessous pour accéder à la page de réinitialisation de mot de passe :
        <a href="{{ $resetLink }}" style="text-decoration: none;">
          <button style="background-color: #4CAF50; /* Green */
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;">
            Réinitialiser le mot de passe
          </button>
        </a>
      </li>
      <li>
        Sur la page de réinitialisation,{{$resetLink}} suivez les instructions pour choisir un nouveau mot de passe sécurisé.
      </li>
      <li>
        Une fois que vous avez terminé, assurez-vous de conserver votre nouveau mot de passe en lieu sûr et ne le partagez avec personne.
      </li>
    </ol>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Si vous rencontrez des problèmes ou avez des questions, n'hésitez pas à nous contacter à [adresse e-mail de support].
    </p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Merci pour votre compréhension et votre coopération.
    </p>
    <p style="color: #666; font-size: 16px; line-height: 1.5;">
      Cordialement,
      <br>
      L'équipe de [Votre entreprise]
    </p>
  </div>
</body>
</html>

