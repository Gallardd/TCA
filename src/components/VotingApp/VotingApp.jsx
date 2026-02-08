import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { toast } from "sonner";
import LoginScreen from "../LoginScreen/LoginScreen";
import VotingStreamersSection from "../VotingStreamersSection/VotingStreamersSection";
import VotingGamesSection from "../VotingGamesSection/VotingGamesSection";

// Nombres de tablas desde variables de entorno
const STREAMERS_TABLE = import.meta.env.VITE_SUPABASE_STREAMERS_NAME;
const GAMES_TABLE = import.meta.env.VITE_SUPABASE_GAMES_NAME;

function VotingApp({ initialVoteType }) {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [currentVoteType, setCurrentVoteType] = useState(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [loading, setLoading] = useState(true);

	// Establecer tipo de voto inicial desde URL
	useEffect(() => {
		if (initialVoteType && user) {
			if (initialVoteType === "streamers") {
				setCurrentVoteType("streamers");
			} else if (initialVoteType === "juegos") {
				setCurrentVoteType("games");
			}
		}
	}, [initialVoteType, user]);

	// Verificar si el usuario ya está autenticado
	useEffect(() => {
		// Primero suscribirse a cambios de auth (esto captura el token del redirect)
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			console.log("Auth event:", event, session?.user?.email);
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Luego verificar si ya hay sesión existente
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	// Verificar si el usuario ya votó
	useEffect(() => {
		const checkIfVoted = async () => {
			if (!currentVoteType || !user) return;

			setLoading(true);

			try {
				const tableName = currentVoteType === "streamers" ? STREAMERS_TABLE : GAMES_TABLE;

				const { data, error } = await supabase
					.from(tableName)
					.select("*")
					.eq("user_email", user.email);

				if (error && error.code !== "PGRST116") {
					throw error;
				}

				setHasVoted(data && data.length > 0);
			} catch (error) {
				toast.error("Error verificando los votos. Por favor, intenta nuevamente.");
				setCurrentVoteType(null);
			} finally {
				setLoading(false);
			}
		};

		checkIfVoted();
	}, [currentVoteType, user]);

	// Función para registrar los votos
	const handleVote = async (votes) => {
		try {
			const tableName = currentVoteType === "streamers" ? STREAMERS_TABLE : GAMES_TABLE;

			const { error: voteError } = await supabase
				.from(tableName)
				.insert([{ user_email: user.email, user_votes: votes }]);

			if (voteError) {
				if (voteError.message.includes("duplicate key value")) {
					toast.error("Ya votaste en esta sección.");
					return;
				}
				toast.error("Error al registrar los votos. Intenta nuevamente.");
				return;
			}

			toast.success("¡Votos registrados con éxito!");
			navigate("/");
		} catch (error) {
			toast.error("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
		}
	};

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) {
				throw new Error(error.message);
			}

			toast.success("Sesión cerrada correctamente.");
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
			toast.error("Error al cerrar sesión: " + error.message);
		}
	};

	// Loading inicial
	if (loading && !user) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<p className="text-xl text-white">Cargando...</p>
			</div>
		);
	}

	// No autenticado - mostrar login
	if (!user) {
		return <LoginScreen />;
	}

	// Selección de tipo de votación
	if (!currentVoteType) {
		return (
			<main className='flex flex-col items-center justify-center min-h-[60vh] gap-8 p-8 my-8 mx-auto text-center bg-[#000816]/50 rounded-lg shadow-md backdrop-blur-md max-w-xl w-full'>
				<h1 className='text-4xl font-bold text-primary'>
					¡Bienvenido a los Chinchilla Awards!
				</h1>
				<p className='text-lg text-white'>
					Hola <span className="font-semibold">{user.email}</span>, selecciona el tipo de votación.
				</p>
				<div className='flex flex-col gap-4 w-full'>
					<button
						onClick={() => setCurrentVoteType("streamers")}
						className='px-6 py-3 text-lg font-medium text-black rounded-lg bg-primary hover:opacity-80 transition-opacity'
					>
						Votar Categorías Streamers
					</button>
					<button
						onClick={() => setCurrentVoteType("games")}
						className='px-6 py-3 text-lg font-medium text-black rounded-lg bg-primary hover:opacity-80 transition-opacity'
					>
						Votar Categorías Juegos
					</button>
					<button
						onClick={handleLogout}
						className='px-6 py-3 text-lg font-medium text-white border rounded-lg border-primary hover:bg-primary/20 transition-colors'
					>
						Cerrar sesión
					</button>
					<button
						onClick={() => navigate("/")}
						className='px-6 py-3 text-lg font-medium text-white/70 hover:text-white transition-colors'
					>
						← Volver al Inicio
					</button>
				</div>
			</main>
		);
	}

	// Cargando estado de votación
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<p className="text-xl text-white">Verificando votos...</p>
			</div>
		);
	}

	// Ya votó en esta sección
	if (hasVoted) {
		return (
			<main className='flex flex-col items-center justify-center min-h-[60vh] p-8 my-8 mx-auto text-center bg-[#000816]/50 rounded-lg shadow-md backdrop-blur-md max-w-xl w-full'>
				<h1 className='text-4xl font-bold text-primary'>¡Ya votaste en esta sección!</h1>
				<p className='mt-4 text-lg text-white'>
					Gracias por participar en los Chinchilla Awards.
				</p>
				<button
					onClick={() => navigate("/")}
					className='px-6 py-3 mt-6 text-lg font-semibold text-black rounded-lg bg-primary hover:opacity-80 transition-opacity'
				>
					Volver al Inicio
				</button>
			</main>
		);
	}

	// Votación activa
	return (
		<main className='flex flex-col items-start w-full gap-6 py-12'>
			{currentVoteType === "streamers" && (
				<VotingStreamersSection
					onVotesSubmit={handleVote}
					goBack={() => navigate("/")}
				/>
			)}
			{currentVoteType === "games" && (
				<VotingGamesSection
					onVotesSubmit={handleVote}
					goBack={() => navigate("/")}
				/>
			)}
		</main>
	);
}

export default VotingApp;
