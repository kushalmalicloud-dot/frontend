import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/background.jpg.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a0d02",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => scrollToSection('menu')}
          >
            View Our Menu
          </Button>
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => scrollToSection('contact')}
          >
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;