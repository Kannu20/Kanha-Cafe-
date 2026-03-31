// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircle, Copy, ArrowLeft, Smartphone, ShieldCheck } from 'lucide-react';
// import { useCart } from '@/context/CartContext';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { items, total, count, clearCart } = useCart();
//   const [copied, setCopied] = useState(false);
//   const [paid, setPaid] = useState(false);
//   const [confirming, setConfirming] = useState(false);

//   const deliveryFee = total >= 500 ? 0 : 49;
//   const grandTotal = total + deliveryFee;
//   const upiId = '9602870828@ybl';

//   const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${upiId}&pn=KanhaBakers&am=${grandTotal}&cu=INR&tn=KanhaBakersOrder`;

//   const copyUPI = () => {
//     navigator.clipboard.writeText(upiId).catch(() => {});
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handlePaid = () => {
//     setConfirming(true);
//     setTimeout(() => {
//       clearCart();
//       setPaid(true);
//       setConfirming(false);
//     }, 1800);
//   };

//   if (paid) {
//     return (
//       <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
//             className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
//           >
//             <CheckCircle size={48} className="text-green-500" />
//           </motion.div>
//           <h2 className="font-display text-3xl font-bold text-mocha mb-3">Order Confirmed! 🎉</h2>
//           <p className="font-body text-gray-500 mb-2">Thank you for ordering from Kanha Bakers.</p>
//           <p className="font-body text-sm text-gray-400 mb-8">Your fresh bakes will be ready within 30–45 minutes.</p>
//           <div className="p-4 bg-bakery-50 rounded-2xl mb-8">
//             <p className="font-body text-xs text-gray-400 mb-1">Amount Paid</p>
//             <p className="font-display text-3xl font-bold text-bakery-700">₹{grandTotal}</p>
//           </div>
//           <Link href="/" className="bakery-btn w-full justify-center text-base">
//             Back to Home
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   if (items.length === 0 && !paid) {
//     return (
//       <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
//         <div className="text-center">
//           <h2 className="font-display text-3xl font-bold text-mocha mb-4">No items to checkout</h2>
//           <Link href="/menu" className="bakery-btn">Browse Menu</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-cream pt-24 pb-16">
//       {/* Header */}
//       <div className="bg-gradient-to-br from-mocha to-[#5a2f18] py-14 px-6 mb-10">
//         <div className="max-w-7xl mx-auto">
//           <Link href="/cart" className="inline-flex items-center gap-2 text-bakery-200 hover:text-white mb-4 transition-colors font-body text-sm">
//             <ArrowLeft size={16} /> Back to Cart
//           </Link>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="font-display text-5xl font-bold text-white"
//           >
//             Checkout
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className="font-body text-bakery-200 mt-2"
//           >
//             Complete your payment using UPI
//           </motion.p>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
//         {/* Order Summary */}
//         <div className="bg-white rounded-3xl shadow-lg p-6">
//           <h3 className="font-display text-xl font-bold text-mocha mb-5">Order Summary</h3>
//           <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//             {items.map(item => (
//               <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-bakery-50">
//                 <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-bakery-50 shrink-0">
//                   <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-body text-sm font-semibold text-mocha">{item.name}</p>
//                   <p className="font-body text-xs text-gray-400">×{item.quantity}</p>
//                 </div>
//                 <p className="font-body font-bold text-sm text-bakery-700">₹{item.price * item.quantity}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-5 pt-4 border-t border-bakery-100 space-y-2">
//             <div className="flex justify-between text-sm font-body text-gray-500">
//               <span>Subtotal ({count} items)</span>
//               <span>₹{total}</span>
//             </div>
//             <div className="flex justify-between text-sm font-body text-gray-500">
//               <span>Delivery</span>
//               <span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : ''}>
//                 {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
//               </span>
//             </div>
//           </div>

//           <div className="mt-4 p-4 bg-gradient-to-r from-bakery-600 to-bakery-700 rounded-2xl">
//             <div className="flex justify-between items-center">
//               <span className="font-display text-lg font-bold text-white">Grand Total</span>
//               <span className="font-display text-3xl font-bold text-white">₹{grandTotal}</span>
//             </div>
//           </div>
//         </div>

//         {/* Payment */}
//         <div className="bg-white rounded-3xl shadow-lg p-6">
//           <div className="flex items-center gap-2 mb-5">
//             <Smartphone size={20} className="text-bakery-600" />
//             <h3 className="font-display text-xl font-bold text-mocha">Pay via UPI</h3>
//           </div>

//           {/* QR Code */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="p-4 bg-white border-2 border-bakery-100 rounded-2xl shadow-md mb-3">
//               <Image
//                 src={qrUrl}
//                 alt="UPI QR Code"
//                 width={200}
//                 height={200}
//                 className="block"
//                 unoptimized
//               />
//             </div>
//             <p className="font-body text-xs text-gray-400">Scan with any UPI app</p>
//           </div>

//           {/* UPI ID */}
//           <div className="mb-4 p-4 bg-bakery-50 rounded-2xl border border-bakery-100">
//             <p className="font-body text-xs text-gray-400 mb-1">UPI ID</p>
//             <div className="flex items-center justify-between">
//               <span className="font-body font-bold text-mocha text-lg">{upiId}</span>
//               <button
//                 onClick={copyUPI}
//                 className="p-2 rounded-lg bg-white border border-bakery-200 hover:bg-bakery-600 hover:text-white hover:border-bakery-600 text-bakery-600 transition-all"
//               >
//                 {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
//               </button>
//             </div>
//           </div>

//           {/* Amount */}
//           <div className="p-4 bg-mocha rounded-2xl mb-6 text-center">
//             <p className="font-body text-xs text-bakery-200 mb-1">Pay Exactly</p>
//             <p className="font-display text-4xl font-bold text-white">₹{grandTotal}</p>
//           </div>

//           <div className="flex items-center gap-2 mb-5 text-xs text-gray-400 font-body">
//             <ShieldCheck size={14} className="text-green-500" />
//             Secure UPI payment — GPay, PhonePe, Paytm, BHIM all supported
//           </div>

//           <motion.button
//             onClick={handlePaid}
//             disabled={confirming}
//             whileTap={{ scale: 0.97 }}
//             className="bakery-btn w-full justify-center text-base py-4 disabled:opacity-70"
//           >
//             {confirming ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Confirming...
//               </>
//             ) : (
//               <>
//                 <CheckCircle size={18} />
//                 I Have Paid
//               </>
//             )}
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState, useRef, useCallback } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   CheckCircle, Copy, ArrowLeft, ShieldCheck,
//   Truck, CreditCard, User, MapPin, Phone, Mail, Edit3,
//   Upload, X, Package, MessageCircle, ChevronRight,
//   AlertCircle, Clock, Plus, Minus, Trash2, Eye,
//   Lock, FileCheck, Check, Store, Navigation
// } from 'lucide-react';
// import { useCart } from '@/context/CartContext';

// // ── Types ──────────────────────────────────────────────────────────────────
// type PaymentMethod  = 'upi' | 'cod' | null;
// type OrderType      = 'delivery' | 'pickup' | null;
// type Step           = 'payment' | 'details' | 'review' | 'success';

// interface DeliveryDetails {
//   name:       string;
//   phone:      string;
//   email:      string;
//   address:    string;
//   orderType:  OrderType;
//   pickupTime: string;
// }

// interface VerificationState {
//   screenshot:        File | null;
//   screenshotPreview: string | null;
//   transactionId:     string;
//   uploading:         boolean;
//   verified:          boolean;
// }

// // ── Step bar ───────────────────────────────────────────────────────────────
// const STEPS: { key: Step; label: string; icon: typeof User }[] = [
//   { key: 'payment', label: 'Payment', icon: CreditCard  },
//   { key: 'details', label: 'Details', icon: User        },
//   { key: 'review',  label: 'Review',  icon: Eye         },
//   { key: 'success', label: 'Done',    icon: CheckCircle },
// ];

// function StepBar({ current }: { current: Step }) {
//   const idx = STEPS.findIndex(s => s.key === current);
//   return (
//     <div className="flex items-center justify-center mb-8">
//       {STEPS.map((s, i) => {
//         const done   = i < idx;
//         const active = i === idx;
//         const Icon   = s.icon;
//         return (
//           <div key={s.key} className="flex items-center">
//             <div className="flex flex-col items-center gap-1">
//               <motion.div
//                 animate={{
//                   backgroundColor: done ? '#22c55e' : active ? '#c46e1f' : '#e5e7eb',
//                   scale: active ? 1.12 : 1,
//                 }}
//                 transition={{ duration: 0.35 }}
//                 className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
//               >
//                 {done
//                   ? <Check size={18} className="text-white" />
//                   : <Icon size={16} className={active ? 'text-white' : 'text-gray-400'} />
//                 }
//               </motion.div>
//               <span className={`text-xs font-body font-semibold hidden sm:block ${active ? 'text-bakery-700' : done ? 'text-green-600' : 'text-gray-400'}`}>
//                 {s.label}
//               </span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div className={`h-0.5 w-12 sm:w-20 mx-1 rounded transition-colors duration-500 ${i < idx ? 'bg-green-400' : 'bg-gray-200'}`} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ── Order summary panel ────────────────────────────────────────────────────
// function OrderPanel({
//   items, total, deliveryFee, grandTotal, orderType,
// }: {
//   items: any[]; total: number; deliveryFee: number; grandTotal: number; orderType: OrderType;
// }) {
//   return (
//     <div className="bg-white rounded-3xl shadow-lg border border-bakery-100 overflow-hidden">
//       <div className="px-6 py-4 border-b border-bakery-50 flex items-center justify-between">
//         <h3 className="font-display text-lg font-bold text-mocha flex items-center gap-2">
//           <Package size={18} className="text-bakery-600" /> Order Summary
//         </h3>
//         <span className="text-xs font-semibold bg-bakery-50 text-bakery-700 px-3 py-1 rounded-full border border-bakery-100">
//           {items.reduce((s, i) => s + i.quantity, 0)} items
//         </span>
//       </div>
//       <div className="px-6 py-3 max-h-60 overflow-y-auto space-y-3">
//         {items.map(item => (
//           <div key={item.id} className="flex items-center gap-3 py-2 border-b border-bakery-50 last:border-0">
//             <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-bakery-50 shrink-0 shadow-sm">
//               <Image src={item.image} alt={item.name} fill className="object-cover" sizes="44px" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="font-body text-sm font-semibold text-mocha truncate">{item.name}</p>
//               <p className="font-body text-xs text-gray-400">₹{item.price} × {item.quantity}</p>
//             </div>
//             <span className="font-body font-bold text-sm text-bakery-700">₹{item.price * item.quantity}</span>
//           </div>
//         ))}
//       </div>
//       <div className="px-6 py-4 bg-bakery-50/60 space-y-2">
//         <div className="flex justify-between text-sm font-body text-gray-500">
//           <span>Subtotal</span><span>₹{total}</span>
//         </div>
//         <div className="flex justify-between text-sm font-body">
//           <span className="text-gray-500">{orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
//           <span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : 'text-gray-700'}>
//             {deliveryFee === 0 ? '🎉 FREE' : `₹${deliveryFee}`}
//           </span>
//         </div>
//         <div className="pt-2 border-t border-bakery-200 flex justify-between items-center">
//           <span className="font-display font-bold text-mocha">Total</span>
//           <span className="font-display text-2xl font-bold text-bakery-700">₹{grandTotal}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────
// export default function CheckoutPage() {
//   const { items: cartItems, clearCart } = useCart();

//   const [localItems, setLocalItems] = useState(cartItems);
//   const [step,       setStep]       = useState<Step>('payment');
//   const [payMethod,  setPayMethod]  = useState<PaymentMethod>(null);
//   const [copied,     setCopied]     = useState(false);
//   const [confirming, setConfirming] = useState(false);

//   const [details, setDetails] = useState<DeliveryDetails>({
//     name: '', phone: '', email: '', address: '',
//     orderType: null, pickupTime: '',
//   });
//   const [detailErrors, setDetailErrors] = useState<Partial<Record<keyof DeliveryDetails, string>>>({});

//   const [verification, setVerification] = useState<VerificationState>({
//     screenshot: null, screenshotPreview: null,
//     transactionId: '', uploading: false, verified: false,
//   });
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const upiId      = '9602870828@ybl';
//   const localTotal = localItems.reduce((s, i) => s + i.price * i.quantity, 0);
//   // Pickup = always free; Delivery = free above ₹500
//   const deliveryFee = details.orderType === 'pickup' ? 0 : localTotal >= 500 ? 0 : 49;
//   const grandTotal  = localTotal + deliveryFee;

//   const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&bgcolor=ffffff&color=3d2012&data=upi://pay?pa=${encodeURIComponent(upiId)}%26pn=KanhaBakers%26am=${grandTotal}%26cu=INR%26tn=KanhaBakersOrder`;

//   const handleLocalQty = useCallback((id: string, qty: number) => {
//     if (qty <= 0) setLocalItems(prev => prev.filter(i => i.id !== id));
//     else          setLocalItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
//   }, []);

//   const copyUPI = () => {
//     navigator.clipboard.writeText(upiId).catch(() => {});
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2500);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 10 * 1024 * 1024) { alert('File too large. Max 10MB.'); return; }
//     setVerification(v => ({ ...v, screenshot: file, screenshotPreview: URL.createObjectURL(file), verified: false }));
//   };

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (!file || !file.type.startsWith('image/')) return;
//     setVerification(v => ({ ...v, screenshot: file, screenshotPreview: URL.createObjectURL(file), verified: false }));
//   }, []);

