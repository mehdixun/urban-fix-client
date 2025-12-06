import Banner from "./Banner";
import Features from "./Features";

const Home = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome to UrbanFix</h1>
      <p className="mt-2 text-gray-600">Your city's issue reporting platform.</p>
      <Banner></Banner>
      <Features></Features>
    </div>
    
  );
};

export default Home;
