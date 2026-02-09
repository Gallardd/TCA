import React from "react";

const teamMembers = [
	{
		name: "Gallardd",
		image: "/assets/about-pictures/gallardd.jpg",
		description: `Creador y principal impulsor de The Chinchilla Awards. Encargado de la idea original, la visión general del evento y la toma de decisiones. Desde el inicio del proyecto, trabaja para que la premiación crezca año tras año, manteniendo el enfoque en la comunidad, la transparencia y el reconocimiento al esfuerzo de los creadores de contenido que forman parte del evento.`,
	},
	{
		name: "Nexus",
		image: "/assets/about-pictures/nexus.jpg",
		description: `Área encargada de la organización, coordinación y ejecución del evento. Trabaja en la planificación general, los tiempos, la puesta en escena y el soporte durante la transmisión, asegurando que cada edición se desarrolle de forma ordenada, clara y profesional.`,
	},
	{
		name: "Maru",
		image: "/assets/about-pictures/maru.jpg",
		description: `Responsable del diseño visual y la identidad gráfica del evento. Trabaja en la creación de piezas gráficas, estilos visuales y detalles estéticos que dan forma a la imagen de The Chinchilla Awards, asegurando coherencia visual y una identidad clara en todas las plataformas.`,
	},
	{
		name: "King",
		image: "/assets/about-pictures/king.jpg",
		description: `Responsable del diseño y desarrollo del sitio web oficial. Se encarga de la experiencia de usuario, la estructura de la página y la implementación del sistema de votaciones, cuidando que la web sea clara, accesible, segura y funcional para todos.`,
	},
	{
		name: "Mkr",
		image: "/assets/about-pictures/mkr.jpg",
		description: `Encargado del desarrollo gráfico y creativo del evento. Colabora en la creación de assets visuales, composiciones y elementos gráficos que acompañan tanto la web como la transmisión, aportando ideas y soluciones visuales que elevan la presentación general del evento.`,
	},
	{
		name: "Guardian",
		image: "/assets/about-pictures/guardian.jpg",
		description: `Encargado del diseño de los premios, modelos 3D y elementos tridimensionales del evento, incluyendo el premio físico en 3D. Su trabajo aporta profundidad visual y una estética distintiva a The Chinchilla Awards, reforzando la identidad del evento en cada edición.`,
	},
];

const AboutTeam = () => {
	return (
		<section className='max-w-5xl mx-auto py-8 px-4'>
			<h2 className='font-gellix text-4xl text-primary text-center mb-8 uppercase tracking-wider'>
				Equipo
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{teamMembers.map((member) => (
					<div
						key={member.name}
						className='bg-black/70 rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:items-start p-6 backdrop-blur-md hover:scale-[1.02] transition-transform duration-200'>
						<img
							src={member.image}
							alt={member.name}
							className='w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-primary bg-black mb-4 md:mb-0 md:mr-6'
						/>
						<div className='text-center md:text-left'>
							<h3 className='font-gellix text-secondary text-2xl mb-2'>
								{member.name}
							</h3>
							<p className='font-louis text-white text-base leading-relaxed'>
								{member.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default AboutTeam;
