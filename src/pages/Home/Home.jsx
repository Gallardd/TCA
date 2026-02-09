import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="max-w-7xl mx-auto px-8 py-12">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
				{/* Columna Izquierda - Video y Botones */}
				<div className="flex flex-col gap-8">
					{/* Video de YouTube */}
					<div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
						<iframe
							className="w-full h-full"
							src="https://www.youtube.com/embed/cp5KxuR4rrI"
							title="The Chinchilla Awards 2026"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>

					{/* Sección Vota Ya */}
					<div className="flex flex-col items-center gap-6">
						<h2 className="font-gellix text-4xl md:text-5xl text-white uppercase tracking-widest">
							Vota Ya
						</h2>
						
						{/* Botones de votación */}
						<div className="flex flex-row gap-4">
							<Link
								to="/categorias?type=streamers"
								className="flex flex-col items-center justify-center gap-2 w-36 h-32 bg-black/30 border-2 border-primary rounded-lg hover:bg-primary/20 transition-all group"
							>
								<svg 
									className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" 
									viewBox="0 0 24 24" 
									fill="currentColor"
								>
									<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
								</svg>
								<span className="font-gellix text-lg text-white uppercase tracking-wider">
									Streamers
								</span>
							</Link>

							<Link
								to="/categorias?type=juegos"
								className="flex flex-col items-center justify-center gap-2 w-36 h-32 bg-black/30 border-2 border-primary rounded-lg hover:bg-primary/20 transition-all group"
							>
								<svg 
									className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" 
									viewBox="0 0 24 24" 
									fill="currentColor"
								>
									<path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
								</svg>
								<span className="font-gellix text-lg text-white uppercase tracking-wider">
									Juegos
								</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Columna Derecha - Logo y Texto */}
				<div className="flex flex-col items-center lg:items-start gap-8">
					{/* Logo */}
					<div className="flex items-center gap-4">
						<img 
							src="/assets/icon.png" 
							alt="Chinchilla" 
							className="h-24 w-auto"
						/>
						<div className="font-gellix text-primary">
							<p className="text-2xl uppercase tracking-wider">The</p>
							<p className="text-4xl uppercase tracking-wider font-bold">Chinchilla</p>
							<p className="text-4xl uppercase tracking-wider font-bold">Awards</p>
						</div>
					</div>

					{/* Texto de presentación */}
					<div className="font-louis text-white text-lg leading-relaxed space-y-4">
						<p>
							"<span className="text-primary font-bold">THE CHINCHILLA AWARDS</span>" nació como un 
							evento paródico a "<span className="text-secondary font-bold">THE GAME AWARDS</span>". En 
							este evento celebramos y reconocemos a los creadores de contenido que forman parte de 
							la comunidad día a día.
						</p>
						<p>
							Vos también sos parte del evento. Tu voto ayuda a reconocer el trabajo, la constancia y 
							el impacto de cada <span className="text-primary">Creador de Contenido</span>.
						</p>
						<p>
							<span className="text-secondary font-bold">MUCHAS GRACIAS</span> por hacer esto posible.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
