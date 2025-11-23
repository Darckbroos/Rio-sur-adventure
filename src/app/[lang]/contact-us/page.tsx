import { getDictionary } from "@/lib/dictionary";
import { ContactForm } from "./contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { Suspense } from "react";

// 🔧 FIX: Tipado compatible con Next.js 15
export default async function ContactUsPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  // Determina el mensaje predefinido aquí, en el componente de servidor
  const serviceName = searchParams?.service as string | undefined;
  const messageFromPromo = searchParams?.message as string | undefined;
  let initialMessage = '';

  if (messageFromPromo) {
    initialMessage = messageFromPromo;
  } else if (serviceName) {
    initialMessage = dict.contact.predefined_email_message.replace('{serviceName}', decodeURIComponent(serviceName));
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          {dict.contact.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {dict.contact.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <Suspense fallback={<div>Loading form...</div>}>
            {/* Pasa el mensaje inicial como una prop al formulario */}
            <ContactForm dict={dict.contact} initialMessage={initialMessage} />
          </Suspense>
        </div>

        <div className="space-y-8">
          <h2 className="font-headline text-3xl font-semibold">
            {dict.contact.info_title}
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">
                  {dict.contact.info_label_address}
                </h3>
                <p className="text-muted-foreground">
                  {dict.contact.info_address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">
                  {dict.contact.info_label_phone}
                </h3>
                <p className="text-muted-foreground">
                  {dict.contact.info_phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">
                  {dict.contact.info_label_email}
                </h3>
                <p className="text-muted-foreground">
                  {dict.contact.info_email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
