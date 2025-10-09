import { FaWhatsapp } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
  phone: string;
  tooltip: string;
};

export function WhatsAppButton({ phone, tooltip }: Props) {
  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`https://wa.me/${cleanPhone}`}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="h-8 w-8" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
