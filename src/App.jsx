import { Toaster } from "sonner";
import "./App.css";
import VotingApp from "./components/VotingApp/VotingApp";

function App() {
	return (
		<main className="relative bg-main min-h-svh min-w-svw">
			{/* Overlay oscuro */}
			<div className="absolute inset-0 bg-black/40 pointer-events-none" />
			<div className="relative z-10">
				<Toaster position='top-center' richColors />
				<VotingApp />
			</div>
		</main>
	);
}

export default App;
