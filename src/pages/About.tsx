
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, GraduationCap, Users, Heart, CheckCircle, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah J. Mitchell",
      title: "Senior Partner, Equine Law",
      education: "J.D. University of Kentucky College of Law",
      specialties: ["Horse Transactions", "Liability Law", "Insurance Claims"],
      experience: "15+ years",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      name: "Michael R. Harrison", 
      title: "Partner, Business & Estate Law",
      education: "J.D. Georgetown University Law Center",
      specialties: ["Business Formation", "Estate Planning", "Tax Law"],
      experience: "12+ years",
      image: "photo-1519389950473-47ba0277781c"
    },
    {
      name: "Jennifer L. Thompson",
      title: "Associate Attorney",
      education: "J.D. University of Louisville Brandeis School of Law",
      specialties: ["Litigation", "Contract Disputes", "Regulatory Compliance"],
      experience: "8+ years",
      image: "photo-1498050108023-c5249f4df085"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "AV Preeminent Rating",
      description: "Highest rating from Martindale-Hubbell for legal ability and ethical standards"
    },
    {
      icon: Users,
      title: "500+ Clients Served",
      description: "Successfully represented equestrian professionals across multiple states"
    },
    {
      icon: GraduationCap,
      title: "Industry Education",
      description: "Regular speakers at equestrian law seminars and industry conferences"
    },
    {
      icon: Heart,
      title: "Community Involvement",
      description: "Active supporters of equestrian charities and therapeutic riding programs"
    }
  ];

  const values = [
    {
      title: "Expertise",
      description: "Deep understanding of both legal principles and equestrian industry practices"
    },
    {
      title: "Integrity", 
      description: "Honest, transparent communication and ethical representation in all matters"
    },
    {
      title: "Accessibility",
      description: "Responsive service with clear explanations of complex legal concepts"
    },
    {
      title: "Results",
      description: "Focused on achieving the best possible outcomes for our clients"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-equine-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            About Equine Legal Advisors
          </h1>
          <p className="text-xl text-equine-sage-light leading-relaxed">
            For over 15 years, we've been the trusted legal partner for equestrian professionals, providing specialized expertise that understands both the law and the unique needs of the horse industry.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-equine-sage leading-relaxed">
                <p>
                  Founded in 2009 by Sarah Mitchell, a lifelong equestrian and experienced attorney, Equine Legal Advisors emerged from a simple recognition: the horse industry needed legal professionals who truly understood its unique challenges and opportunities.
                </p>
                <p>
                  What started as a solo practice has grown into a respected firm specializing exclusively in equestrian law. Our team combines decades of legal experience with genuine passion for the horse industry, having represented everyone from weekend riders to Olympic competitors.
                </p>
                <p>
                  We've handled landmark cases, drafted industry-standard contracts, and helped shape legal precedents that protect equestrian professionals nationwide. Our commitment remains unchanged: providing exceptional legal counsel tailored to the equestrian community's specific needs.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?w=600&h=500&fit=crop&crop=center"
                alt="Professional law office representing our commitment to excellence"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-equine-navy/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-equine-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-equine-sage max-w-3xl mx-auto">
              Meet the experienced attorneys who combine legal expertise with genuine passion for the equestrian industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-equine-gold">
                    <img 
                      src={`https://images.unsplash.com/${member.image}?w=200&h=200&fit=crop&crop=face`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-equine-navy mb-2">
                    {member.name}
                  </h3>
                  <p className="text-equine-gold font-medium mb-3">
                    {member.title}
                  </p>
                  <p className="text-sm text-equine-sage mb-4">
                    {member.education}
                  </p>
                  <div className="space-y-2 mb-4">
                    {member.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center justify-center text-sm">
                        <CheckCircle className="h-3 w-3 text-equine-gold mr-2" />
                        <span className="text-equine-sage">{specialty}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-equine-navy font-semibold">
                    {member.experience} experience
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-equine-sage">
              Recognition for our commitment to excellence in equestrian law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-equine-gold p-4 rounded-lg w-fit mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-equine-navy" />
                </div>
                <h3 className="font-heading font-semibold text-equine-navy mb-3">
                  {achievement.title}
                </h3>
                <p className="text-equine-sage text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-equine-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Our Values
            </h2>
            <p className="text-xl text-equine-sage">
              The principles that guide our practice and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading font-semibold text-equine-navy mb-4">
                    {value.title}
                  </h3>
                  <p className="text-equine-sage leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-cream mb-6">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-equine-sage-light mb-8">
            Experience the difference that specialized equestrian legal expertise can make for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold px-8 py-4 text-lg">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-equine-cream text-equine-cream hover:bg-equine-cream hover:text-equine-navy px-8 py-4 text-lg">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
