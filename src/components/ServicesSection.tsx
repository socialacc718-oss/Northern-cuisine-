import React from 'react';
import { Calendar, Users2, PartyPopper, Flame, Shield, Award, ChefHat, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO, CATERING_SERVICES } from '../data/menuData';

export const ServicesSection: React.FC = () => {
  const serviceIcons = [
    <Users2 key="wedding" className="w-6 h-6 text-emerald-400" />,
    <Calendar key="corporate" className="w-6 h-6 text-emerald-400" />,
    <PartyPopper key="birthday" className="w-6 h-6 text-emerald-400" />,
    <Flame key="outdoor" className="w-6 h-6 text-emerald-400" />,
  ];

  return (
    <section id="catering-section" className="py-14 sm:py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
            Catering & Events Management
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Where Great Food Meets Perfect Events
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            From kitchen to celebration, we make every event special. Customized hot buffets, live woks, and executive banquets across Pakistan.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATERING_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                  {serviceIcons[index % serviceIcons.length]}
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/80">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Customized Menu Packages
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Markers Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading font-bold text-lg sm:text-xl text-white">
              Planning a Wedding or Corporate Party?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Get an instant quotation and sample menu directly with our executive chef.
            </p>
          </div>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent('Salam Northern Cuisine! Mujhe catering aur event booking k baray me discuss krna hai.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <span>Inquire for Catering</span>
          </a>
        </div>
      </div>
    </section>
  );
};
