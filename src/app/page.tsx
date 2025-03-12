import { ContactForm } from "@/components/contact-form/contact";
import { Features } from "@/components/features/features";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import TicketmasterEvents from "@/components/ticketmaster-events/ticketmaster-events";

export default function Home() {
  return (
    <>
      <Hero />
      <TicketmasterEvents />
      <Features />
      <ContactForm />
      <Footer />
    </>
  );
}
