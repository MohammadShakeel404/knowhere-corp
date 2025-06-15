
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart",
      content: "This platform completely transformed our marketing strategy. In just one week, we had a complete brand identity, website, and automated social media presence.",
      rating: 5,
      avatar: "SC",
      company: "TechStart"
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder, Local Bistro",
      content: "The AI understood our restaurant's vibe perfectly. It created content that actually sounds like us and our engagement has tripled since we started using it.",
      rating: 5,
      avatar: "MR",
      company: "Local Bistro"
    },
    {
      name: "Emily Watson",
      role: "Marketing Director, Fashion Co",
      content: "We went from spending 20 hours a week on content creation to just reviewing and approving. The quality is consistently amazing across all platforms.",
      rating: 5,
      avatar: "EW",
      company: "Fashion Co"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-6">
            What our clients say
          </h3>
          <p className="text-xl text-white/60 font-light">
            Real stories from businesses that transformed with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white/[0.02] border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500 rounded-3xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-white/20 mb-6" />
                  
                  <p className="text-white/80 mb-8 leading-relaxed font-light text-lg">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-white font-medium mr-4 backdrop-blur-md">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium">{testimonial.name}</div>
                      <div className="text-white/50 text-sm font-light">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
