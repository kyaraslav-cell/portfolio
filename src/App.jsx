import {
  About,
  Contact,
  Footer,
  Hero,
  Navbar,
  Pricing,
  Stack,
  StarsCanvas,
  Trust,
  Works,
} from "./components";
import { LangProvider } from "./context/Lang";

const App = () => (
  <LangProvider>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Works />
      <Stack />
      <Trust />
      <Pricing />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </div>
  </LangProvider>
);

export default App;
