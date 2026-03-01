import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactForm } from "@shared/routes";
import { useSubmitContact } from "@/hooks/use-contact";
import { type Plan } from "./ServiceCard";
import { Loader2, Send, Check, Copy, Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
}

const COUNTRIES = [
  "India", "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "United Arab Emirates", "Singapore", "Other"
];

const MY_EMAIL = "your-email@gmail.com"; // Replace with your actual email

export function ContactModal({ isOpen, onClose, selectedPlan }: ContactModalProps) {
  const { mutate: submitContact, isPending } = useSubmitContact();
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      selectedPlan: "",
      budget: "",
      projectDescription: "",
    },
  });

  // Update form defaults when a plan is selected
  useEffect(() => {
    if (selectedPlan && isOpen) {
      form.reset({
        ...form.getValues(),
        selectedPlan: selectedPlan.name,
        budget: `₹${selectedPlan.price}${selectedPlan.id === 'custom' ? '+' : ''}`,
      });
      setSuccessCode(null);
    }
  }, [selectedPlan, isOpen, form]);

  const onSubmit = (data: ContactForm) => {
    submitContact(data, {
      onSuccess: (response) => {
        setSuccessCode(response.code);
      }
    });
  };

  const copyToClipboard = () => {
    if (successCode) {
      navigator.clipboard.writeText(successCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    if (!isPending) {
      form.reset();
      setSuccessCode(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-2xl border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
        {successCode ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center text-white">Request Received!</DialogTitle>
              <DialogDescription className="text-center text-lg text-muted-foreground mt-2">
                Your 6-digit support code is:
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-4xl font-mono font-bold tracking-[0.5em] text-primary shadow-inner">
                {successCode}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-6 w-6 text-green-500" /> : <Copy className="h-6 w-6" />}
              </Button>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                <span className="font-semibold">Next Step</span>
              </div>
              <p className="text-white/90">
                Please email this code to <span className="text-primary font-bold underline">{MY_EMAIL}</span> for support and to finalize your order.
              </p>
            </div>

            <Button onClick={handleClose} variant="ghost" className="text-muted-foreground hover:text-white mt-4">
              Close Window
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-display tracking-tight text-white">
                Let's build something great
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill out the form below. I will reach out to you via WhatsApp shortly to discuss your <span className="text-primary font-medium">{selectedPlan?.name}</span>.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10 focus:ring-primary">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-white/10">
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country} value={country} className="focus:bg-primary/20">
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="selectedPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Selected Plan</FormLabel>
                        <FormControl>
                          <Input readOnly className="bg-white/5 border-white/10 text-white/60 cursor-not-allowed font-medium" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Estimated Budget</FormLabel>
                        <FormControl>
                          <Input className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary font-medium" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me a bit about your business and what you need..." 
                          className="resize-none min-h-[120px] bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Send Request via WhatsApp
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
