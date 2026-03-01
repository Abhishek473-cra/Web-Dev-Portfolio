import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Plan {
  id: string;
  name: string;
  price: number;
  time: string;
  features: string[];
  popular?: boolean;
}

interface ServiceCardProps {
  plan: Plan;
  index: number;
  onSelect: (plan: Plan) => void;
}

export function ServiceCard({ plan, index, onSelect }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative rounded-3xl p-8 h-full flex flex-col ${
        plan.popular
          ? "bg-gradient-to-b from-primary/20 to-card border-primary/50 shadow-xl shadow-primary/20"
          : "glass-card hover:border-white/20 hover:bg-card/60"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full flex items-center gap-1.5 shadow-lg">
          <Zap className="w-3.5 h-3.5 fill-current" /> Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
            ₹{plan.price}
          </span>
          {plan.price === 1000 && plan.id === 'custom' && <span className="text-xl font-bold text-white/70">+</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
          Delivery: <span className="text-foreground font-medium">{plan.time}</span>
        </p>
      </div>

      <div className="flex-grow">
        <ul className="space-y-3.5 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <div className="mt-0.5 rounded-full bg-primary/20 p-0.5 text-primary flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={() => onSelect(plan)}
        className={`w-full py-6 rounded-xl font-semibold text-base transition-all duration-300 ${
          plan.popular
            ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
            : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
        }`}
      >
        Select Plan
      </Button>
    </motion.div>
  );
}
