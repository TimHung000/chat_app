import "./home.css";
import TopBar from "../../components/topBar/TopBar";
import BottomBox from "../../components/bottomBox/BottomBox";


const Home = () => {
    return (
        <div className="home">
            <div className="homeContainer">
                <div className="top">
                    <TopBar />
                </div>
                <div className="bottom">
                    <BottomBox />
                </div>
            </div>
        </div>

    )
}

export default Home;