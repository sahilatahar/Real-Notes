import FloatingActionButton from "../components/FloatingActionButton";
import Header from "../components/Header";
import NoteCards from "../components/NoteCards/NoteCards";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div
            className="max-h-screen flex-grow overflow-y-scroll scroll-smooth px-3 pb-14 md:px-8 md:pb-0"
            id="home" // Id for scroll to top
        >
            <Header />
            <Navbar />
            <NoteCards />
            <FloatingActionButton />
        </div>
    );
}

export default Home;
