import { ChefHat, Clock, Award, Heart } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description: "Our talented chefs bring years of culinary expertise to every dish",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Hot, fresh food delivered to your doorstep in 30 minutes or less",
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      description: "We source only the finest, freshest ingredients for our meals",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is prepared with passion and attention to detail",
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About FoodHub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're passionate about bringing restaurant-quality meals straight to your home. 
            Since 2024, we've been serving our community with delicious food and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card hover:shadow-elegant transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 gradient-hero rounded-full flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Our Story
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            FoodHub was born from a simple idea: everyone deserves access to delicious, 
            restaurant-quality food without leaving their home. What started as a small 
            local kitchen has grown into a beloved food delivery service, but our commitment 
            to quality and customer satisfaction remains unchanged.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every meal we prepare is a testament to our dedication to excellence. From 
            sourcing fresh ingredients to ensuring timely delivery, we put our hearts 
            into every aspect of your dining experience.
          </p>
        </div>
      </div>
    </section>
  );
};
