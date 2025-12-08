import Banner from "./Banner";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import VisionMission from "./VisionMission ";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome to UrbanFix</h1>
      <p className="mt-2 text-gray-600">Your city's issue reporting platform.</p>
      <Banner></Banner>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <VisionMission></VisionMission>
      
    </div>
    
  );
};

export default Home;
