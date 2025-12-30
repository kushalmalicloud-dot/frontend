import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "The Road Kitchen - Fine Dining Restaurant | Culinary Excellence in NYC";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience culinary excellence at The Road Kitchen, Premier fine dining restaurant. Award-winning dishes, exceptional service, and unforgettable dining experiences in the heart of the city.');
    }

    // Add JSON-LD structured data for restaurant
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "The Road Kitchen",
      "description": "Fine dining restaurant specializing in contemporary cuisine with exceptional service",
      "image": "https://theroadkitchen.com/hero-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Mali Stop",
        "addressLocality": "Shirgaon - Satpati Rd",
        "addressRegion": "Shirgaon",
        "postalCode": "Palghar",
        "addressCountry": "Maharashtra 401404"
      },
      "telephone": "+91 9923967306, +91 9834455918",
      "email": "yashmali888@gmail.com",
      "url": "https://theroadkitchen.com",
      "priceRange": "₹₹₹₹",
      "servesCuisine": "Contemporary Chinese",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday - Sunday"],
          "opens": "11.00 AM",
          "closes": "Till Late Night"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Thursday Closed",
          //"opens": "16:00",
          //"closes": "21:00"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup structured data on unmount
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main
        className="min-h-screen w-full flex flex-col"
        style={{
          backgroundImage: "url('/images/background.jpg.jpeg')",
          backgroundSize: "contain",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1a0d02",
        }}
      >
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-warm-gradient bg-clip-text text-transparent mb-4">
                The Road Kitchen
              </h3>
              <p className="text-background/80 leading-relaxed">
                Where culinary artistry meets exceptional hospitality.
                Experience the finest in contemporary dining.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-background">Quick Links</h4>
              <nav className="space-y-2">
                <a href="#home" className="block text-background/80 hover:text-background transition-colors">Home</a>
                <a href="#menu" className="block text-background/80 hover:text-background transition-colors">Menu</a>
                <a href="#about" className="block text-background/80 hover:text-background transition-colors">About</a>
                <a href="#contact" className="block text-background/80 hover:text-background transition-colors">Contact</a>
              </nav>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-background">Connect</h4>
              <div className="space-y-2 text-background/80">
                <p>Shirgaon - Satpati Rd, near Mali Stop,</p>
                <p>Shirgaon,Palghar, Maharashtra 401404</p>
                <p>(+91) 9923967306</p>
                <p>(+91) 98344 55918</p>
                <p>yashmali888@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2025 The Road Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;