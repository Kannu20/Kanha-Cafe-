'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, ChefHat } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Table Booking' },
];

export default function Navbar() {
  const pathname = usePathname();
  const cart = useCart();
  const count = cart?.count ?? 0;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-bakery-200/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-bakery-600 rounded-xl flex items-center justify-center shadow-lg shadow-bakery-600/30 group-hover:scale-110 transition-transform duration-300">
              <ChefHat size={22} className="text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-slate-600 block leading-none">Kanha</span>
              <span className="font-accent text-sm text-caramel leading-none">Bakers</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body font-semibold text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href ? 'text-bakery-600' : 'text-bakery-500 hover:text-bakery-700'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bakery-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Cart + Hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative group">
              <div className="w-10 h-10 rounded-xl bg-bakery-50 border border-bakery-200 flex items-center justify-center text-bakery-700 group-hover:bg-bakery-600 group-hover:text-white group-hover:border-bakery-600 transition-all duration-300 shadow-sm">
                <ShoppingCart size={18} />
              </div>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-bakery-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-bakery-50 border border-bakery-200 flex items-center justify-center text-bakery-700"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col pt-24 px-8"
          >
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`block font-display text-4xl font-bold transition-colors ${
                      pathname === link.href ? 'text-bakery-600' : 'text-mocha hover:text-bakery-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/cart" className="bakery-btn mt-4 w-full justify-center">
                  <ShoppingCart size={16} />
                  Cart ({count})
                </Link>
              </motion.div>
            </div>

            <div className="mt-auto pb-16">
              <p className="font-accent text-3xl text-caramel">Crafted with love.</p>
              <p className="font-body text-sm text-crust mt-1">Since 2008 · Ajmer, Rajasthan</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
// import { GiCupcake } from 'react-icons/gi';
// import { useCart } from '@/context/CartContext';
// import CartPage from '@/app/cart/page';
// import Link from 'next/link';
// import { ShoppingCart, Menu } from 'lucide-react';
// const navLinks = [
//   { label: 'Home',         href: '#home'         },
//   { label: 'Menu',         href: '/menu'         },
//   { label: 'About',        href: '/about'        },
//   { label: 'Table Booking', href: '/booking' },
//   { label: 'Contact',      href: '/contact'      },
// ];

// export default function Navbar() {
//   const { count } = useCart();
//   const [scrolled,    setScrolled]    = useState(false);
//   const [mobileOpen,  setMobileOpen]  = useState(false);
//   const [activeHash,  setActiveHash]  = useState('#home');
//   const [pingKey,     setPingKey]     = useState(0);

//   /* ── Scroll detection ── */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   /* ── Active section via IntersectionObserver ── */
//   useEffect(() => {
//     const ids = navLinks.map((l) => l.href.replace('#', ''));
//     const observers = ids.map((id) => {
//       const el = document.getElementById(id);
//       if (!el) return null;
//       const obs = new IntersectionObserver(
//         ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`); },
//         { rootMargin: '-40% 0px -55% 0px' }
//       );
//       obs.observe(el);
//       return obs;
//     });
//     return () => observers.forEach((o) => o?.disconnect());
//   }, []);

//   /* ── Cart ping ── */
//   // useEffect(() => {
//   //   if (totalItems > 0) setPingKey((k) => k + 1);
//   // }, [totalItems]);

//   /* ── Close mobile on resize ── */
//   useEffect(() => {
//     const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
//     window.addEventListener('resize', fn);
//     return () => window.removeEventListener('resize', fn);
//   }, []);

//   return (
//     <>
//       {/* ═══════════════════════════════════
//           MAIN NAV BAR
//       ═══════════════════════════════════ */}
//       <motion.nav
//         initial={{ y: -90, opacity: 0 }}
//         animate={{ y: 0,   opacity: 1 }}
//         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//         className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
//         style={{
//           paddingTop:    scrolled ? '10px'  : '20px',
//           paddingBottom: scrolled ? '10px'  : '20px',
//           /* Scrolled: crisp glass. Hero: very subtle dark strip so text always reads */
//           background: scrolled
//             ? 'rgba(253,246,236,0.90)'
//             : 'linear-gradient(to bottom, rgba(20,10,4,0.55) 0%, rgba(20,10,4,0.0) 100%)',
//           backdropFilter:         scrolled ? 'blur(20px) saturate(1.5)' : 'none',
//           WebkitBackdropFilter:   scrolled ? 'blur(20px) saturate(1.5)' : 'none',
//           boxShadow: scrolled ? '0 4px 32px rgba(198,124,78,0.18)' : 'none',
//           borderBottom: scrolled ? '1px solid rgba(198,124,78,0.15)' : 'none',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

//           {/* ── Logo ── */}
//           <motion.a
//             href="#home"
//             className="flex items-center gap-3 group flex-shrink-0"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             <motion.div
//               className="w-10 h-10 rounded-xl flex items-center justify-center"
//               style={{
//                 background:  'linear-gradient(135deg, #C67C4E 0%, #D4A853 100%)',
//                 boxShadow:   '0 4px 14px rgba(198,124,78,0.45)',
//               }}
//               whileHover={{ rotate: [-4, 4, -2, 0], transition: { duration: 0.45 } }}
//             >
//               <GiCupcake className="text-white text-[1.2rem]" />
//             </motion.div>

