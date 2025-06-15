
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Rocket, Globe, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former marketing director at tech unicorns, passionate about democratizing AI for businesses.",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher and engineer with 10+ years in machine learning and automation.",
      image: "photo-1486312338219-ce68d2c6f44d"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Product strategist focused on creating intuitive AI experiences for non-technical users.",
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Full-stack architect building scalable AI systems that power millions of marketing campaigns.",
      image: "photo-1461749280684-dccba630e2f6"
    }
  ];

  const stats = [
    { number: "50K+", label: "Businesses Served" },
    { number: "2M+", label: "Campaigns Created" },
    { number: "150+", label: "Countries Reached" },
    { number: "99.9%", label: "Platform Uptime" }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We believe every business deserves access to world-class marketing tools, regardless of size or budget."
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description: "Our customers' success is our success. Every feature we build starts with understanding their needs."
    },
    {
      icon: Rocket,
      title: "Innovation First",
      description: "We're constantly pushing the boundaries of what's possible with AI and marketing automation."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Building technology that empowers businesses worldwide to reach their full potential."
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />
      
      {/* Hero Section - Apple-style minimal */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/20 via-transparent to-neutral-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 hover:bg-white/10 transition-all duration-500">
            <Brain className="w-4 h-4 mr-2 text-white/60" />
            <span className="text-sm text-white/80 font-light">Our Story</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-tight leading-none">
            Democratizing
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              AI Marketing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Founded in 2023, we believe every business should have access to
            <br />
            enterprise-level marketing capabilities.
          </p>
        </div>
      </section>

      {/* Stats Section - Cuberto style */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-5xl md:text-6xl font-extralight text-white mb-4 group-hover:scale-110 transition-transform duration-500">
                  {stat.number}
                </div>
                <div className="text-white/60 font-light tracking-wide uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Apple-style split layout */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tight leading-tight">
                Our Mission
              </h2>
              <p className="text-xl text-white/60 mb-8 font-light leading-relaxed">
                We're on a mission to level the playing field in digital marketing. Traditional marketing agencies charge thousands of dollars for services that our AI can deliver in minutes.
              </p>
              <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">
                By combining advanced machine learning, creative AI, and automated workflows, we're making it possible for any business to compete with the biggest brands.
              </p>
              <Button className="bg-white text-black hover:bg-white/90 h-14 px-8 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 group">
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative overflow-hidden rounded-3xl">
                <img 
                  src={`https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80`}
                  alt="Team collaboration"
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Cuberto-style cards */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
              Our Values
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
              The principles that guide everything we do and drive our commitment to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
              >
                <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4 group-hover:text-white/80 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Apple-style minimal cards */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
              The brilliant minds behind MarketingAI, combining expertise in AI, marketing, and product development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
                  <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={`https://images.unsplash.com/${member.image}?auto=format&fit=crop&w=300&q=80`}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-light text-white mb-2 group-hover:text-white/80 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-white/60 font-light mb-4 text-sm">
                    {member.role}
                  </p>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tight leading-tight">
            Ready to Join
            <span className="block">Our Journey?</span>
          </h3>
          <p className="text-xl text-white/50 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you're a business looking to transform your marketing or a talented individual wanting to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-black hover:bg-white/90 h-14 px-8 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 h-14 px-8 rounded-full text-lg font-light">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-light text-white">MarketingAI</span>
            </div>
            <div className="flex space-x-8 text-white/60">
              <Link to="/features" className="hover:text-white transition-colors font-light">Features</Link>
              <Link to="/pricing" className="hover:text-white transition-colors font-light">Pricing</Link>
              <Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link>
              <a href="#" className="hover:text-white transition-colors font-light">Privacy</a>
              <a href="#" className="hover:text-white transition-colors font-light">Terms</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            <p className="font-light">&copy; 2024 MarketingAI. All rights reserved. Transforming businesses with AI-powered marketing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
