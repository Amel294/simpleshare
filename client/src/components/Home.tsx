import Buttons from "./Home/Buttons";
import HeroText from "./Home/HeroText";
import Nav from "./Navbar/Nav";

const Home = () => {
  return (
    <>
    <div className="min-h-screen bg-white">
      <Nav/>
      <HeroText/>
      <Buttons />
    
      </div>
      </>
  );
};

export default Home;
