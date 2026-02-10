import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import GAME_CATEGORIES from "../../data/gameCategories.json";
import GAMES from "../../data/games.json";
import Footer from "../Footer/Footer";

// Crear un mapa de juegos para búsqueda rápida por ID
const gamesMap = GAMES.games.reduce((acc, game) => {
    acc[game.id] = game;
    return acc;
}, {});

function VotingGamesSection({ onVotesSubmit, goBack }) {
    const categories = GAME_CATEGORIES.categories;

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(() => {
        const savedIndex = localStorage.getItem('gamesCategoryIndex');
        // Si el índice guardado es inválido, vuelve a 0
        if (!savedIndex || isNaN(savedIndex) || savedIndex < 0 || savedIndex >= categories.length) return 0;
        return parseInt(savedIndex, 10);
    });
    const [votes, setVotes] = useState(() => {
        const savedVotes = localStorage.getItem('gamesVotes');
        return savedVotes
            ? JSON.parse(savedVotes)
            : categories.map((category) => ({
                category: category.id,
                categoryName: category.name,
                selectedGame: "",
            }));
    });

    useEffect(() => {
        localStorage.setItem('gamesCategoryIndex', currentCategoryIndex);
    }, [currentCategoryIndex]);

    useEffect(() => {
        localStorage.setItem('gamesVotes', JSON.stringify(votes));
    }, [votes]);

    const currentCategory = categories[currentCategoryIndex];

    // Evita el error en el useMemo:
    const games = useMemo(() => {
        if (!currentCategory || !currentCategory.games) return [];
        return currentCategory.games.map(id => gamesMap[id]).filter(Boolean);
    }, [currentCategory]);

    const handleVoteChange = (gameId) => {
        setVotes(
            votes.map((vote, index) =>
                index === currentCategoryIndex
                    ? { ...vote, selectedGame: gameId }
                    : vote
            )
        );
    };

    const handleNextCategory = () => {
        const currentVote = votes[currentCategoryIndex];
        if (!currentVote.selectedGame) {
            toast.info("Debes seleccionar un juego antes de continuar.");
            return;
        }
        if (currentCategoryIndex < categories.length - 1) {
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            localStorage.removeItem('gamesCategoryIndex');
            localStorage.removeItem('gamesVotes');
            onVotesSubmit(votes);
        }
    };

    const handlePrevCategory = () => {
        setCurrentCategoryIndex(currentCategoryIndex - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const progress = ((currentCategoryIndex + 1) / categories.length) * 100;
    const isLastCategory = currentCategoryIndex === categories.length - 1;
    const isFirstCategory = currentCategoryIndex === 0;

	if (!currentCategory) {
  return <div>Cargando categorías...</div>;
}

    return (
        <div className="flex flex-col w-full min-h-svh">
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
                <div 
                    className="h-full transition-all duration-500 ease-out bg-primary"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <main className="flex flex-col flex-1 w-full max-w-7xl pt-6 mx-auto">
                <header className="flex flex-col gap-2 mb-3 md:flex-row md:items-start md:justify-between md:gap-3 md:mb-4 shrink-0">
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
                <section className="flex flex-col">
                    <div className="grid py-4 md:py-10 grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3">
                        {games.map((game) => {
                            const isSelected = votes[currentCategoryIndex].selectedGame === game.id;
                            return (
                                <div
                                    key={game.id}
                                    onClick={() => handleVoteChange(game.id)}
                                    className={`relative w-full flex flex-col cursor-pointer transition-all duration-300 overflow-hidden min-h-[280px] md:min-h-[420px] ${
                                        isSelected
                                            ? "-translate-y-1 grayscale-0"
                                            : "grayscale hover:grayscale-0 hover:-translate-y-1 opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <div className="relative flex-1 overflow-hidden">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="absolute inset-0 object-cover w-full h-full"
                                        />
                                    </div>
                                    <div 
                                        className="relative z-10 px-2 py-6 -mt-4 bg-primary shrink-0 md:py-12 md:-mt-6"
                                        style={{ 
                                            clipPath: 'polygon(45% 0, 55% 10%, 100% 10%, 100% 70%, 100% 100%, 55% 100%, 45% 90%, 0 90%, 0% 35%, 0 0)'
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-1 md:pt-2">
                                            <span className="text-sm font-bold text-black uppercase md:text-xl">
                                                {game.name}
                                            </span>
                                        </div>
                                    </div>
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
            </main>
            <Footer />
        </div>
    );
}

export default VotingGamesSection;
