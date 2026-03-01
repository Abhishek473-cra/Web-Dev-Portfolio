import { useMutation } from "@tanstack/react-query";
import { api, type ContactFormInput, type ContactFormResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactFormInput): Promise<ContactFormResponse> => {
      const validated = api.contact.submit.input.parse(data);
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        let errorMessage = "Failed to submit request.";
        try {
          const errorData = await res.json();
          // Fallback to parsed error message if it matches our schema
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // Ignore JSON parse errors for non-JSON responses
        }
        throw new Error(errorMessage);
      }

      return api.contact.submit.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      toast({
        title: "Request Sent Successfully!",
        description: data.message || "I will get back to you shortly via WhatsApp.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
