import ScaleLoader from "react-spinners/ScaleLoader";

export const LoadingFull = () => {
    return (
        <div className="flex h-screen min-h-screen w-screen items-center justify-center">
            <Loading />
        </div>
    );
};

export default function Loading() {
    return (
        <div className="grid h-[100px] w-full place-items-center">
            <span>
                <ScaleLoader color="#4F46E5" />
            </span>
        </div>
    );
}
