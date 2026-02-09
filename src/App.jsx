import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Rewind from "./pages/Rewind/Rewind";
import About from "./pages/About/About";

function App() {
	return (
		<BrowserRouter>
			<main className="relative bg-main bg-cover min-h-svh min-w-svw overflow-x-hidden">
				{/* Overlay oscuro */}
				<div className="absolute inset-0 bg-black/40 pointer-events-none" />
				<div className="relative z-10 flex flex-col min-h-svh">
					<Toaster position='top-center' richColors />
					<Navbar />
					<div className="flex-1 overflow-x-hidden">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/categorias" element={<Categories />} />
							<Route path="/about" element={<About />} />
							<Route path="/rewind" element={<Rewind />} />
						</Routes>
					</div>
				</div>
			</main>
		</BrowserRouter>
	);
}

export default App;