//   const simulateVerify = () => {
//     if (!verification.screenshot) return;
//     setVerification(v => ({ ...v, uploading: true }));
//     setTimeout(() => setVerification(v => ({ ...v, uploading: false, verified: true })), 2200);
//   };

//   const validateDetails = () => {
//     const errs: Partial<Record<keyof DeliveryDetails, string>> = {};
//     if (!details.name.trim())                 errs.name      = 'Name is required';
//     if (!/^[6-9]\d{9}$/.test(details.phone)) errs.phone     = 'Valid 10-digit mobile required';
//     if (details.email && !/\S+@\S+\.\S+/.test(details.email)) errs.email = 'Invalid email';
//     if (!details.orderType)                   errs.orderType = 'Please choose delivery or pickup';
//     if (details.orderType === 'delivery' && !details.address.trim()) errs.address    = 'Delivery address is required';
//     if (details.orderType === 'pickup'   && !details.pickupTime)     errs.pickupTime = 'Please choose a pickup time';
//     setDetailErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handlePaymentNext = () => {
//     if (!payMethod) return;
//     if (payMethod === 'upi' && !verification.verified) return;
//     setStep('details');
//   };

//   const handleDetailsNext = () => { if (validateDetails()) setStep('review'); };

//   const handleConfirm = () => {
//     setConfirming(true);
//     setTimeout(() => {
//       const itemsText = localItems.map(i => `  • ${i.name} ×${i.quantity} = ₹${i.price * i.quantity}`).join('%0A');
//       const orderInfo = details.orderType === 'pickup'
//         ? `🏪 *Order Type:* Store Pickup%0A⏰ *Pickup Time:* ${details.pickupTime}%0A📍 *From:* 12, Naya Bazaar, newai`
//         : `🚚 *Order Type:* Home Delivery%0A📍 *Address:* ${details.address}`;
//       const payText = payMethod === 'upi'
//         ? `💳 UPI${verification.transactionId ? ` | TxnID: ${verification.transactionId}` : ' (screenshot verified)'}`
//         : '💵 Cash on Delivery';

//       const msg =
//         `🍞 *New Order – Kanha Bakers*%0A%0A` +
//         `*Customer*%0A👤 ${details.name}%0A📞 +91 ${details.phone}${details.email ? `%0A✉️ ${details.email}` : ''}%0A%0A` +
//         `${orderInfo}%0A%0A` +
//         `*Items*%0A${itemsText}%0A%0A` +
//         `Subtotal: ₹${localTotal}%0A` +
//         `${details.orderType === 'pickup' ? 'Pickup' : 'Delivery'}: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}%0A` +
//         `*Grand Total: ₹${grandTotal}*%0A%0A` +
//         `*Payment:* ${payText}%0A%0A_via kanhabakers.in_`;

//       clearCart();
//       window.open(`https://wa.me/919602870828?text=${msg}`, '_blank');
//       setStep('success');
//       setConfirming(false);
//     }, 1800);
//   };

//   const pickupSlots = [
//     '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
//     '12:00 PM','12:30 PM','01:00 PM','02:00 PM',
//     '03:00 PM','04:00 PM','05:00 PM','06:00 PM',
//     '07:00 PM','08:00 PM',
//   ];

//   // ── Empty cart ──────────────────────────────────────────────────────────
//   if (localItems.length === 0 && step !== 'success') {
//     return (
//       <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
//         <div className="text-center">
//           <div className="text-6xl mb-4">🛒</div>
//           <h2 className="font-display text-3xl font-bold text-mocha mb-4">No items to checkout</h2>
//           <Link href="/menu" className="bakery-btn">Browse Menu</Link>
//         </div>
//       </div>
//     );
//   }

//   // ── SUCCESS ─────────────────────────────────────────────────────────────
//   if (step === 'success') {
//     return (
//       <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ type: 'spring', stiffness: 180, damping: 20 }}
//           className="bg-white rounded-3xl shadow-2xl p-10 sm:p-14 text-center max-w-lg w-full border border-bakery-100"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: -30 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
//             className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-400/30"
//           >
//             <CheckCircle size={48} className="text-white" />
//           </motion.div>
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//             <p className="font-accent text-2xl text-caramel mb-1">Thank you!</p>
//             <h2 className="font-display text-3xl font-bold text-mocha mb-3">Order Placed! 🎉</h2>
//             <p className="font-body text-gray-500 mb-1 text-sm">Your order has been sent to our team via WhatsApp.</p>
//             <p className="font-body text-xs text-gray-400 mb-6">
//               {details.orderType === 'pickup'
//                 ? `Ready for pickup at ${details.pickupTime}.`
//                 : 'We will dispatch within 30–45 minutes.'}
//             </p>
//             <div className="grid grid-cols-2 gap-3 mb-7">
//               {[
//                 { icon: '👤', label: 'Name',    val: details.name },
//                 { icon: '📞', label: 'Phone',   val: `+91 ${details.phone}` },
//                 { icon: details.orderType === 'pickup' ? '🏪' : '🚚',
//                   label: 'Type',
//                   val: details.orderType === 'pickup' ? `Pickup · ${details.pickupTime}` : 'Home Delivery' },
//                 { icon: '💰', label: 'Total',   val: `₹${grandTotal}` },
//               ].map(r => (
//                 <div key={r.label} className="bg-bakery-50 rounded-2xl p-4 text-left border border-bakery-100">
//                   <p className="text-base mb-1">{r.icon}</p>
//                   <p className="font-body text-xs text-gray-400">{r.label}</p>
//                   <p className="font-body text-sm font-bold text-mocha">{r.val}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3">
//               <a href="https://wa.me/919602870828" target="_blank" rel="noopener noreferrer"
//                 className="flex-1 py-4 bg-green-500 text-white font-body font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
//                 <MessageCircle size={18} /> Track Order
//               </a>
//               <Link href="/" className="flex-1 bakery-btn justify-center py-4">Back Home</Link>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     );
//   }

//   // ── MAIN ────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fdf6ec] pb-16">

//       {/* Header */}
//       <div className="bg-gradient-to-br from-mocha via-[#4a2510] to-[#3d2012] pt-24 pb-10 px-6 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10"
//           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }} />
//         <div className="max-w-5xl mx-auto relative">
//           <Link href="/cart" className="inline-flex items-center gap-2 text-bakery-300 hover:text-white mb-6 transition-colors font-body text-sm">
//             <ArrowLeft size={15} /> Back to Cart
//           </Link>
//           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             className="font-display text-5xl font-bold text-white mb-2">Checkout</motion.h1>
//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
//             className="font-body text-bakery-200 text-sm">Complete your order in a few simple steps</motion.p>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
//         <StepBar current={step} />

//         <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8">

//           {/* LEFT */}
//           <div>
//             <AnimatePresence mode="wait">

//               {/* ════════ STEP 1: PAYMENT ════════ */}
//               {step === 'payment' && (
//                 <motion.div key="payment"
//                   initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
//                   transition={{ duration: 0.35 }}>
//                   <h2 className="font-display text-2xl font-bold text-mocha mb-6 flex items-center gap-2">
//                     <CreditCard size={22} className="text-bakery-600" /> Choose Payment Method
//                   </h2>

