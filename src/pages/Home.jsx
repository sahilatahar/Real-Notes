import { useEffect } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import NoteCards from "../components/NoteCards/NoteCards";
import Tabs from "../components/Tabs";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Home() {
    const { isMobile } = useWindowDimensions();
    // Hide Google Translate Element when Sidebar is closed
    useEffect(() => {
        const googleTranslateElement = document.getElementById(
            "google_translate_element",
        );
        googleTranslateElement.style.display = "none";
    }, []);

    return (
        <div className="max-h-screen flex-grow overflow-y-scroll px-3 md:px-8">
            <Header />
            <Tabs />
            <NoteCards />
            {!isMobile && <FloatingActionButton />}
        </div>
    );
}

export default Home;
