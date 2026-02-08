import { supabase } from "../../supabaseClient";
import { toast } from "sonner";

function LoginScreen() {
	// Función para manejar el login con Google
	const handleGoogleLogin = async () => {
		try {
			// Usa la URL completa actual para volver a la misma página después del login
			const redirectUrl = window.location.href;

			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: redirectUrl,
				},
			});
			if (error) {
				toast.error("Error al iniciar sesión con Google.");
			}
		} catch (error) {
			toast.error("Algo salió mal. Por favor, intente nuevamente.");
		}
	};

	return (
		<div className='flex flex-col items-center justify-center w-full min-h-[80vh] px-4 py-12'>
			<div className='bg-[#000816]/50 rounded-lg h-auto p-10 shadow-md backdrop-blur-md max-w-4xl w-full text-center flex flex-col items-center gap-6'>
				<img
					src='/assets/thechinchillaawardslogo.png'
					alt='Logo'
					className='max-w-full mx-auto md:max-w-xl'
				/>

				<h1 className='text-3xl font-bold text-primary sm:text-4xl'>
					¡Bienvenido a los Chinchilla Awards 2026!
				</h1>

				<p className='text-lg text-white'>
					Iniciá sesión con Google para votar por tus streamers favoritos.
				</p>

				<div className='flex flex-col gap-4 w-full max-w-md'>
					<button
						onClick={handleGoogleLogin}
						className='w-full px-6 py-4 text-lg font-semibold text-black rounded-lg bg-primary hover:opacity-80 transition-opacity'
					>
						Iniciar sesión con Google
					</button>

					{/* Link a Twitch */}
					<a
						href='https://www.twitch.tv/gallardd'
						target='_blank'
						rel='noopener noreferrer'
						className='w-full px-6 py-3 text-lg font-semibold text-white rounded-lg bg-[#9146FF] hover:opacity-80 transition-opacity'
					>
						¡Mirá el canal de Gallardd en Twitch!
					</a>
				</div>
			</div>
		</div>
	);
}

export default LoginScreen;
