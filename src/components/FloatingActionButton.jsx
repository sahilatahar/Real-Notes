import { CaretUp, Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useScrollPosition from "../hooks/useScrollPosition";

function FloatingActionButton() {
    const navigate = useNavigate();
    const { showScrollToTop } = useScrollPosition();

    // Function to handle notes star and instar
    const handleCreateBtn = () => {
        if (showScrollToTop) {
            window.scrollTo(0, 0);
        } else {
            navigate("/new");
        }
    };

    return (
        <button
            className="rounded-3 fixed bottom-4 right-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg bg-primary p-3 text-white"
            onClick={handleCreateBtn}
        >
            {showScrollToTop ? (
                <CaretUp className="icon" size="30" weight="bold" />
            ) : (
                <Plus className="icon" size="30" weight="bold" />
            )}
        </button>
    );
}

export default FloatingActionButton;
