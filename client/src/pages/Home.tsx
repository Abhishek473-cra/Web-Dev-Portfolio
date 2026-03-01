import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Code2, Globe2, Layout, Smartphone } from "lucide-react";
import { ServiceCard, type Plan } from "@/components/ServiceCard";
import { ContactModal } from "@/components/ContactModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic Static Website",
    price: 300,
    time: "2-3 Days",
    features: ["1-3 Pages", "Mobile Responsive", "Contact Form", "Basic SEO Optimization"],
  },
  {
    id: "personal",
    name: "Personal Portfolio",
    price: 400,
    time: "3-5 Days",
    features: ["Up to 5 Pages", "Custom Premium Design", "Social Media Integration", "Fast Loading Speed"],
    popular: true,
  },
  {
    id: "business",
    name: "Business Website",
    price: 600,
    time: "1 Week",
    features: ["Up to 10 Pages", "CMS Integration", "Google Analytics Setup", "Premium Support"],
  },
  {
    id: "advanced",
    name: "Advanced Website",
    price: 1000,
    time: "2 Weeks",
    features: ["E-commerce Functionality", "User Authentication", "Database Setup", "Advanced Security"],
  },
  {
    id: "custom",
    name: "Custom Website",
    price: 1000,
    time: "Varies",
    features: ["Tailored Requirements", "Complex Animations", "3rd Party API Integrations", "Dedicated Consultation"],
  },
];

const FEATURES = [
  { icon: Globe2, title: "Modern Web Tech", desc: "Built with React & Next.js" },
  { icon: Smartphone, title: "Fully Responsive", desc: "Looks perfect on all devices" },
  { icon: Layout, title: "Premium UI/UX", desc: "Smooth animations & clean design" },
  { icon: Code2, title: "Clean Code", desc: "Optimized for speed & SEO" },
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <FloatingWhatsApp />
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlan} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight"
          >
            <span className="block text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>Abhishek</span>
            <span className="text-gradient block" style={{ fontFamily: 'var(--font-display)' }}>Web Developer</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Affordable & Professional Website Developer. I build stunning, fast, and high-converting websites tailored to your business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-6"
          >
            <Button 
              onClick={scrollToServices}
              size="lg"
              className="h-14 px-8 rounded-full text-lg font-semibold bg-white text-background hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300 group"
            >
              View Services
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-32 max-w-5xl mx-auto w-full"
        >
          {FEATURES.map((feat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
              <div className="p-3 bg-primary/10 rounded-xl mb-3 text-primary">
                <feat.icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-white/90 mb-1">{feat.title}</h4>
              <p className="text-xs text-muted-foreground">{feat.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Transparent <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees, exceptional quality guaranteed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((plan, i) => (
              <div key={plan.id} className={i === PLANS.length - 1 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}>
                <ServiceCard 
                  plan={plan} 
                  index={i} 
                  onSelect={handleSelectPlan} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background/50 backdrop-blur-lg py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Abhishek Web Development. Crafted with <span className="text-primary">♥</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
