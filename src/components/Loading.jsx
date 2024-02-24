import ScaleLoader from "react-spinners/ScaleLoader"

function Loading() {
	return (
		<div className="h-screen flex items-center justify-center min-h-screen w-screen">
			<ScaleLoader color="#4F46E5" />
		</div>
	)
}

export default Loading
