<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use http\Env\Response;
use App\Mail\ResetPassword;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

use Illuminate\Support\Facades\Mail;
class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }




/*
public function forgotPassword(Request $request)
{
    // Validation : s'assurer que l'e-mail est présent et est un e-mail valide
    $request->validate(['email' => 'required|email']);
    $token = Str::random(64);
    // Générer le lien de réinitialisation
    $resetLink = URL::to("http://localhost:3000/reset-password/{$token}/" . urlencode($request->email));//. urlencode($user->id)

    // Créez votre propre message personnalisé pour la réinitialisation du mot de passe
    $customResetMessage = "Bonjour, vous avez demandé une réinitialisation de mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : {$resetLink}";

    // Envoyer le courriel avec le lien de réinitialisation
    Mail::to($request->email)->send(new \App\Mail\ResetPassword($customResetMessage));

    return response()->json(['status' => 'Le lien de réinitialisation du mot de passe a été envoyé avec succès'], 200);
}
 */
public function forgotPassword(Request $request)
{
    // Validation : assurez-vous que l'e-mail est présent et est un e-mail valide
    $request->validate(['email' => 'required|email']);

    // Récupérer l'utilisateur à partir de l'adresse e-mail
    $user = User::where('email', $request->email)->first();

    if ($user) {
        // Générer le token pour le lien de réinitialisation
        $token = Str::random(64);
        // Enregistrer le token dans la base de données pour cet utilisateur
        $user->password_reset_token = $token;
        $user->save();

        // Générer le lien de réinitialisation avec l'identifiant de l'utilisateur
        $resetLink = URL::to("http://localhost:3000/reset-password/{$token}/" . urlencode($request->email));

        // Créer le message personnalisé pour la réinitialisation du mot de passe
        $customResetMessage = "Bonjour, vous avez demandé une réinitialisation de mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : {$resetLink}";

        // Envoyer l'e-mail de réinitialisation avec le lien
        Mail::to($request->email)->send(new \App\Mail\ResetPassword($customResetMessage));

        // Retourner une réponse indiquant que le lien de réinitialisation a été envoyé avec succès
        return response()->json(['status' => 'Le lien de réinitialisation du mot de passe a été envoyé avec succès'], 200);
    } else {
        // Si aucun utilisateur n'est trouvé avec cette adresse e-mail, retourner une erreur
        return response()->json(['error' => 'Aucun utilisateur trouvé avec cette adresse e-mail'], 404);
    }
}


public function updatePassword(Request $request, $token, $email)
{
    // Vérifier si le token est valide
    $user = User::where('email', $email)->first();

    if ($user && $user->password_reset_token === $token) {
        // Mettre à jour le mot de passe
        $user->password = Hash::make($request->password);
        $user->password_reset_token = null;
        $user->save();

        // Retourner une réponse de succès
        return response()->json(['message' => 'Mot de passe mis à jour avec succès'], 200);
    } else {
        // Retourner une erreur si le token n'est pas valide ou si l'utilisateur n'existe pas
        return response()->json(['error' => 'Token invalide ou utilisateur non trouvé'], 404);
    }
}





}


