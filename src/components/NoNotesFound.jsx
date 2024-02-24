import { useContext } from "react";
import noNotesImg from "../assets/noNotes.svg";
import TabContext from "../context/TabContext";

function NoNotesFound() {
    const { isStarredTab } = useContext(TabContext);

    return (
        <div className="m-auto my-8 w-full text-center sm:w-[350px]">
            <img src={noNotesImg} alt="" />
            <h2 className="text-lg font-semibold">
                {isStarredTab
                    ? "You haven't starred any notes yet"
                    : "You haven't any notes yet"}
            </h2>
        </div>
    );
}

export default NoNotesFound;
