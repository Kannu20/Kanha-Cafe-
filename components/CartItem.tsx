'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.1, ease: 'linear' }}
      className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
    >
      {/* Image */}
      <div className="relative w-20 h-24 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-bakery-50">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 80px, 96px" />
      </div>

      {/* Content Side */}
      <div className="flex flex-col sm:flex-row flex-1 min-w-0 pr-6 sm:pr-8 py-0.5 justify-between">
        
        {/* Info */}
        <div className="flex flex-col mb-3 sm:mb-0 justify-center">
          <p className="font-body text-[10px] sm:text-xs text-bakery-600 font-semibold mb-0.5 tracking-wider uppercase">{item.category}</p>
          <h4 className="font-display text-sm sm:text-lg font-bold text-mocha leading-tight truncate">{item.name}</h4>
          <p className="font-body text-base sm:text-lg font-bold text-bakery-700 mt-1">₹{item.price}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center mt-auto sm:mt-0">
          <div className="flex items-center gap-1 sm:gap-2 bg-bakery-50 rounded-lg sm:rounded-xl px-1.5 sm:px-2 py-1 sm:py-1.5 border border-bakery-100">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white shadow-sm flex items-center justify-center text-bakery-700 hover:bg-bakery-600 hover:text-white transition-all active:scale-95"
            >
              <Minus size={14} className="sm:w-4 sm:h-4" />
            </button>
            <span className="font-body font-bold text-sm sm:text-base text-mocha w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-bakery-600 shadow-sm flex items-center justify-center text-white hover:bg-bakery-700 transition-all active:scale-95"
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
          <p className="font-body text-[11px] sm:text-xs text-gray-400 font-medium sm:mt-1 hidden sm:block">
            = ₹{item.price * item.quantity}
          </p>
        </div>
      </div>

      {/* Delete Button (Absolute for both cases) */}
      <button
        onClick={() => removeItem(item.id)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all"
        aria-label="Remove item"
      >
        <Trash2 size={16} className="sm:w-5 sm:h-5" />
      </button>
    </motion.div>
  );
}