//             <div className="leading-none">
//               <span
//                 className="font-playfair font-bold text-[1.25rem] leading-none block transition-colors duration-400"
//                 style={{
//                   color:     scrolled ? '#2C1A0E' : '#FFFFFF',
//                   textShadow: scrolled ? 'none' : '0 1px 12px rgba(0,0,0,0.6)',
//                 }}
//               >
//                 Kanha
//               </span>
//               <span
//                 className="font-nunito font-bold text-[0.6rem] tracking-[0.28em] uppercase leading-none"
//                 style={{ color: '#D4A853' }}
//               >
//                 Bakers
//               </span>
//             </div>
//           </motion.a>

//           {/* ── Desktop links ── */}
//           <ul className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => {
//               const isActive = activeHash === link.href;
//               return (
//                 <li key={link.href}>
//                   <a
//                     href={link.href}
//                     className="relative flex items-center px-4 py-2 rounded-full font-nunito font-700 text-[0.82rem] tracking-wide transition-all duration-250 select-none"
//                     style={{
//                       color: scrolled
//                         ? (isActive ? '#C67C4E' : '#2C1A0E')
//                         : '#FFFFFF',
//                       textShadow: scrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.70)',
//                       fontWeight: 700,
//                       background: isActive && scrolled
//                         ? 'rgba(198,124,78,0.10)'
//                         : 'transparent',
//                     }}
//                   >
//                     {link.label}

//                     {/* Animated underline */}
//                     <motion.span
//                       className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full"
//                       style={{ background: 'linear-gradient(90deg, #C67C4E, #D4A853)' }}
//                       initial={false}
//                       animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
//                       transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                     />
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* ── Right: Cart + CTA + Hamburger ── */}
//           <div className="flex items-center gap-2.5">

//             {/* Cart button */}
//             {/* <motion.button
//               href="/cart"
//               whileTap={{ scale: 0.88 }}
//               aria-label="Open cart"
//               className="relative transition-all duration-300"
//               style={{
//                 width:        '40px',
//                 height:       '40px',
//                 borderRadius: '50%',
//                 display:      'flex',
//                 alignItems:   'center',
//                 justifyContent: 'center',
//                 background: scrolled
//                   ? 'rgba(255,255,255,0.92)'
//                   : 'rgba(255,255,255,0.18)',
//                 border: scrolled
//                   ? '1px solid rgba(198,124,78,0.25)'
//                   : '1px solid rgba(255,255,255,0.40)',
//                 backdropFilter:       'blur(8px)',
//                 WebkitBackdropFilter: 'blur(8px)',
//                 color: scrolled ? '#2C1A0E' : '#FFFFFF',
//                 boxShadow: scrolled ? '0 2px 12px rgba(198,124,78,0.15)' : 'none',
//               }}
//             >
//               <FiShoppingCart size={18} />

//               <AnimatePresence>
//                 {totalItems > 0 && (
//                   <motion.span
//                     key={pingKey}
//                     initial={{ scale: 0, rotate: -30 }}
//                     animate={{ scale: 1, rotate: 0   }}
//                     exit={{ scale: 0 }}
//                     transition={{ type: 'spring', stiffness: 400, damping: 18 }}
//                     className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full text-white text-[10px] font-bold font-nunito flex items-center justify-center"
//                     style={{
//                       background: 'linear-gradient(135deg, #C67C4E, #D4A853)',
//                       boxShadow:  '0 2px 8px rgba(198,124,78,0.55)',
//                     }}
//                   >
//                     {totalItems > 9 ? '9+' : totalItems}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button> */}
//              <div className="flex items-center gap-3">
//             <Link href="/cart" className="relative group">
//               <div className="w-10 h-10 rounded-xl bg-bakery-50 border border-bakery-200 flex items-center justify-center text-bakery-700 group-hover:bg-bakery-600 group-hover:text-white group-hover:border-bakery-600 transition-all duration-300 shadow-sm">
//                 <ShoppingCart size={18} />
//               </div>
//               {count > 0 && (
//                 <motion.span
//                   key={count}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-2 -right-2 w-5 h-5 bg-bakery-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md"
//                 >
//                   {count}
//                 </motion.span>
//               )}
//             </Link>

//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="md:hidden w-10 h-10 rounded-xl bg-bakery-50 border border-bakery-200 flex items-center justify-center text-bakery-700"
//             >
//               {mobileOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
           

