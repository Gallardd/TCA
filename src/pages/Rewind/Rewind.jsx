function Rewind() {
	return (
		<div className="max-w-7xl mx-auto px-8 py-12">
			<div className="text-center mb-12">
				<h1 className="font-gellix text-5xl text-primary uppercase tracking-wider mb-8">
					Rewind
				</h1>
				<p className="font-louis text-xl text-white">
					Revive los mejores momentos de ediciones anteriores.
				</p>
			</div>

			<div className="flex flex-col gap-16 items-center">
				{/* TCA 2024 */}
				<div className="w-full max-w-2xl">
					<h2 className="font-gellix text-3xl text-secondary uppercase mb-4 text-center">TCA 2024</h2>
					<div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
						<iframe
							title="TCA 2024 Rewind"
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/dk_cq7m3roU"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</div>

				{/* TCA 2023 */}
				<div className="w-full max-w-2xl">
					<h2 className="font-gellix text-3xl text-secondary uppercase mb-4 text-center">TCA 2023</h2>
					<div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
						<iframe
							title="TCA 2023 Rewind"
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/tJxevpFvrIA"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</div>

				{/* TCA 2022 */}
				<div className="w-full max-w-2xl">
					<h2 className="font-gellix text-3xl text-secondary uppercase mb-4 text-center">TCA 2022</h2>
					<div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
						<iframe
							title="TCA 2022 Rewind"
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/zjLlTokFd1I"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Rewind;
