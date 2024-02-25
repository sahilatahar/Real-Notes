import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import NoteCards from "../components/NoteCards/NoteCards";
import Tabs from "../components/Tabs";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Home() {
    const { isMobile } = useWindowDimensions();

    return (
        <div
            className="max-h-screen flex-grow overflow-y-scroll scroll-smooth px-3  pb-14 md:px-8 md:pb-0"
            id="home" // Id for scroll to top
        >
            <Header />
            <Tabs />
            <NoteCards />
            {!isMobile && <FloatingActionButton />}
        </div>
    );
}

export default Home;
