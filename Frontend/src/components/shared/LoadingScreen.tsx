import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center"
        >
          <span className="text-white font-bold text-3xl sanskrit-text">ॐ</span>
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Loading Sanskruti AI</h2>
          <p className="text-sm text-gray-600">Preparing your cultural journey...</p>
        </div>

        <Loader2 className="w-6 h-6 animate-spin text-orange-600 mx-auto" />
      </motion.div>
    </div>
  );
}