//                   {/* Method cards */}
//                   <div className="grid sm:grid-cols-2 gap-4 mb-7">
//                     <motion.button whileTap={{ scale: 0.97 }} onClick={() => setPayMethod('upi')}
//                       className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 ${payMethod === 'upi' ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-xl shadow-bakery-200/50' : 'border-gray-200 bg-white hover:border-bakery-300 hover:shadow-md'}`}>
//                       {payMethod === 'upi' && (
//                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                           className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
//                           <Check size={12} className="text-white" />
//                         </motion.div>
//                       )}
//                       <div className="w-14 h-14 bg-gradient-to-br from-bakery-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm">📱</div>
//                       <h3 className="font-display text-lg font-bold text-mocha mb-1">Pay with UPI</h3>
//                       <p className="font-body text-xs text-gray-500 leading-relaxed">GPay, PhonePe, Paytm, BHIM & all UPI apps.</p>
//                       <div className="mt-3 flex items-center gap-1.5">
//                         <ShieldCheck size={12} className="text-green-500" />
//                         <span className="text-xs text-green-600 font-semibold">Verified & Secure</span>
//                       </div>
//                     </motion.button>

//                     <motion.button whileTap={{ scale: 0.97 }} onClick={() => setPayMethod('cod')}
//                       className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 ${payMethod === 'cod' ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-xl shadow-bakery-200/50' : 'border-gray-200 bg-white hover:border-bakery-300 hover:shadow-md'}`}>
//                       {payMethod === 'cod' && (
//                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                           className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
//                           <Check size={12} className="text-white" />
//                         </motion.div>
//                       )}
//                       <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm">💵</div>
//                       <h3 className="font-display text-lg font-bold text-mocha mb-1">Cash on Delivery</h3>
//                       <p className="font-body text-xs text-gray-500 leading-relaxed">Pay when your order arrives. No advance needed.</p>
//                       <div className="mt-3 flex items-center gap-1.5">
//                         <Truck size={12} className="text-blue-500" />
//                         <span className="text-xs text-blue-600 font-semibold">Pay on arrival</span>
//                       </div>
//                     </motion.button>
//                   </div>

//                   {/* UPI flow */}
//                   <AnimatePresence>
//                     {payMethod === 'upi' && (
//                       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-5">

//                         {/* Amount banner */}
//                         <div className="bg-gradient-to-r from-mocha to-[#5a2f18] rounded-3xl p-6 flex items-center justify-between">
//                           <div>
//                             <p className="font-body text-xs text-bakery-300 mb-1 uppercase tracking-widest">Pay Exactly</p>
//                             <p className="font-display text-5xl font-bold text-white">₹{grandTotal}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-bakery-300 text-xs mb-1">to</p>
//                             <p className="font-body text-sm font-bold text-white">{upiId}</p>
//                             <p className="text-bakery-400 text-xs mt-1">Kanha Bakers</p>
//                           </div>
//                         </div>

//                         {/* QR + UPI ID */}
//                         <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
//                           <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
//                             <div className="shrink-0">
//                               <div className="p-3 border-2 border-dashed border-bakery-200 rounded-2xl bg-bakery-50">
//                                 <Image src={qrUrl} alt="UPI QR" width={160} height={160} className="block rounded-xl" unoptimized />
//                               </div>
//                               <p className="text-center text-xs text-gray-400 mt-2 font-body">Scan to pay</p>
//                             </div>
//                             <div className="hidden sm:flex flex-col items-center self-stretch">
//                               <div className="w-px flex-1 bg-bakery-100" />
//                               <span className="text-xs text-gray-400 my-2 font-body font-semibold">OR</span>
//                               <div className="w-px flex-1 bg-bakery-100" />
//                             </div>
//                             <div className="sm:hidden w-full flex items-center gap-2">
//                               <div className="flex-1 h-px bg-bakery-100" />
//                               <span className="text-xs text-gray-400 font-body font-semibold">OR</span>
//                               <div className="flex-1 h-px bg-bakery-100" />
//                             </div>
//                             <div className="flex-1 space-y-4">
//                               <div>
//                                 <p className="font-body text-xs text-gray-400 mb-2 uppercase tracking-wider">UPI ID</p>
//                                 <div className="flex items-center gap-3 p-4 bg-bakery-50 rounded-2xl border border-bakery-100">
//                                   <span className="font-body font-bold text-mocha text-base flex-1">{upiId}</span>
//                                   <motion.button whileTap={{ scale: 0.9 }} onClick={copyUPI}
//                                     className={`p-2.5 rounded-xl transition-all duration-300 ${copied ? 'bg-green-500 text-white' : 'bg-white border border-bakery-200 text-bakery-600 hover:bg-bakery-600 hover:text-white'}`}>
//                                     {copied ? <Check size={15} /> : <Copy size={15} />}
//                                   </motion.button>
//                                 </div>
//                                 {copied && (
//                                   <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                                     className="text-xs text-green-500 mt-1 font-semibold">✓ Copied!</motion.p>
//                                 )}
//                               </div>
//                               <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
//                                 <p className="font-body text-xs text-amber-800 font-bold mb-1 flex items-center gap-1.5">
//                                   <AlertCircle size={13} /> Important
//                                 </p>
//                                 <p className="font-body text-xs text-amber-700 leading-relaxed">
//                                   After paying, upload your screenshot below to confirm your order.
//                                 </p>
//                               </div>
//                               <div className="flex gap-2 flex-wrap">
//                                 {['GPay','PhonePe','Paytm','BHIM','Amazon Pay'].map(app => (
//                                   <span key={app} className="text-xs font-semibold bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">{app}</span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Screenshot upload */}
//                         <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="w-8 h-8 bg-bakery-100 rounded-xl flex items-center justify-center">
//                               <FileCheck size={16} className="text-bakery-700" />
//                             </div>
//                             <div>
//                               <h4 className="font-display text-base font-bold text-mocha">Payment Verification</h4>
//                               <p className="font-body text-xs text-gray-400">Upload your payment screenshot</p>
//                             </div>
//                             {verification.verified && (
//                               <div className="ml-auto flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
//                                 <CheckCircle size={13} /> Verified
//                               </div>
//                             )}
//                           </div>

