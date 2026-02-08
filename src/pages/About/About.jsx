function About() {
	return (
		<div className="max-w-7xl mx-auto px-8 py-12">
			<div className="text-center mb-12">
				<h1 className="font-gellix text-5xl text-primary uppercase tracking-wider mb-4">
					About Us
				</h1>
				<p className="font-louis text-xl text-white/80">
					Conoce más sobre The Chinchilla Awards
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				{/* Logo */}
				<div className="flex justify-center">
					<img 
						src="/assets/thechinchillaawardslogo.png" 
						alt="The Chinchilla Awards" 
						className="max-w-md w-full"
					/>
				</div>

				{/* Texto */}
				<div className="font-louis text-white text-lg leading-relaxed space-y-6">
					<p>
						"<span className="text-primary font-bold">THE CHINCHILLA AWARDS</span>" nació como un 
						evento paródico a "<span className="text-secondary font-bold">THE GAME AWARDS</span>". 
					</p>
					<p>
						En este evento celebramos y reconocemos a los creadores de contenido que forman parte de 
						la comunidad día a día. Streamers, creadores, speedrunners, jugadores competitivos y más 
						son reconocidos por su trabajo y dedicación.
					</p>
					<p>
						Vos también sos parte del evento. Tu voto ayuda a reconocer el trabajo, la constancia y 
						el impacto de cada <span className="text-primary">Creador de Contenido</span>.
					</p>
					<p className="text-2xl">
						<span className="text-secondary font-bold">MUCHAS GRACIAS</span> por hacer esto posible.
					</p>
				</div>
			</div>
		</div>
	);
}

export default About;
