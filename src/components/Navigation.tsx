import { Button } from "@/components/ui/button";
import { Home, Calendar, BookOpen, Crown, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Calendar, label: "Weekly Plan", path: "/weekly" },
    { icon: BookOpen, label: "Recipes", path: "/recipes" },
    { icon: Crown, label: "Premium", path: "/premium" }
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="font-bold text-xl text-foreground">DecentFoodie</span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};