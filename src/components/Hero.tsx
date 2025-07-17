import React from 'react';
import { Star } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  maxRating?: number;
  ratingText?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title = "I'm Lovin' It",
  subtitle = "Fresh, fast, and delicious food delivered to your door",
  rating = 4.8,
  maxRating = 5,
  ratingText = "Customer Rating"
}) => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8">{subtitle}</p>
        <div className="flex items-center justify-center space-x-1">
          {[...Array(maxRating)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-yellow-400'}`} 
            />
          ))}
          <span className="ml-2 text-lg">{rating}/{maxRating} {ratingText}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;