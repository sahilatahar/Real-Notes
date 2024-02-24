import ScaleLoader from "react-spinners/ScaleLoader";

function Loading() {
    return (
        <div className="flex h-screen min-h-screen w-screen items-center justify-center">
            <ScaleLoader color="#4F46E5" />
        </div>
    );
}

export default Loading;
