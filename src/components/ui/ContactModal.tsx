import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-lg bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-black text-[#D7E2EA] uppercase tracking-wide mb-6">Let's Talk</h2>
            
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#D7E2EA]">Message Sent!</h3>
                <p className="text-[#D7E2EA]/60 mt-2">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-[#D7E2EA]/80 ml-1">Name</label>
                  <input required type="text" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-[#D7E2EA]/80 ml-1">Email</label>
                  <input required type="email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-[#D7E2EA]/80 ml-1">Message</label>
                  <textarea required rows={4} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA]/50 transition-colors resize-none" placeholder="Tell me about your project..." />
                </div>
                <button 
                  disabled={status === 'submitting'}
                  type="submit" 
                  className="mt-4 px-8 py-4 bg-[#D7E2EA] text-[#0C0C0C] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}