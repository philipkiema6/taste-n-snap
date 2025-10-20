import { MenuItem, MenuItemType } from "./MenuItem";
import pizzaImg from "@/assets/pizza.jpg";
import burgerImg from "@/assets/burger.jpg";
import saladImg from "@/assets/salad.jpg";
import pastaImg from "@/assets/pasta.jpg";
import sushiImg from "@/assets/sushi.jpg";

const menuItems: MenuItemType[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on a crispy wood-fired crust",
    price: 12.99,
    image: pizzaImg,
    category: "Pizza",
  },
  {
    id: "2",
    name: "Classic Burger",
    description: "Double beef patty with cheese, lettuce, tomato on brioche bun",
    price: 14.99,
    image: burgerImg,
    category: "Burgers",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Grilled chicken, crispy romaine, parmesan, and house-made dressing",
    price: 10.99,
    image: saladImg,
    category: "Salads",
  },
  {
    id: "4",
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, parmesan, and fresh black pepper",
    price: 13.99,
    image: pastaImg,
    category: "Pasta",
  },
  {
    id: "5",
    name: "Sushi Platter",
    description: "Assorted fresh sushi rolls with wasabi and pickled ginger",
    price: 18.99,
    image: sushiImg,
    category: "Sushi",
  },
  {
    id: "6",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella and tomato sauce",
    price: 13.99,
    image: pizzaImg,
    category: "Pizza",
  },
];

interface MenuGridProps {
  onAddToCart: (item: MenuItemType) => void;
}

export const MenuGrid = ({ onAddToCart }: MenuGridProps) => {
  return (
    <section id="menu" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};
