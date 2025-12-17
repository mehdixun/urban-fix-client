import Banner from "./Banner";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import LatestResolvedIssues from "./LatestResolvedIssues";
import VisionMission from "./VisionMission ";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="w-full bg-base-200">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary drop-shadow-lg">
          Welcome to UrbanFix 🚀
        </h1>
        <p className="text-gray-700 md:text-lg max-w-xl mx-auto">
          Report issues in your city easily and track them with a smile! 🌟
        </p>
      </section>

      {/* Banner / Carousel */}
      <section className="py-10 px-4">
        <Banner />
      </section>

      {/* Latest Resolved Issues */}
      <section className="py-10 px-4 bg-base-100 rounded-xl shadow-inner my-6">
        <LatestResolvedIssues />
      </section>

      {/* Features Section */}
      <section className="py-10 px-4">
        <Features />
      </section>

      {/* How It Works */}
      <section className="py-10 px-4 bg-base-100 rounded-xl shadow-inner my-6">
        <HowItWorks />
      </section>

      {/* Why Choose Us */}
      <section className="py-10 px-4">
        <WhyChooseUs />
      </section>

      {/* Vision & Mission */}
      <section className="py-10 px-4 bg-base-100 rounded-xl shadow-inner my-6">
        <VisionMission />
      </section>
    </div>
  );
};

export default Home;
