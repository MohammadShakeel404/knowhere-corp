
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Mail, Lock, Eye, EyeOff, User, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    businessType: "",
    agreeToTerms: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    console.log("Signup attempted:", formData);
    toast({
      title: "Account Created!",
      description: "Welcome to MarketingAI. Your free trial has started."
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />
      
      {/* Hero Section - Apple-style minimal */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/20 via-transparent to-neutral-900/20"></div>
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">
              Start Your Free Trial
            </h1>
            <p className="text-white/60 font-light text-lg">Create your MarketingAI account in seconds</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-white/80 font-light text-sm">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-5 w-5 text-white/40" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder-white/40 pl-12 h-14 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-white/80 font-light text-sm">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 h-14 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-white/80 font-light text-sm">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 pl-12 h-14 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-white/80 font-light text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-white/40" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 pl-12 pr-12 h-14 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 h-5 w-5 text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-white/80 font-light text-sm">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-4 top-4 h-5 w-5 text-white/40" />
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 pl-12 h-14 rounded-2xl focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="businessType" className="text-white/80 font-light text-sm">Business Type</Label>
                  <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:border-white/30 focus:bg-white/10">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/10 backdrop-blur-xl">
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor="terms" className="text-sm text-white/60 font-light">
                    I agree to the{" "}
                    <a href="#" className="text-white hover:text-white/80 transition-colors duration-300">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-white hover:text-white/80 transition-colors duration-300">Privacy Policy</a>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-white/90 h-14 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                >
                  Start Free Trial
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-4 text-white/40 font-light">Or sign up with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-12 rounded-2xl font-light">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-12 rounded-2xl font-light">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
              
              <div className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:text-white/80 font-light transition-colors duration-300">
                  Sign in here
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              14-day free trial • No credit card required
            </Badge>
            <p className="text-sm text-white/40 font-light">
              Start creating professional marketing campaigns in minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