//             {/* Hamburger — mobile only */}
//             <motion.button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               whileTap={{ scale: 0.88 }}
//               aria-label="Toggle navigation"
//               className="md:hidden transition-all duration-300"
//               style={{
//                 width:        '40px',
//                 height:       '40px',
//                 borderRadius: '50%',
//                 display:      'flex',
//                 alignItems:   'center',
//                 justifyContent: 'center',
//                 background: scrolled
//                   ? 'rgba(255,255,255,0.92)'
//                   : 'rgba(255,255,255,0.18)',
//                 border: scrolled
//                   ? '1px solid rgba(198,124,78,0.25)'
//                   : '1px solid rgba(255,255,255,0.40)',
//                 backdropFilter:       'blur(8px)',
//                 WebkitBackdropFilter: 'blur(8px)',
//                 color: scrolled ? '#2C1A0E' : '#FFFFFF',
//                 boxShadow: scrolled ? '0 2px 12px rgba(198,124,78,0.15)' : 'none',
//               }}
//             >
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={mobileOpen ? 'x' : 'ham'}
//                   initial={{ rotate: -80, opacity: 0 }}
//                   animate={{ rotate: 0,   opacity: 1 }}
//                   exit={{ rotate: 80,    opacity: 0 }}
//                   transition={{ duration: 0.22 }}
//                   style={{ display: 'flex' }}
//                 >
//                   {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
//                 </motion.span>
//               </AnimatePresence>
//             </motion.button>

//           </div>
//         </div>
//       </motion.nav>

//       {/* ═══════════════════════════════════
//           MOBILE FULL-SCREEN DRAWER
//       ═══════════════════════════════════ */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               key="backdrop"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               onClick={() => setMobileOpen(false)}
//               className="fixed inset-0 z-[38]"
//               style={{ background: 'rgba(44,26,14,0.55)', backdropFilter: 'blur(6px)' }}
//             />

//             {/* Panel */}
//             <motion.div
//               key="panel"
//               initial={{ x: '100%', opacity: 0.6 }}
//               animate={{ x: '0%',   opacity: 1   }}
//               exit={{ x: '100%', opacity: 0.4    }}
//               transition={{ type: 'spring', stiffness: 320, damping: 32 }}
//               className="fixed top-0 right-0 h-screen w-[280px] z-[39] flex flex-col pt-6 pb-10 px-7 overflow-y-auto"
//               style={{
//                 background:           'rgba(253,246,236,0.96)',
//                 backdropFilter:       'blur(24px) saturate(1.6)',
//                 WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
//                 borderLeft:           '1px solid rgba(198,124,78,0.20)',
//                 boxShadow:            '-20px 0 60px rgba(44,26,14,0.22)',
//               }}
//             >
//               {/* Close row */}
//               <div className="flex items-center justify-between mb-10">
//                 <div className="flex items-center gap-2.5">
//                   <div
//                     className="w-9 h-9 rounded-xl flex items-center justify-center"
//                     style={{ background: 'linear-gradient(135deg, #C67C4E, #D4A853)' }}
//                   >
//                     <GiCupcake className="text-white text-base" />
//                   </div>
//                   <div>
//                     <span className="font-playfair font-bold text-espresso text-lg leading-none block">Kanha</span>
//                     <span className="font-nunito font-bold text-[9px] text-gold tracking-[0.25em] uppercase">Bakers</span>
//                   </div>
//                 </div>
//                 <motion.button
//                   onClick={() => setMobileOpen(false)}
//                   whileTap={{ scale: 0.88 }}
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-mocha"
//                   style={{ background: 'rgba(198,124,78,0.12)' }}
//                 >
//                   <FiX size={16} />
//                 </motion.button>
//               </div>

//               {/* Links */}
//               <nav className="flex flex-col gap-1 flex-1">
//                 {navLinks.map((link, i) => {
//                   const isActive = activeHash === link.href;
//                   return (
//                     <motion.a
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setMobileOpen(false)}
//                       initial={{ opacity: 0, x: 28 }}
//                       animate={{ opacity: 1, x: 0  }}
//                       transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
//                       className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-playfair font-semibold text-xl transition-all duration-250"
//                       style={{
//                         color:      isActive ? '#C67C4E' : '#2C1A0E',
//                         background: isActive ? 'rgba(198,124,78,0.10)' : 'transparent',
//                       }}
//                     >
//                       {isActive && (
//                         <motion.span
//                           layoutId="mobile-dot"
//                           className="w-1.5 h-1.5 rounded-full flex-shrink-0"
//                           style={{ background: 'linear-gradient(#C67C4E, #D4A853)' }}
//                         />
//                       )}
//                       {!isActive && <span className="w-1.5 h-1.5 flex-shrink-0" />}
//                       {link.label}
//                     </motion.a>
//                   );
//                 })}
//               </nav>

//               {/* Bottom CTA */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0  }}
//                 transition={{ delay: 0.38 }}
//                 className="mt-6"
//               >
//                 <a
//                   href="#menu"
//                   onClick={() => setMobileOpen(false)}
//                   className="btn-primary w-full text-center block py-4 rounded-2xl text-base"
//                 >
//                   🛒 &nbsp;Order Now
//                 </a>
//                 <p className="font-nunito text-mocha/40 text-xs text-center mt-4">
//                   Since 2009 · Ajmer, Rajasthan
//                 </p>
//               </motion.div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }