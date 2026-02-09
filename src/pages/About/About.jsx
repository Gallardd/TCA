import React from "react";

const teamMembers = [
  {
    name: "Gallardd",
    image: "/assets/about-pictures/Gallardd_About.png",
    description: `Creador y principal impulsor de The Chinchilla Awards. Encargado de la idea original, la visión general del evento y la toma de decisiones. Desde el inicio del proyecto, trabaja para que la premiación crezca año tras año, manteniendo el enfoque en la comunidad, la transparencia y el reconocimiento al esfuerzo de los creadores de contenido que forman parte del evento.`,
    role: "FUNDADOR"
  },
  {
    name: "Nexus",
    image: "/assets/about-pictures/Nexus_About.png",
    description: `Área encargada de la organización, coordinación y ejecución del evento. Trabaja en la planificación general, los tiempos, la puesta en escena y el soporte durante la transmisión, asegurando que cada edición se desarrolle de forma ordenada, clara y profesional.`,
    role: "PRODUCCION"
  },
  {
    name: "Maru",
    image: "/assets/about-pictures/Maru_About.png",
    description: `Responsable del diseño visual y la identidad gráfica del evento. Trabaja en la creación de piezas gráficas, estilos visuales y detalles estéticos que dan forma a la imagen de The Chinchilla Awards, asegurando coherencia visual y una identidad clara en todas las plataformas.`,
    role: "DISEÑADORA"
  },
  {
    name: "King",
    image: "/assets/about-pictures/King_About.png",
    description: `Responsable del diseño y desarrollo del sitio web oficial. Se encarga de la experiencia de usuario, la estructura de la página y la implementación del sistema de votaciones, cuidando que la web sea clara, accesible, segura y funcional para todos.`,
    role: "DISEÑADOR WEB"
  },
  {
    name: "Mkr",
    image: "/assets/about-pictures/Mkr_About.png",
    description: `Encargado del desarrollo gráfico y creativo del evento. Colabora en la creación de assets visuales, composiciones y elementos gráficos que acompañan tanto la web como la transmisión, aportando ideas y soluciones visuales que elevan la presentación general del evento.`,
    role: "DISEÑO GRÁFICO"
  },
  {
    name: "Guardian",
    image: "/assets/about-pictures/Guardian_About.png",
    description: `Encargado del diseño de los premios, modelos 3D y elementos tridimensionales del evento, incluyendo el premio físico en 3D. Su trabajo aporta profundidad visual y una estética distintiva a The Chinchilla Awards, reforzando la identidad del evento en cada edición.`,
    role: "DISEÑO 3D"
  }
];

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
      {/* Sección equipo */}
      <section className="py-8 px-4 mt-16">
        <h2 className="font-gellix text-4xl text-primary text-center mb-8 uppercase tracking-wider">Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col md:flex-row items-center md:items-start"
            >
              <div className="flex flex-col items-center w-full md:w-1/3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-auto h-auto object-contain mb-2"
                />
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 w-full md:w-2/3">
                <p className="font-louis text-white text-sm md:text-base leading-snug md:leading-normal">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
