
import { Users, Globe, Zap, TrendingUp } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Businesses",
      description: "Trust our AI platform"
    },
    {
      icon: Globe,
      value: "2M+",
      label: "Content Pieces",
      description: "Generated and published"
    },
    {
      icon: Zap,
      value: "95%",
      label: "Time Saved",
      description: "On marketing tasks"
    },
    {
      icon: TrendingUp,
      value: "300%",
      label: "Avg. Growth",
      description: "In engagement rates"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Trusted by thousands
          </h2>
          <p className="text-xl text-white/60">
            Numbers that speak for themselves
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl mb-6 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
              <div className="text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-white/80 font-medium mb-1">{stat.label}</div>
              <div className="text-white/50 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
