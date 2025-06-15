import BlogList from "../components/Blog/BlogList";
import FeaturesSection from "../components/FeaturesSection";
import Hero from "../components/Hero";
import TestimonialsSection from "../components/TestimonialsSection";
import TextTitle from "../components/TextTitle";
function Home() {
  return (
    <div>
      <Hero />
      <BlogList />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
}

export default Home;
