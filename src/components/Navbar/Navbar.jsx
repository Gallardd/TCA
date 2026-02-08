import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<>
			<header className="w-full py-3 md:py-4 bg-black/70 backdrop-blur-sm border-b border-white/10 relative z-50">
				<nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
					{/* Logo */}
					<NavLink to="/" className="flex items-center gap-2" onClick={closeMenu}>
						<img 
							src="/assets/icon.png" 
							alt="Chinchilla Awards" 
							className="h-8 md:h-10 w-auto"
						/>
					</NavLink>

					{/* Hamburger Button - Mobile */}
					<button
						className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
						<span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
						<span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
					</button>

					{/* Navigation Links - Desktop */}
					<ul className="hidden md:flex items-center gap-8">
						<li>
							<NavLink 
								to="/" 
								className={({ isActive }) => 
									`font-gellix text-lg uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/categorias" 
								className={({ isActive }) => 
									`font-gellix text-lg uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								Categorías
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/about" 
								className={({ isActive }) => 
									`font-gellix text-lg uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								About
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/rewind" 
								className={({ isActive }) => 
									`font-gellix text-lg uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								Rewind
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			{/* Mobile Menu - Outside header for proper z-index stacking */}
			{isMenuOpen && (
				<div className="md:hidden fixed inset-0 top-[53px] z-[100] bg-black/90 backdrop-blur-md">
					<ul className="flex flex-col items-center justify-center gap-8 pt-16">
						<li>
							<NavLink 
								to="/" 
								onClick={closeMenu}
								className={({ isActive }) => 
									`font-gellix text-2xl uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/categorias" 
								onClick={closeMenu}
								className={({ isActive }) => 
									`font-gellix text-2xl uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								Categorías
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/about" 
								onClick={closeMenu}
								className={({ isActive }) => 
									`font-gellix text-2xl uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								About
							</NavLink>
						</li>
						<li>
							<NavLink 
								to="/rewind" 
								onClick={closeMenu}
								className={({ isActive }) => 
									`font-gellix text-2xl uppercase tracking-wider transition-colors ${
										isActive ? "text-primary" : "text-white hover:text-primary"
									}`
								}
							>
								Rewind
							</NavLink>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

export default Navbar;
