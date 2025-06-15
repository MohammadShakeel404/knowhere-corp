
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-purple-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 font-medium mb-1">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
