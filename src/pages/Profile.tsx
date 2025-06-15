
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Brain, User, Mail, Building, Calendar, Save, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, profile, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    business_type: ""
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        company: profile.company || "",
        business_type: profile.business_type || ""
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast({
          title: "Update Failed",
          description: error.message || "Failed to update profile",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
      }
    } catch (err) {
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        company: profile.company || "",
        business_type: profile.business_type || ""
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">
              Profile Settings
            </h1>
            <p className="text-white/60 font-light text-lg">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information Card */}
            <div className="lg:col-span-2">
              <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Update your personal details and business information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80">First Name</Label>
                      {isEditing ? (
                        <Input
                          value={formData.first_name}
                          onChange={(e) => handleInputChange("first_name", e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Enter first name"
                        />
                      ) : (
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                          {formData.first_name || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80">Last Name</Label>
                      {isEditing ? (
                        <Input
                          value={formData.last_name}
                          onChange={(e) => handleInputChange("last_name", e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="Enter last name"
                        />
                      ) : (
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                          {formData.last_name || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Email Address</Label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/60 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                      <span className="text-xs bg-white/10 px-2 py-1 rounded">Verified</span>
                    </div>
                    <p className="text-xs text-white/40">Email cannot be changed from this page</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Company</Label>
                    {isEditing ? (
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {formData.company || "Not provided"}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Business Type</Label>
                    {isEditing ? (
                      <Select onValueChange={(value) => handleInputChange("business_type", value)} value={formData.business_type}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select business type" />
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
                    ) : (
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.business_type ? 
                          formData.business_type.charAt(0).toUpperCase() + formData.business_type.slice(1) : 
                          "Not provided"
                        }
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex gap-3">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-white text-black hover:bg-white/90"
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-white text-black hover:bg-white/90"
                        >
                          {isSaving ? (
                            <>
                              <Save className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/5"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Summary Card */}
            <div className="space-y-6">
              <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Account Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Status</span>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Plan</span>
                    <span className="text-white">Free Trial</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Member Since</span>
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="w-4 h-4" />
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                    </div>
                  </div>

                  <Separator className="bg-white/10" />
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/5"
                  >
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Projects</span>
                    <span className="text-white">0</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">AI Content Generated</span>
                    <span className="text-white">0</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Storage Used</span>
                    <span className="text-white">0 MB</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
