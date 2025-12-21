import { Sparkles, Heart, Leaf } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-800">
                WELCOME TO THE
                <br />
                <span className="bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent font-normal">
                  Azores Bloom Candles
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                At The Azores Bloom Candles, we believe a candle is more than just a light source—it's an experience. Each of our premium candles is hand-poured with love and care in Azores, crafted from the finest ingredients to offer a perfect blend of aesthetics, captivating scents, and lasting ambiance.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-stone-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                  What We Offer
                </h3>
                <p>
                  We specialize in high-quality, handmade candles crafted from premium wax blends such as soy, coconut, and apricot wax, ensuring a clean and even burn. Our carefully selected cotton wicks provide a steady, reliable flame for a calming ambiance. Each candle is uniquely designed to look like a realistic dessert or drink, combining visual artistry with luxurious fragrance for an unforgettable sensory experience.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-stone-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-amber-700" />
                  Our Unique Collection
                </h3>
                <p>
                  From iced latte-inspired fragrances to dessert-like scents that transport you to your favorite bakery, our candles are created to delight your senses.
                </p>
                <p>
                  Whether you're treating yourself or searching for the perfect gift, our candles elevate any occasion. With a burn time of 55+ hours, they provide long-lasting enjoyment while transforming your space into a sanctuary. Each scent is thoughtfully crafted to deliver a high-quality experience that creates a relaxing, inviting atmosphere wherever you are.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-stone-800 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-amber-700" />
                  Our Mission
                </h3>
                <p>
                  At The Azores Bloom Candles, our mission is to offer more than just candles—we create an experience that transforms your environment. With our premium ingredients, beautiful packaging, and unforgettable scents, we aim to enhance your everyday moments, bringing serenity and joy to your home.
                </p>
                <p className="italic text-stone-500">
                  Hand-poured right here in sunny Azores, every candle we make reflects our commitment to quality, craftsmanship, and sustainability. Join us in creating a space that feels as good as it smells.
                </p>
              </div>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-stone-50 rounded-full border border-amber-200">
                <span className="text-sm font-medium text-amber-800">55+ Hour Burn Time</span>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-stone-50 rounded-full border border-amber-200">
                <span className="text-sm font-medium text-amber-800">Premium Wax Blends</span>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-stone-50 rounded-full border border-amber-200">
                <span className="text-sm font-medium text-amber-800">Azores Made</span>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative lg:h-[700px] h-[500px] group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-stone-200 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-amber-100 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/candle.png"
                alt="Azores Bloom Candles handcrafted candles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Floating badge on image */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                <p className="text-sm text-stone-600">Hand-poured in</p>
                <p className="text-xl font-semibold text-amber-700">Azores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;