
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Check, Star, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small businesses getting started with AI marketing",
      features: [
        "Basic brand identity creation",
        "Social media profile setup",
        "5 AI-generated posts per month",
        "Basic website template",
        "Email support",
        "SEO basics"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "99",
      description: "Ideal for growing businesses that need comprehensive marketing",
      features: [
        "Complete brand suite with guidelines",
        "Unlimited social media content",
        "Advanced ad creation and optimization",
        "Custom website development",
        "Priority support",
        "Advanced SEO tools",
        "Analytics and reporting",
        "Multi-platform integration"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "299",
      description: "For large businesses requiring advanced features and support",
      features: [
        "Everything in Professional",
        "Custom AI training on your data",
        "Dedicated account manager",
        "Advanced automation workflows",
        "White-label solutions",
        "API access",
        "Custom integrations",
        "24/7 phone support"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "The free trial includes full access to all features for 14 days, no credit card required."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees. You only pay the monthly subscription price for your chosen plan."
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
            <Sparkles className="w-4 h-4 mr-2 text-white/60" />
            <span className="text-sm text-white/80 font-light">14-Day Free Trial</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-tight leading-none">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Choose the perfect plan for your business.
            <br />
            Start with our free trial and scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards - Cuberto-style layout */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="group relative">
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-4 py-2">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className={`h-full p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 ${plan.popular ? 'ring-2 ring-purple-500/20 scale-105' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-light text-white mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className="text-5xl font-extralight text-white">${plan.price}</span>
                      <span className="text-white/60 font-light">/month</span>
                    </div>
                    <p className="text-white/60 font-light">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4">
                    {plan.cta === "Contact Sales" ? (
                      <Link to="/contact">
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-12 rounded-2xl font-medium transition-all duration-300 hover:scale-105">
                          {plan.cta}
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/signup">
                        <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-2xl font-medium transition-all duration-300 hover:scale-105">
                          {plan.cta}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Apple-style minimal cards */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about our pricing and plans.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
                  <h3 className="text-xl font-light text-white mb-4 group-hover:text-white/80 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
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
              <Link to="/about" className="hover:text-white transition-colors font-light">About</Link>
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

export default Pricing;
