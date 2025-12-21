import { ShoppingBag, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/40 via-stone-900/30 to-stone-900/40"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="Azores Bloom Candles"
            className="h-24 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Heading with gradient text */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
            <span className="block bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              Handcrafted
            </span>
            <span className="block mt-2 text-white drop-shadow-lg">
              With Love & Light
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Artisan candles made with premium soy wax and natural fragrances
            <br />
            <span className="inline-flex items-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm">Each candle is hand-poured with intention</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Shop Collection
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Floating badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-white/90">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <span className="text-amber-300">✓</span> 100% Natural Soy
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <span className="text-amber-300">✓</span> Eco-Friendly
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <span className="text-amber-300">✓</span> Hand-Poured
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;