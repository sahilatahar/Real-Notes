import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import NoteCards from "../components/NoteCards/NoteCards";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Home() {
    const { isMobile } = useWindowDimensions();

    return (
        <div
            className="max-h-screen flex-grow overflow-y-scroll scroll-smooth px-3 pb-14 md:px-8 md:pb-0"
            id="home" // Id for scroll to top
        >
            <Header />
            <Navbar />
            <NoteCards />
            {!isMobile && <FloatingActionButton />}
        </div>
    );
}

export default Home;
