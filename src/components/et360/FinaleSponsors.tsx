// ── Sponsor data (from the club's tier spreadsheet) ─────────────────────────────
// Logos live in /public/assets/media/sponsors. `logo: null` renders a text tile.
interface Sponsor {
  name: string;
  logo: string | null;
}

interface Tier {
  key: string;
  label: string;
  blurb: string;
  sponsors: Sponsor[];
  /** Tailwind grid columns for this tier's wall. */
  cols: string;
  /** Tile height — bigger tiers read as more prominent. */
  tileH: string;
}

const LOGO = '/assets/media/sponsors';

const tiers: Tier[] = [
  {
    key: 'headline',
    label: 'Headline Sponsors',
    blurb: 'Powering the Grand Finale',
    cols: 'grid-cols-1 sm:grid-cols-3',
    tileH: 'h-32 sm:h-36 lg:h-44 xl:h-48',
    sponsors: [
      { name: 'Genesis Energy', logo: `${LOGO}/genesis.png` },
      { name: 'Felicity Solar', logo: `${LOGO}/felicity-solar.png` },
      { name: 'Sahara Group', logo: `${LOGO}/sahara-group.png` },
    ],
  },
  {
    key: 'strategic',
    label: 'Strategic Institutional Partner',
    blurb: 'Anchoring the ET360° vision',
    cols: 'grid-cols-1',
    tileH: 'h-36 sm:h-44 lg:h-52 xl:h-56',
    sponsors: [{ name: 'NSIA', logo: `${LOGO}/nsia.png` }],
  },
  {
    key: 'silver',
    label: 'Silver Sponsors',
    blurb: '',
    cols: 'grid-cols-2',
    tileH: 'h-28 sm:h-32 lg:h-36',
    sponsors: [
      { name: 'Anfani', logo: `${LOGO}/anfani.png` },
      { name: 'EMRC', logo: `${LOGO}/emrc.png` },
    ],
  },
  {
    key: 'bronze',
    label: 'Bronze Sponsor',
    blurb: '',
    cols: 'grid-cols-1',
    tileH: 'h-28 sm:h-32 lg:h-36',
    sponsors: [{ name: 'Husk Power', logo: `${LOGO}/husk.png` }],
  },
  {
    key: 'knowledge',
    label: 'Knowledge Partners',
    blurb: 'Sharing expertise and insight',
    cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    tileH: 'h-24 sm:h-28 lg:h-32',
    sponsors: [
      { name: 'Carbon Limits Nigeria', logo: `${LOGO}/carbon-limits.png` },
      { name: 'FRED Program', logo: `${LOGO}/fred.png` },
      { name: 'Qoray', logo: `${LOGO}/qoray.svg` },
      { name: 'NCEEC', logo: `${LOGO}/nceec.png` },
      { name: 'Electricity Lawyer Academy', logo: `${LOGO}/electricity-lawyer-academy.jpg` },
      { name: 'SmeFunds', logo: null },
    ],
  },
];

function SponsorTile({ sponsor, tileH }: { sponsor: Sponsor; tileH: string }) {
  return (
    <div className={`group flex items-center justify-center ${tileH} px-2 sm:px-4`}>
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
        />
      ) : (
        <span className="text-xl font-black text-green-950 text-center">{sponsor.name}</span>
      )}
    </div>
  );
}

const FinaleSponsors = () => {
  return (
    <section id="sponsors" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14 lg:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-950 mb-4">
            Powered by Our Sponsors
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            The ET360° Grand Finale is made possible by leading organisations driving
            Nigeria's energy transition forward.
          </p>
        </div>

        {/* Tiers */}
        <div className="space-y-12 lg:space-y-16">
          {tiers.map((tier) => (
            <div key={tier.key} data-aos="fade-up">
              {/* Tier label with rules */}
              <div className="flex items-center gap-4 mb-7">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-center">
                  <h3 className="text-sm font-black uppercase tracking-widest text-green-950">
                    {tier.label}
                  </h3>
                  {tier.blurb && (
                    <p className="text-xs text-gray-400 mt-0.5">{tier.blurb}</p>
                  )}
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Sponsor wall — centered so short tiers don't stretch awkwardly */}
              <div
                className={`grid ${tier.cols} gap-4 sm:gap-5 ${
                  tier.sponsors.length <= 2 ? 'max-w-2xl mx-auto' : ''
                }`}
              >
                {tier.sponsors.map((s) => (
                  <SponsorTile key={s.name} sponsor={s} tileH={tier.tileH} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Become a sponsor */}
        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-sm text-gray-500">
            Interested in partnering with us?{' '}
            <a
              href="mailto:unilagenergyclub@gmail.com?subject=ET360%C2%B0%20Grand%20Finale%20Sponsorship"
              className="text-green-600 font-semibold hover:underline"
            >
              Become a sponsor →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default FinaleSponsors;
