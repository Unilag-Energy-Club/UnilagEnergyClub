const ET360Hero = () => {
  return (
    <section className="relative w-full bg-green-950 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #4ade80 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Content — padding sets the banner height, no flex centering tricks */}
      <div className="relative z-10 px-4 lg:px-8 pt-36 pb-0">
        {/* Live badge */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-bold px-5 py-2 rounded-full tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Applications Open
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">
            UNILAG Energy Club presents
          </p>
          <h1 className="font-black text-white leading-none mb-2">
            <span className="block text-4xl md:text-5xl lg:text-6xl mb-1">Energy Transition</span>
            <span className="block text-8xl md:text-[9rem] lg:text-[11rem] text-yellow-400 leading-none">
              360°
            </span>
          </h1>
          <p className="text-green-200 text-lg md:text-xl font-medium mt-4 mb-2">
            Shaping Nigeria's Energy Future
          </p>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            A four-week intensive bootcamp preparing 100 carefully selected UNILAG students for careers
            in Nigeria's energy transition economy.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <a
            href="#registration"
            className="px-8 py-3.5 bg-yellow-400 text-green-950 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm shadow-lg shadow-yellow-400/20 text-center"
          >
            Apply Now
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 border border-white/30 text-white font-bold rounded-full hover:bg-white/8 hover:border-white/50 transition-all duration-300 text-sm text-center"
          >
            Learn More
          </a>
        </div>

        {/* Stats strip — flush to bottom of section */}
        <div className="border-t border-white/10 bg-white/5">
          <div className="max-w-3xl mx-auto grid grid-cols-3 divide-x divide-white/10">
            {[
              { value: '100', label: 'Participants' },
              { value: '11', label: 'Teaching Days' },
              { value: '5', label: 'Capstone Projects' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center py-6 px-4">
                <div className="text-3xl lg:text-4xl font-black text-yellow-400">{value}</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ET360Hero;
