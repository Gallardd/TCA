import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<header className="w-full py-4 bg-black/70 backdrop-blur-sm border-b border-white/10">
			<nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
				{/* Logo */}
				<NavLink to="/" className="flex items-center gap-2">
					<img 
						src="/assets/icon.png" 
						alt="Chinchilla Awards" 
						className="h-10 w-auto"
					/>
				</NavLink>

				{/* Navigation Links */}
				<ul className="flex items-center gap-8">
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
	);
}

export default Navbar;
