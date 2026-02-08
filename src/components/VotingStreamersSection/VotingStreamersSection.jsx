import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import STREAMER_CATEGORIES from "../../data/streamerCategories.json";
import PARTICIPANTS from "../../data/participants.json";
import Footer from "../Footer/Footer";

// Crear un mapa de participantes para búsqueda rápida por ID
const participantsMap = PARTICIPANTS.participants.reduce((acc, participant) => {
	acc[participant.id] = participant;
	return acc;
}, {});

function VotingStreamersSection({ onVotesSubmit, goBack }) {
	const categories = STREAMER_CATEGORIES.categories;
	
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [votes, setVotes] = useState(
		categories.map((category) => ({
			category: category.id,
			categoryName: category.name,
			selectedParticipant: "",
		}))
	);

	const currentCategory = categories[currentCategoryIndex];
	
	// Resolver IDs de participantes a objetos completos
	const participants = useMemo(() => {
		return currentCategory.participants.map(id => participantsMap[id]).filter(Boolean);
	}, [currentCategory]);

	const handleVoteChange = (participantId) => {
		setVotes(
			votes.map((vote, index) =>
				index === currentCategoryIndex
					? { ...vote, selectedParticipant: participantId }
					: vote
			)
		);
	};

	const handleNextCategory = () => {
		const currentVote = votes[currentCategoryIndex];
		if (currentVote.selectedParticipant === "") {
			toast.info("Debes seleccionar un participante antes de continuar.");
		} else {
			if (currentCategoryIndex < categories.length - 1) {
				setCurrentCategoryIndex(currentCategoryIndex + 1);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				onVotesSubmit(votes);
			}
		}
	};

	const handlePrevCategory = () => {
		setCurrentCategoryIndex(currentCategoryIndex - 1);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Calcular progreso
	const progress = ((currentCategoryIndex + 1) / categories.length) * 100;
	const isLastCategory = currentCategoryIndex === categories.length - 1;
	const isFirstCategory = currentCategoryIndex === 0;

	return (
		<div className="flex flex-col w-full min-h-svh">
			{/* Barra de progreso fija arriba */}
			<div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
				<div 
					className="h-full transition-all duration-500 ease-out bg-primary"
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* Contenido principal - flex-1 para ocupar el espacio restante */}
			<main className="flex flex-col flex-1 w-full max-w-7xl pt-6 mx-auto">
				{/* Header: Título + Navegación */}
				<header className="flex flex-col gap-2 mb-3 md:flex-row md:items-start md:justify-between md:gap-3 md:mb-4 shrink-0">
					{/* Título y descripción */}
					<div className="flex-1">
						<p className="mb-1 text-[10px] md:text-xs font-medium tracking-wider uppercase text-primary">
							Categoría {currentCategoryIndex + 1} de {categories.length}
						</p>
						<h1 className="text-xl font-bold text-white uppercase md:text-4xl lg:text-5xl">
							{currentCategory.name}
						</h1>
						<p className="hidden mt-1 text-sm md:block text-white/70 md:text-base" style={{ fontFamily: 'Louis George Cafe, sans-serif' }}>
							{currentCategory.description}
						</p>
					</div>

					{/* Botones de navegación */}
					<div className="flex items-center gap-2 mt-2 md:mt-0 shrink-0">
						<button
							onClick={goBack}
							className="p-2 text-white transition-colors border border-white/20 hover:bg-white/10"
							aria-label="Volver al menú"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						
						<button
							onClick={handlePrevCategory}
							disabled={isFirstCategory}
							className={`px-3 py-2 font-semibold transition-all flex items-center gap-1 cursor-pointer text-sm ${
								isFirstCategory 
									? "bg-gray-700 text-gray-500 cursor-not-allowed" 
									: "bg-secondary text-white hover:opacity-80"
							}`}
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							<span className="hidden sm:inline uppercase">Anterior</span>
						</button>

						<button
							onClick={handleNextCategory}
							className="flex items-center gap-1 px-3 py-2 text-sm font-light cursor-pointer text-black transition-opacity bg-primary hover:opacity-80"
						>
							<span className="hidden sm:inline uppercase">{isLastCategory ? "Enviar votos" : "Siguiente"}</span>
							<span className="sm:hidden uppercase">{isLastCategory ? "Enviar" : "Sig."}</span>
							{!isLastCategory && (
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							)}
							{isLastCategory && (
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							)}
						</button>
					</div>
				</header>

				{/* Contenedor flexible para video y tarjetas */}
				<div className="flex flex-col flex-1 gap-4">
					{/* Video de presentación */}
					{currentCategory.videoUrl && (
						<section className="flex justify-center py-2 md:py-4 w-full shrink-0">
							<div className="w-full max-w-xl overflow-hidden aspect-[16/9]">
								<iframe
									src={`https://www.youtube.com/embed/${currentCategory.videoUrl}`}
									className="w-full h-full"
									allowFullScreen
									title={`Video de ${currentCategory.name}`}
								/>
							</div>
						</section>
					)}

					{/* Tarjetas de votación */}
					<section className="flex flex-col">
						<div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3 py-2 md:py-4">
							{participants.map((participant) => {
								const isSelected = votes[currentCategoryIndex].selectedParticipant === participant.id;
								// Nombre corto improvisado (primer nombre o primeras letras)
								const shortName = participant.displayName || participant.name.split(/[\s_-]/)[0];
								// Canal improvisado
								const channel = participant.channel || `twitch.tv/${participant.id}`;

								return (
									<div
										key={participant.id}
										onClick={() => handleVoteChange(participant.id)}
										className={`relative flex flex-col cursor-pointer transition-all duration-300 overflow-hidden aspect-[12/16] ${
											isSelected
												? "-translate-y-1 grayscale-0"
												: "grayscale hover:grayscale-0 hover:-translate-y-1 opacity-70 hover:opacity-100"
										}`}
									>
										{/* Foto que ocupa el espacio disponible */}
										<div className="relative flex-1 overflow-hidden">
											<img
												src={participant.photo}
												alt={participant.name}
												className="absolute inset-0 object-cover w-full h-full"
											/>
										</div>
										
										{/* Contenedor del nombre con clip-path - se superpone un poco sobre la foto */}
										<div 
											className="relative z-10 px-1 py-4 -mt-3 bg-primary shrink-0 flex items-center justify-center md:px-2 md:py-8 md:-mt-6"
											style={{ 
												clipPath: 'polygon(45% 0, 55% 10%, 100% 10%, 100% 70%, 100% 100%, 55% 100%, 45% 90%, 0 90%, 0% 35%, 0 0)'
											}}
										>
											<div className="flex flex-col items-center justify-center">
												<span className="text-[10px] md:text-sm font-bold text-black uppercase">
													{shortName}
												</span>
												<span className="text-[8px] md:text-[10px] text-black/60 uppercase">
													{channel}
												</span>
											</div>
										</div>

										{/* Check de selección */}
										{isSelected && (
											<div className="absolute z-20 p-1 top-1 right-1 bg-primary">
												<svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
												</svg>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</section>
				</div>
			</main>

			{/* Footer compacto */}
			<Footer />
		</div>
	);
}

export default VotingStreamersSection;
