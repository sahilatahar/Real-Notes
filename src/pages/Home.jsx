import { useEffect } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import NoteCards from "../components/NoteCards/NoteCards";
import Tabs from "../components/Tabs";

function Home() {
    // Hide Google Translate Element when Sidebar is closed
    useEffect(() => {
        const googleTranslateElement = document.getElementById(
            "google_translate_element",
        );
        googleTranslateElement.style.display = "none";
    }, []);

    return (
        <div className="max-h-screen flex-grow overflow-y-scroll px-2 md:px-8">
            <Header />
            <Tabs />
            <NoteCards />
            <FloatingActionButton />
        </div>
    );
}

export default Home;
