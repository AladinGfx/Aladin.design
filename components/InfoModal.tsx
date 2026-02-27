import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  type: 'about' | 'faq' | 'legal' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const renderContent = () => {
    switch (type) {
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-tight">About Me</h2>
            <div className="space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              <p>
                I am a passionate creative professional offering creators help with 
                visual packaging and strategy, icluding youtube Thumbnails and Titles.
              </p>
              <p>
                My expertise is based on understanding the newest trends and human psychology in this field.
              </p>
              <p>
                For creating my thumbnails I use Photoshop, Blender 3D and the newest AI models.
              </p>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What services do you offer?", a: "I offer Thumbnail and Title strategy and design help for youtube channels resulting in CTR (click through rate) and views increase." },
                { q: "What is your typical turnaround time?", a: "Turnaround time is 24-48 hours depending on the scale of the project, however i like to have more time to refine the details." },
                { q: "Do you work with international clients?", a: "Yes, I work with clients from all over the world and am comfortable communicating across different time zones." },
                { q: "What is your pricing structure?", a: "My pricing depends on many factors. Please contact me with your project details for a custom quote." },
                { q: "What software do you use?", a: "I primarily use the Adobe Photoshop, Blender 3D and AI for thumbnail work." },
                { q: "Can you handle rush projects?", a: "Rush projects can be rejected, depending on my schedule, when accepted, you will be charged with late notice fee (starting from uder 24 hours before deadline). " },
                { q: "Do you provide source files?", a: "Source files can be provided for an additional payment of 40€ (47,13 $)" },
              ].map((item, i) => (
                <div key={i} className="border-b border-neutral-200 pb-4 last:border-0 dark:border-neutral-700">
                  <h3 className="mb-1 font-semibold text-foreground">{item.q}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Terms & Ordering Policy</h2>
            
            <div className="space-y-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              <p>
                By placing an order or using this website, you acknowledge and agree to the terms outlined below.
                Please read this page carefully before submitting a request.
              </p>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">01 — Website Use</h3>
                <p>
                  This website is an independent portfolio and creative services platform. All content displayed — including thumbnail designs, mockups, and visual examples — is the intellectual property of the creator and may not be reproduced, copied, or redistributed without explicit written permission.
                </p>
                <p>
                  This website is provided "as is" without warranties of any kind. While every effort is made to ensure the accuracy and availability of the content presented here, no guarantees are made regarding uninterrupted access or error-free operation.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">02 — Late Notice Orders</h3>
                <p>
                  Orders submitted with a deadline falling between <strong className="text-foreground">12 and 24 hours</strong> from the time of request are considered <strong className="text-foreground">late notice orders</strong>. Due to the urgency and prioritization required to fulfill such requests, a <strong className="text-foreground">100% surcharge</strong> will be applied to the standard project rate.
                </p>
                <p className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
                  <strong className="text-foreground">Example:</strong> If the standard rate for a thumbnail is €100, a late notice order submitted within the 12–24 hour window will be charged at <strong className="text-foreground">€200</strong>.
                </p>
                <p>
                  Additionally, <strong className="text-foreground">late notice orders are not guaranteed to be accepted.</strong> Availability at the time of submission cannot always be guaranteed, and the right is reserved to decline any order that cannot be completed to an acceptable standard within the requested timeframe. Clients are strongly encouraged to plan ahead and submit orders well in advance of their deadlines.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">03 — Revisions</h3>
                <p>
                  Client satisfaction is a priority. <strong className="text-foreground">Unlimited revisions</strong> are offered on all projects, provided that the requested changes are <strong className="text-foreground">minor in nature</strong> — such as adjustments to text, colors, small compositional elements, or similar refinements.
                </p>
                <p>
                  If a client wishes to move in an entirely new creative direction — meaning a fundamentally different concept, layout, or design — this will be treated as a <strong className="text-foreground">new version</strong> of the thumbnail rather than a revision. New versions are subject to an additional charge of <strong className="text-foreground">50% of the original project rate</strong>.
                </p>
                <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
                  <p className="mb-1"><strong className="text-foreground">Minor revision (included):</strong> Changing the font color, adjusting the background brightness, swapping out text.</p>
                  <p><strong className="text-foreground">New version (+50%):</strong> Completely different layout, new concept, new composition from scratch.</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">04 — Payment</h3>
                <p>
                  All orders require <strong className="text-foreground">full payment upfront</strong> before any work is commenced. No design work, drafts, or concepts will be produced prior to the confirmation of payment. This ensures both parties are committed to the project before resources are allocated.
                </p>
                <p>
                  Payment information and available methods will be communicated at the time of your order inquiry.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">05 — Refunds</h3>
                <p>
                  Due to the custom and time-intensive nature of thumbnail design, <strong className="text-foreground">refunds are not available once work has begun</strong> on a project. If you have paid for an order and the creative process has been initiated — including any early drafts, concepts, or planning — the payment is considered non-refundable.
                </p>
                <p>
                  If you wish to cancel an order <strong className="text-foreground">before any work has started</strong>, please get in touch as soon as possible. Cancellations made prior to the commencement of work may be eligible for a full refund at the creator's discretion.
                </p>
              </div>

              <p className="border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-700">
                This policy was last updated in 2025. These terms are subject to change at any time without prior notice. Continued use of this website or placement of an order constitutes acceptance of the most current version of these terms.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-500"
      onClick={onClose}
    >
      <div 
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl dark:bg-neutral-900 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        {renderContent()}
      </div>
    </div>
  );
};
