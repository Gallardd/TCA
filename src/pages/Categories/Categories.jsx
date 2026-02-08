import { useSearchParams } from "react-router-dom";
import VotingApp from "../../components/VotingApp/VotingApp";

function Categories() {
	const [searchParams] = useSearchParams();
	const voteType = searchParams.get("type"); // "streamers" o "juegos"

	return (
		<div className="w-full max-w-7xl mx-auto px-8 overflow-x-hidden">
			<VotingApp initialVoteType={voteType} />
		</div>
	);
}

export default Categories;
