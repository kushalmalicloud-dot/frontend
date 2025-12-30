import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const About = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);



  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-warm-gradient bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Nestled beside the beach, The Road Kitchen invites you to follow the road to flavor.
              Enjoy peaceful seaside views while we serve unique, lovingly crafted dishes —
              from flavorful Chinese delicacies to fresh fish specials and handmade momos — always elevated, fresh, and consistently excellent.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Led by Executive Chef's, our kitchen team combines traditional techniques with modern innovation,
              sourcing the finest local ingredients to create dishes that celebrate both flavor and artistry.
            </p>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10</div>
                <div className="text-sm text-muted-foreground">Award-Winning Dishes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Happy Guests Monthly</div>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] w-full overflow-hidden rounded-2xl shadow-card" id="book-tent">
            {["/images/slider1.jpg", "/images/slider2.jpg"].map((src, index) => (
              <div
                key={src}
                className={cn(
                  "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <img
                  src={src}
                  alt={`Campsite view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;