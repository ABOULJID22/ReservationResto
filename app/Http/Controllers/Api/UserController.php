<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $userId = Auth::id();
    // Utilisez $userId comme nécessaire dans votre logique
    return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(100));
/*         return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
 */    }
    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        if ($request->hasFile('photo')) {
            // Enregistrez la photo dans le dossier public, par exemple "public/images"
            $photoPath = $request->file('photo')->storeAs('images', $request->file('photo')->getClientOriginalName(), 'public');
            $data['photo'] = 'images/' . $request->file('photo')->getClientOriginalName();
        }

        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        if ($request->hasFile('photo')) {
            // Supprimez la photo existante si elle existe dans "public/images"
            $existingPhotoPath = public_path('images/' . $user->photo);

            if (is_file($existingPhotoPath)) {
                unlink($existingPhotoPath);
                $user->update(['photo' => null]); // Mettez à jour la base de données pour supprimer le chemin du fichier
            } else {
                // Ajoutez un message de débogage si le fichier n'est pas trouvé
                logger("Le fichier n'existe pas : $existingPhotoPath");
            }


            // Enregistrez la nouvelle photo dans "public/images"
            $photoPath = $request->file('photo')->store('images');
            $data['photo'] = $photoPath;
        }

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // Supprimez la photo si elle existe dans "public/images"
        $existingPhotoPath = public_path('images/' . $user->photo);
        if (file_exists($existingPhotoPath)) {
            unlink($existingPhotoPath);
        }

        $user->delete();

        return response("", 204);
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index']);
    }

    public function updatePhoto(Request $request, User $user)
{
    $request->validate([
        'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('photo')) {
        $existingPhotoPath = public_path('images/' . $user->photo);

        // Vérifiez si le fichier existe
        if (is_file($existingPhotoPath)) {
            unlink($existingPhotoPath); // Supprimez le fichier existant
        }

        $destinationFolder = 'images';

        // Vérifiez si le dossier existe, sinon créez-le
        if (!file_exists(public_path($destinationFolder))) {
            mkdir(public_path($destinationFolder), 0777, true);
        }

        // Enregistrez la nouvelle photo dans "public/images"
        $photoPath = $request->file('photo')->move(public_path($destinationFolder), $request->file('photo')->getClientOriginalName());
        $user->update(['photo' => 'images/' . $request->file('photo')->getClientOriginalName()]);

        return new UserResource($user);
    }

    return response()->json(['message' => 'Aucune nouvelle photo n\'a été fournie.'], 422);
}


public function UpdatePassword(Request $request, User $user)
{
    // Valider les données de la requête
    $request->validate([
        'password' => 'required|string|min:8|confirmed',
    ]);

    // Mettre à jour le mot de passe de l'utilisateur
    $user->update([
        'password' => bcrypt($request->password),
    ]);

    // Retourner une réponse de succès
    return response()->json(['message' => 'Mot de passe réinitialisé avec succès'], 200);
}




    }
