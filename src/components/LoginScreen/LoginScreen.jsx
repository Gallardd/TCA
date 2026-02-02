import { supabase } from "../../supabaseClient";
import { toast } from "sonner";

function LoginScreen() {
	// Función para manejar el login con Google
	const handleGoogleLogin = async () => {
		try {
			// En desarrollo usa localhost, en producción usa el dominio configurado
			const redirectUrl = import.meta.env.DEV 
				? window.location.origin 
				: import.meta.env.VITE_SITE_URL;

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
		<div className='flex flex-col items-center justify-center w-screen h-screen'>
			<div className='bg-[#000816]/50 rounded-lg h-auto p-10 shadow-md backdrop-blur-md max-w-4xl w-full text-center'>
				<img
					src='/assets/thechinchillaawardslogo.png'
					alt='Logo'
					className='max-w-full mx-auto mb-4 md:max-w-xl'
				/>

				<h1 className='mb-4 text-3xl font-bold text-primary sm:text-4xl'>
					¡Bienvenido a los Chinchilla Awards 2026!
				</h1>

				<p className='mb-8 text-lg text-white'>
					Iniciá sesión con Google para votar por tus streamers favoritos.
				</p>

				<button
					onClick={handleGoogleLogin}
					className='w-full max-w-md p-4 font-semibold text-black transition-all rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary'
				>
					Iniciar sesión con Google
				</button>

				{/* Link a Twitch */}
				<a
					href='https://www.twitch.tv/gallardd'
					target='_blank'
					rel='noopener noreferrer'
					className='inline-block px-6 py-3 mt-6 font-semibold text-white transition-all bg-[#9146FF] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white'
				>
					¡Mirá el canal de Gallardd en Twitch!
				</a>
			</div>
		</div>
	);
}

export default LoginScreen;