//                           {!verification.screenshotPreview ? (
//                             <div onDrop={handleDrop} onDragOver={e => e.preventDefault()}
//                               onClick={() => fileInputRef.current?.click()}
//                               className="border-2 border-dashed border-bakery-200 rounded-2xl p-8 text-center cursor-pointer hover:border-bakery-400 hover:bg-bakery-50/50 transition-all group">
//                               <div className="w-14 h-14 bg-bakery-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-bakery-100 transition-colors">
//                                 <Upload size={24} className="text-bakery-500" />
//                               </div>
//                               <p className="font-body font-semibold text-mocha mb-1">Drop screenshot here</p>
//                               <p className="font-body text-xs text-gray-400 mb-4">or click to browse · PNG, JPG · Max 10MB</p>
//                               <span className="px-4 py-2 bg-bakery-600 text-white text-sm font-semibold rounded-xl">Choose File</span>
//                               <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
//                             </div>
//                           ) : (
//                             <div className="space-y-4">
//                               <div className="relative rounded-2xl overflow-hidden border-2 border-bakery-100">
//                                 <img src={verification.screenshotPreview} alt="Payment proof"
//                                   className="w-full max-h-56 object-contain bg-gray-50" />
//                                 {!verification.verified && (
//                                   <button onClick={() => setVerification(v => ({ ...v, screenshot: null, screenshotPreview: null, verified: false }))}
//                                     className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600">
//                                     <X size={14} />
//                                   </button>
//                                 )}
//                                 {verification.verified && (
//                                   <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
//                                     <div className="bg-white rounded-full p-3 shadow-xl">
//                                       <CheckCircle size={32} className="text-green-500" />
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                               {!verification.verified && (
//                                 <div>
//                                   <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
//                                     Transaction ID <span className="text-gray-400 font-normal">(optional)</span>
//                                   </label>
//                                   <input type="text" value={verification.transactionId}
//                                     onChange={e => setVerification(v => ({ ...v, transactionId: e.target.value }))}
//                                     placeholder="e.g. T2409261234567"
//                                     className="w-full px-4 py-3 bg-bakery-50 border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100" />
//                                 </div>
//                               )}
//                               {!verification.verified ? (
//                                 <motion.button whileTap={{ scale: 0.97 }} onClick={simulateVerify}
//                                   disabled={verification.uploading}
//                                   className="w-full py-3.5 bg-bakery-600 text-white font-body font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-bakery-700 disabled:opacity-70 shadow-md">
//                                   {verification.uploading ? (
//                                     <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</>
//                                   ) : (
//                                     <><Lock size={15} /> Verify & Confirm Payment</>
//                                   )}
//                                 </motion.button>
//                               ) : (
//                                 <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
//                                   <CheckCircle size={22} className="text-green-500 shrink-0" />
//                                   <div>
//                                     <p className="font-body font-bold text-green-800 text-sm">Payment Verified!</p>
//                                     <p className="font-body text-xs text-green-600">You can now proceed.</p>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         {/* Security badges */}
//                         <div className="flex flex-wrap gap-3">
//                           {[{ icon: '🔒', label: '256-bit Encrypted' }, { icon: '✅', label: 'RBI Compliant' }, { icon: '🛡️', label: 'Screenshot Verified' }].map(b => (
//                             <div key={b.label} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
//                               <span className="text-sm">{b.icon}</span>
//                               <span className="font-body text-xs font-semibold text-gray-600">{b.label}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* COD info */}
//                   <AnimatePresence>
//                     {payMethod === 'cod' && (
//                       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
//                         className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
//                         <div className="flex gap-4 items-start mb-5">
//                           <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">💵</div>
//                           <div>
//                             <h4 className="font-display text-lg font-bold text-mocha">Cash on Delivery</h4>
//                             <p className="font-body text-sm text-gray-500 mt-1">Keep ₹{grandTotal} ready when your order arrives.</p>
//                           </div>
//                         </div>
//                         <div className="space-y-3">
//                           {[
//                             { icon: <Clock size={14} />, text: 'Delivery within 30–45 minutes', color: 'text-blue-500' },
//                             { icon: <CheckCircle size={14} />, text: 'No advance payment needed', color: 'text-green-500' },
//                             { icon: <ShieldCheck size={14} />, text: 'Pay after checking your order', color: 'text-bakery-600' },
//                           ].map((item, i) => (
//                             <div key={i} className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl ${item.color}`}>
//                               {item.icon}
//                               <span className="font-body text-sm text-gray-700">{item.text}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   <motion.button whileTap={{ scale: 0.97 }} onClick={handlePaymentNext}
//                     disabled={!payMethod || (payMethod === 'upi' && !verification.verified)}
//                     className="mt-6 w-full bakery-btn justify-center py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed shadow-xl">
//                     Continue to Details <ChevronRight size={18} />
//                   </motion.button>
//                   {payMethod === 'upi' && !verification.verified && (
//                     <p className="text-center text-xs text-amber-600 mt-2 font-semibold">
//                       ⚠️ Verify your UPI payment to continue
//                     </p>
//                   )}
//                 </motion.div>
//               )}

//               {/* ════════ STEP 2: DETAILS ════════ */}
//               {step === 'details' && (
//                 <motion.div key="details"
//                   initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
//                   transition={{ duration: 0.35 }}>
//                   <div className="flex items-center justify-between mb-6">
//                     <h2 className="font-display text-2xl font-bold text-mocha flex items-center gap-2">
//                       <User size={22} className="text-bakery-600" /> Your Details
//                     </h2>
//                     <button onClick={() => setStep('payment')}
//                       className="text-sm text-bakery-600 font-semibold flex items-center gap-1">
//                       <ArrowLeft size={14} /> Back
//                     </button>
//                   </div>

//                   <div className="space-y-5">
//                     {/* Personal info */}
//                     <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6 space-y-5">
//                       <h4 className="font-display text-base font-bold text-mocha">Personal Info</h4>
//                       <div className="grid sm:grid-cols-2 gap-5">
//                         <div>
//                           <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Full Name *</label>
//                           <div className="relative">
//                             <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                             <input value={details.name} onChange={e => setDetails(d => ({ ...d, name: e.target.value }))}
//                               placeholder="Your full name"
//                               className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 transition-all ${detailErrors.name ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'}`} />
//                           </div>
//                           {detailErrors.name && <p className="text-red-500 text-xs mt-1">{detailErrors.name}</p>}
//                         </div>
//                         <div>
//                           <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Mobile *</label>
//                           <div className="relative">
//                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">+91</span>
//                             <input value={details.phone}
//                               onChange={e => setDetails(d => ({ ...d, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
//                               placeholder="10-digit mobile"
//                               className={`w-full pl-14 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 transition-all ${detailErrors.phone ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'}`} />
//                           </div>
//                           {detailErrors.phone && <p className="text-red-500 text-xs mt-1">{detailErrors.phone}</p>}
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
//                           Email <span className="font-normal text-gray-400">(optional)</span>
//                         </label>
//                         <div className="relative">
//                           <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                           <input type="email" value={details.email} onChange={e => setDetails(d => ({ ...d, email: e.target.value }))}
//                             placeholder="For order confirmation"
//                             className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 transition-all ${detailErrors.email ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'}`} />
//                         </div>
//                         {detailErrors.email && <p className="text-red-500 text-xs mt-1">{detailErrors.email}</p>}
//                       </div>
//                     </div>

//                     {/* ── ORDER TYPE ── */}
//                     <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
//                       <h4 className="font-display text-base font-bold text-mocha mb-4">How do you want your order?</h4>
//                       {detailErrors.orderType && (
//                         <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
//                           <AlertCircle size={12} /> {detailErrors.orderType}
//                         </p>
//                       )}

//                       <div className="grid sm:grid-cols-2 gap-4 mb-5">
//                         {/* Delivery */}
//                         <motion.button whileTap={{ scale: 0.97 }}
//                           onClick={() => setDetails(d => ({ ...d, orderType: 'delivery', pickupTime: '' }))}
//                           className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${details.orderType === 'delivery' ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-lg' : 'border-gray-200 bg-gray-50 hover:border-bakery-300'}`}>
//                           {details.orderType === 'delivery' && (
//                             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                               className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
//                               <Check size={11} className="text-white" />
//                             </motion.div>
//                           )}
//                           <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 text-xl">🚚</div>
//                           <p className="font-display font-bold text-mocha">Home Delivery</p>
//                           <p className="font-body text-xs text-gray-500 mt-1">
//                             {localTotal >= 500 ? '🎉 Free delivery' : '₹49 delivery charge'}
//                           </p>
//                           <p className="font-body text-xs text-gray-400 mt-0.5">30–45 min to your door</p>
//                         </motion.button>

//                         {/* Pickup */}
//                         <motion.button whileTap={{ scale: 0.97 }}
//                           onClick={() => setDetails(d => ({ ...d, orderType: 'pickup', address: '' }))}
//                           className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${details.orderType === 'pickup' ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-lg' : 'border-gray-200 bg-gray-50 hover:border-bakery-300'}`}>
//                           {details.orderType === 'pickup' && (
//                             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
//                               className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
//                               <Check size={11} className="text-white" />
//                             </motion.div>
//                           )}
//                           <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 text-xl">🏪</div>
//                           <p className="font-display font-bold text-mocha">Store Pickup</p>
//                           <p className="font-body text-xs text-green-600 font-semibold mt-1">🎉 Always free</p>
//                           <p className="font-body text-xs text-gray-400 mt-0.5">Ready in 15–20 min</p>
//                         </motion.button>
//                       </div>

//                       {/* Delivery address */}
//                       <AnimatePresence>
//                         {details.orderType === 'delivery' && (
//                           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
//                             <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
//                               Delivery Address *
//                             </label>
//                             <div className="relative">
//                               <MapPin size={15} className="absolute left-4 top-4 text-gray-400" />
//                               <textarea value={details.address} onChange={e => setDetails(d => ({ ...d, address: e.target.value }))}
//                                 placeholder="House/Flat no., Street, Area, newai"
//                                 rows={3}
//                                 className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 resize-none transition-all ${detailErrors.address ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'}`} />
//                             </div>
//                             {detailErrors.address && <p className="text-red-500 text-xs mt-1">{detailErrors.address}</p>}
//                             <p className="font-body text-xs text-gray-400 mt-2 flex items-center gap-1.5">
//                               <Navigation size={11} /> We currently deliver within newai city only.
//                             </p>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>

//                       {/* Pickup time slots */}
//                       <AnimatePresence>
//                         {details.orderType === 'pickup' && (
//                           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>

//                             {/* Store info */}
//                             <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-4">
//                               <Store size={18} className="text-amber-600 shrink-0 mt-0.5" />
//                               <div>
//                                 <p className="font-body font-bold text-amber-800 text-sm">Pickup Location</p>
//                                 <p className="font-body text-xs text-amber-700 mt-0.5">12, Naya Bazaar, newai, Rajasthan 305001</p>
//                                 <p className="font-body text-xs text-amber-600 mt-1">⏰ Mon–Sat 7am–9pm · Sun 8am–7pm</p>
//                               </div>
//                             </div>

//                             <label className="block font-body text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
//                               Choose Pickup Time *
//                             </label>
//                             <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
//                               {pickupSlots.map(slot => (
//                                 <button key={slot} onClick={() => setDetails(d => ({ ...d, pickupTime: slot }))}
//                                   className={`py-2.5 px-1 rounded-xl text-xs font-bold font-body transition-all duration-200 border-2 ${details.pickupTime === slot ? 'bg-bakery-600 text-white border-bakery-600 shadow-md shadow-bakery-600/25' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-bakery-400 hover:text-bakery-700'}`}>
//                                   {slot}
//                                 </button>
//                               ))}
//                             </div>
//                             {detailErrors.pickupTime && (
//                               <p className="text-red-500 text-xs mt-2">{detailErrors.pickupTime}</p>
//                             )}
//                             {details.pickupTime && (
//                               <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
//                                 className="mt-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
//                                 <Clock size={14} className="text-green-500" />
//                                 <p className="font-body text-sm text-green-700">
//                                   Ready by <strong>{details.pickupTime}</strong>
//                                 </p>
//                               </motion.div>
//                             )}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </div>

//                   <motion.button whileTap={{ scale: 0.97 }} onClick={handleDetailsNext}
//                     className="mt-6 w-full bakery-btn justify-center py-4 text-base shadow-xl">
//                     Review Order <ChevronRight size={18} />
//                   </motion.button>
//                 </motion.div>
//               )}

//               {/* ════════ STEP 3: REVIEW ════════ */}
//               {step === 'review' && (
//                 <motion.div key="review"
//                   initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
//                   transition={{ duration: 0.35 }}>
//                   <div className="flex items-center justify-between mb-6">
//                     <h2 className="font-display text-2xl font-bold text-mocha flex items-center gap-2">
//                       <Eye size={22} className="text-bakery-600" /> Review & Confirm
//                     </h2>
//                     <button onClick={() => setStep('details')}
//                       className="text-sm text-bakery-600 font-semibold flex items-center gap-1">
//                       <ArrowLeft size={14} /> Back
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     {/* Customer + order type */}
//                     <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <h4 className="font-display text-base font-bold text-mocha flex items-center gap-2">
//                           {details.orderType === 'pickup'
//                             ? <Store size={16} className="text-bakery-600" />
//                             : <Truck size={16} className="text-bakery-600" />}
//                           {details.orderType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
//                         </h4>
//                         <button onClick={() => setStep('details')}
//                           className="text-xs text-bakery-600 font-bold flex items-center gap-1 bg-bakery-50 px-3 py-1.5 rounded-xl border border-bakery-100">
//                           <Edit3 size={12} /> Edit
//                         </button>
//                       </div>
//                       <div className="grid sm:grid-cols-2 gap-3">
//                         <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
//                           <p className="font-body text-xs text-gray-400 mb-0.5">👤 Name</p>
//                           <p className="font-body text-sm font-semibold text-mocha">{details.name}</p>
//                         </div>
//                         <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
//                           <p className="font-body text-xs text-gray-400 mb-0.5">📞 Phone</p>
//                           <p className="font-body text-sm font-semibold text-mocha">+91 {details.phone}</p>
//                         </div>
//                         {details.orderType === 'delivery' ? (
//                           <div className="sm:col-span-2 bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
//                             <p className="font-body text-xs text-gray-400 mb-0.5">📍 Delivery Address</p>
//                             <p className="font-body text-sm font-semibold text-mocha">{details.address}</p>
//                           </div>
//                         ) : (
//                           <>
//                             <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
//                               <p className="font-body text-xs text-gray-400 mb-0.5">🏪 Pickup From</p>
//                               <p className="font-body text-sm font-semibold text-mocha">12, Naya Bazaar, newai</p>
//                             </div>
//                             <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
//                               <p className="font-body text-xs text-gray-400 mb-0.5">⏰ Pickup Time</p>
//                               <p className="font-body text-sm font-semibold text-mocha">{details.pickupTime}</p>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     {/* Payment */}
//                     <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-5">
//                       <div className="flex items-center justify-between mb-3">
//                         <h4 className="font-display text-base font-bold text-mocha flex items-center gap-2">
//                           <CreditCard size={16} className="text-bakery-600" /> Payment
//                         </h4>
//                         <button onClick={() => setStep('payment')}
//                           className="text-xs text-bakery-600 font-bold flex items-center gap-1 bg-bakery-50 px-3 py-1.5 rounded-xl border border-bakery-100">
//                           <Edit3 size={12} /> Edit
//                         </button>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-bakery-50 rounded-2xl border border-bakery-100">
//                         <span className="text-2xl">{payMethod === 'upi' ? '📱' : '💵'}</span>
//                         <div>
//                           <p className="font-body font-bold text-mocha text-sm">
//                             {payMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
//                           </p>
//                           {payMethod === 'upi' && (
//                             <p className="font-body text-xs text-green-600 font-semibold flex items-center gap-1">
//                               <CheckCircle size={11} /> Screenshot verified
//                               {verification.transactionId && ` · ${verification.transactionId}`}
//                             </p>
//                           )}
//                           {payMethod === 'cod' && (
//                             <p className="font-body text-xs text-gray-500">
//                               Pay ₹{grandTotal} on {details.orderType === 'pickup' ? 'pickup' : 'delivery'}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Editable items */}
//                     <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
//                       <h4 className="font-display text-base font-bold text-mocha mb-1 flex items-center gap-2">
//                         <Package size={16} className="text-bakery-600" /> Your Items
//                       </h4>
//                       <p className="font-body text-xs text-gray-400 mb-4">Tap + / − to edit quantities</p>
//                       <div className="space-y-3">
//                         {localItems.map(item => (
//                           <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-bakery-50 last:border-0">
//                             <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-bakery-50 shrink-0">
//                               <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
//                             </div>
//                             <div className="flex-1">
//                               <p className="font-body text-sm font-semibold text-mocha">{item.name}</p>
//                               <p className="font-body text-xs text-gray-400">₹{item.price}</p>
//                             </div>
//                             <div className="flex items-center gap-1.5 bg-bakery-50 rounded-xl px-2 py-1 border border-bakery-100">
//                               <button onClick={() => handleLocalQty(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-400 hover:bg-red-50 transition-all">
//                                 {item.quantity === 1 ? <Trash2 size={11} /> : <Minus size={11} />}
//                               </button>
//                               <span className="font-bold text-sm text-mocha w-5 text-center">{item.quantity}</span>
//                               <button onClick={() => handleLocalQty(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 rounded-lg bg-bakery-600 shadow-sm flex items-center justify-center text-white hover:bg-bakery-700 transition-all">
//                                 <Plus size={11} />
//                               </button>
//                             </div>
//                             <span className="font-bold text-sm text-bakery-700 w-16 text-right">₹{item.price * item.quantity}</span>
//                           </div>
//                         ))}
//                         {localItems.length === 0 && (
//                           <p className="text-center text-gray-400 py-4 font-body text-sm">All items removed</p>
//                         )}
//                       </div>
//                     </div>

//                     {/* WhatsApp notice */}
//                     <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
//                       <MessageCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
//                       <div>
//                         <p className="font-body font-bold text-green-800 text-sm">Order via WhatsApp</p>
//                         <p className="font-body text-xs text-green-700 mt-0.5">
//                           Tapping "Confirm" opens WhatsApp with your full order details pre-filled.
//                         </p>
//                       </div>
//                     </div>

//                     <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirm}
//                       disabled={confirming || localItems.length === 0}
//                       className="w-full bakery-btn justify-center py-5 text-base shadow-2xl shadow-bakery-600/30 disabled:opacity-50">
//                       {confirming ? (
//                         <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending to WhatsApp...</>
//                       ) : (
//                         <><MessageCircle size={18} /> Confirm Order on WhatsApp</>
//                       )}
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* RIGHT — sticky summary */}
//           <div className="hidden lg:block">
//             <div className="sticky top-24 space-y-4">
//               <OrderPanel
//                 items={localItems} total={localTotal}
//                 deliveryFee={deliveryFee} grandTotal={grandTotal}
//                 orderType={details.orderType}
//               />
//               <div className="bg-white rounded-2xl border border-bakery-100 shadow-sm p-4 flex items-center gap-3">
//                 <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">
//                   {details.orderType === 'pickup' ? '🏪' : '⏱️'}
//                 </div>
//                 <div>
//                   <p className="font-body text-xs text-gray-400">
//                     {details.orderType === 'pickup' ? 'Ready for pickup in' : 'Estimated Delivery'}
//                   </p>
//                   <p className="font-body font-bold text-mocha text-sm">
//                     {details.orderType === 'pickup' ? '15 – 20 minutes' : '30 – 45 minutes'}
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-white rounded-2xl border border-bakery-100 shadow-sm p-4 flex items-center gap-3">
//                 <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">💬</div>
//                 <div>
//                   <p className="font-body text-xs text-gray-400">Need help?</p>
//                   <a href="https://wa.me/919602870828" target="_blank" rel="noopener noreferrer"
//                     className="font-body font-bold text-green-600 text-sm hover:underline">Chat on WhatsApp</a>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Copy, ArrowLeft, ShieldCheck,
  Truck, CreditCard, User, MapPin, Mail, Edit3,
  Package, MessageCircle, ChevronRight,
  AlertCircle, Clock, Plus, Minus, Trash2, Eye,
  Check, Store, Navigation, Hash, Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

// ── Types ──────────────────────────────────────────────────────────────────
type PaymentMethod = 'upi' | 'cod' | null;
type OrderType     = 'delivery' | 'pickup' | null;
type Step          = 'payment' | 'details' | 'review' | 'success';

interface DeliveryDetails {
  name:       string;
  phone:      string;
  email:      string;
  address:    string;
  orderType:  OrderType;
  pickupTime: string;
}

interface UPIState {
  transactionId: string;
  error:         string;
  verified:      boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────
// UPI transaction IDs are typically 12-22 alphanumeric characters
const TXN_REGEX = /^[A-Za-z0-9]{10,25}$/;

// ── Step bar ───────────────────────────────────────────────────────────────
const STEPS: { key: Step; label: string; icon: typeof User }[] = [
  { key: 'payment', label: 'Payment', icon: CreditCard  },
  { key: 'details', label: 'Details', icon: User        },
  { key: 'review',  label: 'Review',  icon: Eye         },
  { key: 'success', label: 'Done',    icon: CheckCircle },
];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex(s => s.key === current);
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((s, i) => {
        const done   = i < idx;
        const active = i === idx;
        const Icon   = s.icon;
        return (
          <div key={s.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  backgroundColor: done ? '#22c55e' : active ? '#c46e1f' : '#e5e7eb',
                  scale: active ? 1.12 : 1,
                }}
                transition={{ duration: 0.35 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              >
                {done
                  ? <Check size={18} className="text-white" />
                  : <Icon size={16} className={active ? 'text-white' : 'text-gray-400'} />
                }
              </motion.div>
              <span className={`text-xs font-body font-semibold hidden sm:block ${
                active ? 'text-bakery-700' : done ? 'text-green-600' : 'text-gray-400'
              }`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-12 sm:w-20 mx-1 rounded transition-colors duration-500 ${
                i < idx ? 'bg-green-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Order summary panel ────────────────────────────────────────────────────
function OrderPanel({
  items, total, deliveryFee, grandTotal, orderType,
}: {
  items: any[]; total: number; deliveryFee: number; grandTotal: number; orderType: OrderType;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-bakery-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-bakery-50 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-mocha flex items-center gap-2">
          <Package size={18} className="text-bakery-600" /> Order Summary
        </h3>
        <span className="text-xs font-semibold bg-bakery-50 text-bakery-700 px-3 py-1 rounded-full border border-bakery-100">
          {items.reduce((s, i) => s + i.quantity, 0)} items
        </span>
      </div>
      <div className="px-6 py-3 max-h-60 overflow-y-auto space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-bakery-50 last:border-0">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-bakery-50 shrink-0 shadow-sm">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="44px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-mocha truncate">{item.name}</p>
              <p className="font-body text-xs text-gray-400">₹{item.price} × {item.quantity}</p>
            </div>
            <span className="font-body font-bold text-sm text-bakery-700">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 bg-bakery-50/60 space-y-2">
        <div className="flex justify-between text-sm font-body text-gray-500">
          <span>Subtotal</span><span>₹{total}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-gray-500">{orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
          <span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : 'text-gray-700'}>
            {deliveryFee === 0 ? '🎉 FREE' : `₹${deliveryFee}`}
          </span>
        </div>
        <div className="pt-2 border-t border-bakery-200 flex justify-between items-center">
          <span className="font-display font-bold text-mocha">Total</span>
          <span className="font-display text-2xl font-bold text-bakery-700">₹{grandTotal}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();

  const [localItems, setLocalItems] = useState(cartItems);
  const [step,       setStep]       = useState<Step>('payment');
  const [payMethod,  setPayMethod]  = useState<PaymentMethod>(null);
  const [copied,     setCopied]     = useState(false);
  const [confirming, setConfirming] = useState(false);

  const [details, setDetails] = useState<DeliveryDetails>({
    name: '', phone: '', email: '', address: '',
    orderType: null, pickupTime: '',
  });
  const [detailErrors, setDetailErrors] = useState<Partial<Record<keyof DeliveryDetails, string>>>({});

  // UPI state — no screenshot, just transaction ID
  const [upi, setUpi] = useState<UPIState>({
    transactionId: '', error: '', verified: false,
  });

  const upiId      = '9602870828@ybl';
  const localTotal = localItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = details.orderType === 'pickup' ? 0 : localTotal >= 500 ? 0 : 49;
  const grandTotal  = localTotal + deliveryFee;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&bgcolor=ffffff&color=3d2012&data=upi://pay?pa=${encodeURIComponent(upiId)}%26pn=KanhaBakers%26am=${grandTotal}%26cu=INR%26tn=KanhaBakersOrder`;

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleLocalQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) setLocalItems(prev => prev.filter(i => i.id !== id));
    else          setLocalItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Validate transaction ID on every keystroke
  const handleTxnChange = (val: string) => {
    // Allow only alphanumeric, uppercase automatically
    const clean = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    let error = '';
    if (clean.length > 0 && clean.length < 10) error = 'Transaction ID must be at least 10 characters';
    if (clean.length > 25)                      error = 'Transaction ID cannot exceed 25 characters';
    setUpi({ transactionId: clean, error, verified: TXN_REGEX.test(clean) });
  };

  // Validate delivery details
  const validateDetails = () => {
    const errs: Partial<Record<keyof DeliveryDetails, string>> = {};
    if (!details.name.trim())                 errs.name      = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(details.phone)) errs.phone     = 'Valid 10-digit mobile required';
    if (details.email && !/\S+@\S+\.\S+/.test(details.email)) errs.email = 'Invalid email';
    if (!details.orderType)                   errs.orderType = 'Please choose delivery or pickup';
    if (details.orderType === 'delivery' && !details.address.trim()) errs.address    = 'Delivery address is required';
    if (details.orderType === 'pickup'   && !details.pickupTime)     errs.pickupTime = 'Please choose a pickup time';
    setDetailErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePaymentNext = () => {
    if (!payMethod) return;
    if (payMethod === 'upi' && !upi.verified) return;
    setStep('details');
  };

  const handleDetailsNext = () => { if (validateDetails()) setStep('review'); };

  // Build & open WhatsApp message — includes screenshot reminder for UPI
  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      const itemsText = localItems
        .map(i => `  • ${i.name} ×${i.quantity} = ₹${i.price * i.quantity}`)
        .join('%0A');

      const orderInfo = details.orderType === 'pickup'
        ? `🏪 *Order Type:* Store Pickup%0A⏰ *Pickup Time:* ${details.pickupTime}%0A📍 *From:* 12, Naya Bazaar, newai`
        : `🚚 *Order Type:* Home Delivery%0A📍 *Address:* ${details.address}`;

      const payText = payMethod === 'upi'
        ? `💳 UPI | Transaction ID: ${upi.transactionId}`
        : '💵 Cash on Delivery';

      // Screenshot reminder appended for UPI orders
      const screenshotReminder = payMethod === 'upi'
        ? `%0A%0A📸 *Please send a screenshot of your payment for verification of Transaction ID ${upi.transactionId}*`
        : '';

      const msg =
        `🍞 *New Order – Kanha Bakers*%0A%0A` +
        `*Customer*%0A` +
        `👤 ${details.name}%0A` +
        `📞 +91 ${details.phone}${details.email ? `%0A✉️ ${details.email}` : ''}%0A%0A` +
        `${orderInfo}%0A%0A` +
        `*Items*%0A${itemsText}%0A%0A` +
        `Subtotal: ₹${localTotal}%0A` +
        `${details.orderType === 'pickup' ? 'Pickup' : 'Delivery'}: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}%0A` +
        `*Grand Total: ₹${grandTotal}*%0A%0A` +
        `*Payment:* ${payText}` +
        screenshotReminder +
        `%0A%0A_via kanhabakers.in_`;

      clearCart();
      window.open(`https://wa.me/919602870828?text=${msg}`, '_blank');
      setStep('success');
      setConfirming(false);
    }, 1600);
  };

  const pickupSlots = [
    '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
    '12:00 PM','12:30 PM','01:00 PM','02:00 PM',
    '03:00 PM','04:00 PM','05:00 PM','06:00 PM',
    '07:00 PM','08:00 PM',
  ];

  // ── Strength indicator for txn ID ─────────────────────────────────────
  const txnStrength = upi.transactionId.length === 0 ? 0
    : upi.transactionId.length < 10 ? 1
    : upi.transactionId.length < 16 ? 2
    : 3;
  const strengthLabel  = ['', 'Too short', 'Almost valid', 'Valid ✓'];
  const strengthColor  = ['', 'bg-red-400', 'bg-amber-400', 'bg-green-500'];
  const strengthText   = ['', 'text-red-500', 'text-amber-600', 'text-green-600'];

  // ── Empty cart ──────────────────────────────────────────────────────────
  if (localItems.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-display text-3xl font-bold text-mocha mb-4">No items to checkout</h2>
          <Link href="/menu" className="bakery-btn">Browse Menu</Link>
        </div>
      </div>
    );
  }

  // ── SUCCESS ─────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-cream pt-24 pb-12 flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 text-center max-w-lg w-full border border-bakery-100"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-400/30"
          >
            <CheckCircle size={40} className="text-white sm:hidden" />
            <CheckCircle size={48} className="text-white hidden sm:block" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <p className="font-accent text-xl sm:text-2xl text-caramel mb-1">Thank you!</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-mocha mb-3">Order Placed! 🎉</h2>
            <p className="font-body text-gray-500 mb-1 text-sm max-w-[280px] sm:max-w-none mx-auto">Your order has been sent to our team via WhatsApp.</p>
            <p className="font-body text-xs text-gray-400 mb-5">
              {details.orderType === 'pickup'
                ? `Ready for pickup at ${details.pickupTime}.`
                : 'We will dispatch within 30–45 minutes.'}
            </p>

            {/* Screenshot reminder for UPI */}
            {payMethod === 'upi' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-5 p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-left flex items-start gap-3"
              >
                <span className="text-2xl shrink-0">📸</span>
                <div>
                  <p className="font-body font-bold text-amber-800 text-sm mb-0.5">Action Required</p>
                  <p className="font-body text-xs text-amber-700 leading-relaxed">
                    Please send a <strong>screenshot of your payment</strong> in the WhatsApp chat for verification of your Transaction ID{' '}
                    <span className="font-mono font-bold text-amber-900">{upi.transactionId}</span>.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon: '👤', label: 'Name',  val: details.name },
                { icon: '📞', label: 'Phone', val: `+91 ${details.phone}` },
                { icon: details.orderType === 'pickup' ? '🏪' : '🚚',
                  label: 'Type',
                  val: details.orderType === 'pickup'
                    ? `Pickup · ${details.pickupTime}`
                    : 'Home Delivery' },
                { icon: '💰', label: 'Total', val: `₹${grandTotal}` },
              ].map(r => (
                <div key={r.label} className="bg-bakery-50 rounded-2xl p-3 sm:p-4 text-left border border-bakery-100 min-w-0">
                  <p className="text-base mb-1">{r.icon}</p>
                  <p className="font-body text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">{r.label}</p>
                  <p className="font-body text-xs sm:text-sm font-bold text-mocha truncate" title={r.val}>{r.val}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919602870828"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-4 bg-green-500 text-white font-body font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 active:scale-95"
              >
                <MessageCircle size={18} />
                <span>{payMethod === 'upi' ? 'Send Screenshot' : 'Track Order'}</span>
              </a>
              <Link href="/" className="w-full sm:flex-1 bakery-btn justify-center py-4 rounded-2xl active:scale-95">
                Back Home
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ── MAIN ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fdf6ec] pb-16">

      {/* Header */}
      <div className="bg-gradient-to-br from-mocha via-[#4a2510] to-[#3d2012] pt-24 pb-10 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="max-w-5xl mx-auto relative">
          <Link href="/cart" className="inline-flex items-center gap-2 text-bakery-300 hover:text-white mb-6 transition-colors font-body text-sm">
            <ArrowLeft size={15} /> Back to Cart
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-bold text-white mb-2"
          >
            Checkout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="font-body text-bakery-200 text-sm"
          >
            Complete your order in a few simple steps
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <StepBar current={step} />

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8">

          {/* ── LEFT ── */}
          <div>
            <AnimatePresence mode="wait">

              {/* ════════ STEP 1: PAYMENT ════════ */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.35 }}
                >
                  <h2 className="font-display text-2xl font-bold text-mocha mb-6 flex items-center gap-2">
                    <CreditCard size={22} className="text-bakery-600" /> Choose Payment Method
                  </h2>

                  {/* Method selector */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-7">
                    {/* UPI */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPayMethod('upi')}
                      className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 ${
                        payMethod === 'upi'
                          ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-xl shadow-bakery-200/50'
                          : 'border-gray-200 bg-white hover:border-bakery-300 hover:shadow-md'
                      }`}
                    >
                      {payMethod === 'upi' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                      <div className="w-14 h-14 bg-gradient-to-br from-bakery-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm">📱</div>
                      <h3 className="font-display text-lg font-bold text-mocha mb-1">Pay with UPI</h3>
                      <p className="font-body text-xs text-gray-500 leading-relaxed">GPay, PhonePe, Paytm, BHIM & all UPI apps.</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-green-500" />
                        <span className="text-xs text-green-600 font-semibold">Secure & Instant</span>
                      </div>
                    </motion.button>

                    {/* COD */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPayMethod('cod')}
                      className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 ${
                        payMethod === 'cod'
                          ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-xl shadow-bakery-200/50'
                          : 'border-gray-200 bg-white hover:border-bakery-300 hover:shadow-md'
                      }`}
                    >
                      {payMethod === 'cod' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-sm">💵</div>
                      <h3 className="font-display text-lg font-bold text-mocha mb-1">Cash on Delivery</h3>
                      <p className="font-body text-xs text-gray-500 leading-relaxed">Pay when your order arrives. No advance needed.</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <Truck size={12} className="text-blue-500" />
                        <span className="text-xs text-blue-600 font-semibold">Pay on arrival</span>
                      </div>
                    </motion.button>
                  </div>

                  {/* ── UPI FLOW ── */}
                  <AnimatePresence>
                    {payMethod === 'upi' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
                        className="space-y-5"
                      >
                        {/* Amount banner */}
                        <div className="bg-gradient-to-r from-mocha to-[#5a2f18] rounded-3xl p-6 flex items-center justify-between">
                          <div>
                            <p className="font-body text-xs text-bakery-300 mb-1 uppercase tracking-widest">Pay Exactly</p>
                            <p className="font-display text-5xl font-bold text-white">₹{grandTotal}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-bakery-300 text-xs mb-1">to</p>
                            <p className="font-body text-sm font-bold text-white">{upiId}</p>
                            <p className="text-bakery-400 text-xs mt-1">Kanha Bakers</p>
                          </div>
                        </div>

                        {/* QR + UPI ID */}
                        <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
                          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                            {/* QR */}
                            <div className="shrink-0">
                              <div className="p-3 border-2 border-dashed border-bakery-200 rounded-2xl bg-bakery-50">
                                <Image src={qrUrl} alt="UPI QR" width={160} height={160} className="block rounded-xl" unoptimized />
                              </div>
                              <p className="text-center text-xs text-gray-400 mt-2 font-body">Scan to pay</p>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:flex flex-col items-center self-stretch">
                              <div className="w-px flex-1 bg-bakery-100" />
                              <span className="text-xs text-gray-400 my-2 font-body font-semibold">OR</span>
                              <div className="w-px flex-1 bg-bakery-100" />
                            </div>
                            <div className="sm:hidden w-full flex items-center gap-2">
                              <div className="flex-1 h-px bg-bakery-100" />
                              <span className="text-xs text-gray-400 font-body font-semibold">OR</span>
                              <div className="flex-1 h-px bg-bakery-100" />
                            </div>

                            {/* UPI ID */}
                            <div className="flex-1 space-y-4">
                              <div>
                                <p className="font-body text-xs text-gray-400 mb-2 uppercase tracking-wider">UPI ID</p>
                                <div className="flex items-center gap-3 p-4 bg-bakery-50 rounded-2xl border border-bakery-100">
                                  <span className="font-body font-bold text-mocha text-base flex-1">{upiId}</span>
                                  <motion.button whileTap={{ scale: 0.9 }} onClick={copyUPI}
                                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                                      copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white border border-bakery-200 text-bakery-600 hover:bg-bakery-600 hover:text-white'
                                    }`}
                                  >
                                    {copied ? <Check size={15} /> : <Copy size={15} />}
                                  </motion.button>
                                </div>
                                {copied && (
                                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xs text-green-500 mt-1 font-semibold">
                                    ✓ Copied!
                                  </motion.p>
                                )}
                              </div>

                              {/* Supported apps */}
                              <div className="flex gap-2 flex-wrap">
                                {['GPay','PhonePe','Paytm','BHIM','Amazon Pay'].map(app => (
                                  <span key={app} className="text-xs font-semibold bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">
                                    {app}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── Transaction ID Entry ── */}
                        <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
                          <div className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 bg-bakery-100 rounded-xl flex items-center justify-center">
                              <Hash size={16} className="text-bakery-700" />
                            </div>
                            <div>
                              <h4 className="font-display text-base font-bold text-mocha leading-tight">
                                Enter Transaction ID
                              </h4>
                              <p className="font-body text-xs text-gray-400">
                                Found in your UPI app after payment
                              </p>
                            </div>
                            {upi.verified && (
                              <div className="ml-auto flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                                <CheckCircle size={13} /> Valid
                              </div>
                            )}
                          </div>

                          {/* Where to find */}
                          <div className="flex items-start gap-3 p-3.5 bg-blue-50 border border-blue-200 rounded-2xl mb-4">
                            <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                            <p className="font-body text-xs text-blue-700 leading-relaxed">
                              After paying, open your UPI app → tap the transaction → copy the <strong>Transaction ID / UTR number</strong> (e.g. <span className="font-mono">T240926XXXXXX</span> or <span className="font-mono">4269XXXXXXXXXX</span>).
                            </p>
                          </div>

                          {/* Input */}
                          <div className="relative">
                            <Hash size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={upi.transactionId}
                              onChange={e => handleTxnChange(e.target.value)}
                              placeholder="e.g. T2409261234567"
                              maxLength={25}
                              className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-xl font-mono text-sm font-semibold tracking-wider focus:outline-none transition-all ${
                                upi.transactionId.length === 0
                                  ? 'border-bakery-100 bg-bakery-50 focus:border-bakery-400'
                                  : upi.verified
                                    ? 'border-green-400 bg-green-50 text-green-800'
                                    : upi.error
                                      ? 'border-red-300 bg-red-50 text-red-700'
                                      : 'border-amber-300 bg-amber-50 text-amber-800'
                              }`}
                            />
                            {upi.verified && (
                              <CheckCircle size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                            )}
                          </div>

                          {/* Strength bar */}
                          {upi.transactionId.length > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-1.5">
                              <div className="flex gap-1.5">
                                {[1, 2, 3].map(lvl => (
                                  <div
                                    key={lvl}
                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                      txnStrength >= lvl ? strengthColor[txnStrength] : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className={`text-xs font-semibold font-body ${strengthText[txnStrength]}`}>
                                {strengthLabel[txnStrength]}
                                {upi.transactionId.length > 0 && ` · ${upi.transactionId.length} characters`}
                              </p>
                            </motion.div>
                          )}

                          {/* Error message */}
                          {upi.error && upi.transactionId.length > 0 && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 font-semibold mt-2">
                              <AlertCircle size={12} /> {upi.error}
                            </p>
                          )}

                          {/* Success state */}
                          {upi.verified && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                              className="mt-3 flex items-start gap-3 p-3.5 bg-green-50 border border-green-200 rounded-2xl"
                            >
                              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-body font-bold text-green-800 text-sm">Transaction ID looks valid!</p>
                                <p className="font-body text-xs text-green-600 mt-0.5">
                                  You'll also be reminded to send a payment screenshot on WhatsApp for final verification.
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {/* Screenshot reminder note */}
                          <div className="mt-4 flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
                            <span className="text-xl shrink-0">📸</span>
                            <div>
                              <p className="font-body text-xs font-bold text-amber-800 mb-0.5">Screenshot Required</p>
                              <p className="font-body text-xs text-amber-700 leading-relaxed">
                                After placing the order, you'll need to send a screenshot of your payment on WhatsApp for confirmation.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Security badges */}
                        <div className="flex flex-wrap gap-3">
                          {[
                            { icon: '🔒', label: '256-bit Encrypted' },
                            { icon: '✅', label: 'RBI Compliant UPI' },
                            { icon: '🛡️', label: 'Txn ID Verified' },
                          ].map(b => (
                            <div key={b.label} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                              <span className="text-sm">{b.icon}</span>
                              <span className="font-body text-xs font-semibold text-gray-600">{b.label}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── COD INFO ── */}
                  <AnimatePresence>
                    {payMethod === 'cod' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
                        className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6"
                      >
                        <div className="flex gap-4 items-start mb-5">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">💵</div>
                          <div>
                            <h4 className="font-display text-lg font-bold text-mocha">Cash on Delivery</h4>
                            <p className="font-body text-sm text-gray-500 mt-1">Keep ₹{grandTotal} ready when your order arrives.</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {[
                            { icon: <Clock size={14} />,      text: 'Delivery within 30–45 minutes',  color: 'text-blue-500'    },
                            { icon: <CheckCircle size={14} />, text: 'No advance payment needed',       color: 'text-green-500'   },
                            { icon: <ShieldCheck size={14} />, text: 'Pay after checking your order',   color: 'text-bakery-600'  },
                          ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl ${item.color}`}>
                              {item.icon}
                              <span className="font-body text-sm text-gray-700">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePaymentNext}
                    disabled={!payMethod || (payMethod === 'upi' && !upi.verified)}
                    className="mt-6 w-full bakery-btn justify-center py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
                  >
                    Continue to Details <ChevronRight size={18} />
                  </motion.button>

                  {payMethod === 'upi' && !upi.verified && (
                    <p className="text-center text-xs text-amber-600 mt-2 font-semibold">
                      ⚠️ Enter a valid Transaction ID to continue
                    </p>
                  )}
                </motion.div>
              )}

              {/* ════════ STEP 2: DETAILS ════════ */}
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-mocha flex items-center gap-2">
                      <User size={22} className="text-bakery-600" /> Your Details
                    </h2>
                    <button onClick={() => setStep('payment')} className="text-sm text-bakery-600 font-semibold flex items-center gap-1">
                      <ArrowLeft size={14} /> Back
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* Personal info */}
                    <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6 space-y-5">
                      <h4 className="font-display text-base font-bold text-mocha">Personal Info</h4>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Full Name *</label>
                          <div className="relative">
                            <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              value={details.name}
                              onChange={e => setDetails(d => ({ ...d, name: e.target.value }))}
                              placeholder="Your full name"
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 transition-all ${
                                detailErrors.name ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'
                              }`}
                            />
                          </div>
                          {detailErrors.name && <p className="text-red-500 text-xs mt-1">{detailErrors.name}</p>}
                        </div>
                        {/* Phone */}
                        <div>
                          <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Mobile *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">+91</span>
                            <input
                              value={details.phone}
                              onChange={e => setDetails(d => ({ ...d, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                              placeholder="10-digit mobile"
                              className={`w-full pl-14 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 transition-all ${
                                detailErrors.phone ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'
                              }`}
                            />
                          </div>
                          {detailErrors.phone && <p className="text-red-500 text-xs mt-1">{detailErrors.phone}</p>}
                        </div>
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                          Email <span className="font-normal text-gray-400">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={details.email}
                            onChange={e => setDetails(d => ({ ...d, email: e.target.value }))}
                            placeholder="For order confirmation"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 transition-all ${
                              detailErrors.email ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'
                            }`}
                          />
                        </div>
                        {detailErrors.email && <p className="text-red-500 text-xs mt-1">{detailErrors.email}</p>}
                      </div>
                    </div>

                    {/* ── ORDER TYPE ── */}
                    <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
                      <h4 className="font-display text-base font-bold text-mocha mb-4">How do you want your order?</h4>
                      {detailErrors.orderType && (
                        <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
                          <AlertCircle size={12} /> {detailErrors.orderType}
                        </p>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4 mb-5">
                        {/* Delivery */}
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={() => setDetails(d => ({ ...d, orderType: 'delivery', pickupTime: '' }))}
                          className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                            details.orderType === 'delivery'
                              ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-lg'
                              : 'border-gray-200 bg-gray-50 hover:border-bakery-300'
                          }`}
                        >
                          {details.orderType === 'delivery' && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
                              <Check size={11} className="text-white" />
                            </motion.div>
                          )}
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 text-xl">🚚</div>
                          <p className="font-display font-bold text-mocha">Home Delivery</p>
                          <p className="font-body text-xs text-gray-500 mt-1">
                            {localTotal >= 500 ? '🎉 Free delivery' : '₹49 delivery charge'}
                          </p>
                          <p className="font-body text-xs text-gray-400 mt-0.5">30–45 min to your door</p>
                        </motion.button>

                        {/* Pickup */}
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={() => setDetails(d => ({ ...d, orderType: 'pickup', address: '' }))}
                          className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                            details.orderType === 'pickup'
                              ? 'border-bakery-600 bg-gradient-to-br from-bakery-50 to-orange-50 shadow-lg'
                              : 'border-gray-200 bg-gray-50 hover:border-bakery-300'
                          }`}
                        >
                          {details.orderType === 'pickup' && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-bakery-600 rounded-full flex items-center justify-center">
                              <Check size={11} className="text-white" />
                            </motion.div>
                          )}
                          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 text-xl">🏪</div>
                          <p className="font-display font-bold text-mocha">Store Pickup</p>
                          <p className="font-body text-xs text-green-600 font-semibold mt-1">🎉 Always free</p>
                          <p className="font-body text-xs text-gray-400 mt-0.5">Ready in 15–20 min</p>
                        </motion.button>
                      </div>

                      {/* Delivery address */}
                      <AnimatePresence>
                        {details.orderType === 'delivery' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                          >
                            <label className="block font-body text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                              Delivery Address *
                            </label>
                            <div className="relative">
                              <MapPin size={15} className="absolute left-4 top-4 text-gray-400" />
                              <textarea
                                value={details.address}
                                onChange={e => setDetails(d => ({ ...d, address: e.target.value }))}
                                placeholder="House/Flat no., Street, Area, newai"
                                rows={3}
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:ring-2 resize-none transition-all ${
                                  detailErrors.address ? 'border-red-400 bg-red-50' : 'border-bakery-100 bg-bakery-50 focus:border-bakery-400 focus:ring-bakery-100'
                                }`}
                              />
                            </div>
                            {detailErrors.address && <p className="text-red-500 text-xs mt-1">{detailErrors.address}</p>}
                            <p className="font-body text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                              <Navigation size={11} /> We currently deliver within newai city only.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Pickup time slots */}
                      <AnimatePresence>
                        {details.orderType === 'pickup' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-4">
                              <Store size={18} className="text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-body font-bold text-amber-800 text-sm">Pickup Location</p>
                                <p className="font-body text-xs text-amber-700 mt-0.5">12, Naya Bazaar, newai, Rajasthan 305001</p>
                                <p className="font-body text-xs text-amber-600 mt-1">⏰ Mon–Sat 7am–9pm · Sun 8am–7pm</p>
                              </div>
                            </div>
                            <label className="block font-body text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                              Choose Pickup Time *
                            </label>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                              {pickupSlots.map(slot => (
                                <button
                                  key={slot}
                                  onClick={() => setDetails(d => ({ ...d, pickupTime: slot }))}
                                  className={`py-2.5 px-1 rounded-xl text-xs font-bold font-body transition-all duration-200 border-2 ${
                                    details.pickupTime === slot
                                      ? 'bg-bakery-600 text-white border-bakery-600 shadow-md shadow-bakery-600/25'
                                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-bakery-400 hover:text-bakery-700'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                            {detailErrors.pickupTime && (
                              <p className="text-red-500 text-xs mt-2">{detailErrors.pickupTime}</p>
                            )}
                            {details.pickupTime && (
                              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                className="mt-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                                <Clock size={14} className="text-green-500" />
                                <p className="font-body text-sm text-green-700">
                                  Ready by <strong>{details.pickupTime}</strong>
                                </p>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleDetailsNext}
                    className="mt-6 w-full bakery-btn justify-center py-4 text-base shadow-xl">
                    Review Order <ChevronRight size={18} />
                  </motion.button>
                </motion.div>
              )}

              {/* ════════ STEP 3: REVIEW ════════ */}
              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-mocha flex items-center gap-2">
                      <Eye size={22} className="text-bakery-600" /> Review & Confirm
                    </h2>
                    <button onClick={() => setStep('details')} className="text-sm text-bakery-600 font-semibold flex items-center gap-1">
                      <ArrowLeft size={14} /> Back
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Customer + order type */}
                    <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-display text-base font-bold text-mocha flex items-center gap-2">
                          {details.orderType === 'pickup'
                            ? <Store size={16} className="text-bakery-600" />
                            : <Truck size={16} className="text-bakery-600" />}
                          {details.orderType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
                        </h4>
                        <button onClick={() => setStep('details')}
                          className="text-xs text-bakery-600 font-bold flex items-center gap-1 bg-bakery-50 px-3 py-1.5 rounded-xl border border-bakery-100">
                          <Edit3 size={12} /> Edit
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
                          <p className="font-body text-xs text-gray-400 mb-0.5">👤 Name</p>
                          <p className="font-body text-sm font-semibold text-mocha">{details.name}</p>
                        </div>
                        <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
                          <p className="font-body text-xs text-gray-400 mb-0.5">📞 Phone</p>
                          <p className="font-body text-sm font-semibold text-mocha">+91 {details.phone}</p>
                        </div>
                        {details.orderType === 'delivery' ? (
                          <div className="sm:col-span-2 bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
                            <p className="font-body text-xs text-gray-400 mb-0.5">📍 Delivery Address</p>
                            <p className="font-body text-sm font-semibold text-mocha">{details.address}</p>
                          </div>
                        ) : (
                          <>
                            <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
                              <p className="font-body text-xs text-gray-400 mb-0.5">🏪 Pickup From</p>
                              <p className="font-body text-sm font-semibold text-mocha">12, Naya Bazaar, newai</p>
                            </div>
                            <div className="bg-bakery-50/60 rounded-xl p-3 border border-bakery-100">
                              <p className="font-body text-xs text-gray-400 mb-0.5">⏰ Pickup Time</p>
                              <p className="font-body text-sm font-semibold text-mocha">{details.pickupTime}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-display text-base font-bold text-mocha flex items-center gap-2">
                          <CreditCard size={16} className="text-bakery-600" /> Payment
                        </h4>
                        <button onClick={() => setStep('payment')}
                          className="text-xs text-bakery-600 font-bold flex items-center gap-1 bg-bakery-50 px-3 py-1.5 rounded-xl border border-bakery-100">
                          <Edit3 size={12} /> Edit
                        </button>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-bakery-50 rounded-2xl border border-bakery-100">
                        <span className="text-2xl">{payMethod === 'upi' ? '📱' : '💵'}</span>
                        <div className="flex-1">
                          <p className="font-body font-bold text-mocha text-sm">
                            {payMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
                          </p>
                          {payMethod === 'upi' && (
                            <p className="font-body text-xs text-green-600 font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle size={11} /> Txn ID: <span className="font-mono tracking-wide">{upi.transactionId}</span>
                            </p>
                          )}
                          {payMethod === 'cod' && (
                            <p className="font-body text-xs text-gray-500">
                              Pay ₹{grandTotal} on {details.orderType === 'pickup' ? 'pickup' : 'delivery'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Screenshot reminder in review */}
                      {payMethod === 'upi' && (
                        <div className="mt-3 flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
                          <span className="text-lg shrink-0">📸</span>
                          <p className="font-body text-xs text-amber-700 leading-relaxed">
                            Remember to <strong>send a screenshot</strong> of your UPI payment on WhatsApp after placing the order.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Editable items */}
                    <div className="bg-white rounded-3xl border border-bakery-100 shadow-lg p-6">
                      <h4 className="font-display text-base font-bold text-mocha mb-1 flex items-center gap-2">
                        <Package size={16} className="text-bakery-600" /> Your Items
                      </h4>
                      <p className="font-body text-xs text-gray-400 mb-4">Tap + / − to edit quantities</p>
                      <div className="space-y-3">
                        {localItems.map(item => (
                          <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-bakery-50 last:border-0">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-bakery-50 shrink-0">
                              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1">
                              <p className="font-body text-sm font-semibold text-mocha">{item.name}</p>
                              <p className="font-body text-xs text-gray-400">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-bakery-50 rounded-xl px-2 py-1 border border-bakery-100">
                              <button onClick={() => handleLocalQty(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-400 hover:bg-red-50 transition-all">
                                {item.quantity === 1 ? <Trash2 size={11} /> : <Minus size={11} />}
                              </button>
                              <span className="font-bold text-sm text-mocha w-5 text-center">{item.quantity}</span>
                              <button onClick={() => handleLocalQty(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-lg bg-bakery-600 shadow-sm flex items-center justify-center text-white hover:bg-bakery-700 transition-all">
                                <Plus size={11} />
                              </button>
                            </div>
                            <span className="font-bold text-sm text-bakery-700 w-16 text-right">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                        {localItems.length === 0 && (
                          <p className="text-center text-gray-400 py-4 font-body text-sm">All items removed</p>
                        )}
                      </div>
                    </div>

                    {/* WhatsApp notice */}
                    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                      <MessageCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-body font-bold text-green-800 text-sm">Order via WhatsApp</p>
                        <p className="font-body text-xs text-green-700 mt-0.5">
                          Tapping "Confirm" opens WhatsApp with your full order details pre-filled and ready to send.
                        </p>
                      </div>
                    </div>

                    {/* Confirm button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleConfirm}
                      disabled={confirming || localItems.length === 0}
                      className="w-full bakery-btn justify-center py-5 text-base shadow-2xl shadow-bakery-600/30 disabled:opacity-50"
                    >
                      {confirming ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending to WhatsApp...</>
                      ) : (
                        <><MessageCircle size={18} /> Confirm Order on WhatsApp</>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT — sticky summary ── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <OrderPanel
                items={localItems} total={localTotal}
                deliveryFee={deliveryFee} grandTotal={grandTotal}
                orderType={details.orderType}
              />
              <div className="bg-white rounded-2xl border border-bakery-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">
                  {details.orderType === 'pickup' ? '🏪' : '⏱️'}
                </div>
                <div>
                  <p className="font-body text-xs text-gray-400">
                    {details.orderType === 'pickup' ? 'Ready for pickup in' : 'Estimated Delivery'}
                  </p>
                  <p className="font-body font-bold text-mocha text-sm">
                    {details.orderType === 'pickup' ? '15 – 20 minutes' : '30 – 45 minutes'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-bakery-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">💬</div>
                <div>
                  <p className="font-body text-xs text-gray-400">Need help?</p>
                  <a href="https://wa.me/919602870828" target="_blank" rel="noopener noreferrer"
                    className="font-body font-bold text-green-600 text-sm hover:underline">Chat on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}