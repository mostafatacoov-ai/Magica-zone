"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, ArrowRight, ShieldCheck, Users, Award, 
  GraduationCap, Tent, ShoppingBag, Gamepad2, Store, 
  UtensilsCrossed, Mic, Shirt, Music2, CheckCircle2, 
  Play, Star, ArrowUpRight, MessageCircle, Download,
  Pause, CheckCircle
} from "lucide-react";
import MagicalBackground from "@/components/ui/MagicalBackground";
import SectorBadge from "@/components/ui/SectorBadge";

export default function HomePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === "ar";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/Magica.mp3");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.warn("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const SECTORS = [
    {
      id: "courses",
      icon: GraduationCap,
      title: isArabic ? "ماجيكا كورسات" : "Magica Courses",
      subtitle: isArabic ? "أكاديمية القادة الصغار" : "Junior CEO Academy",
      desc: isArabic ? "مسارات قيادية، تقنية وتجارة إلكترونية متطورة تبني قادة المستقبل." : "Leadership, tech, & e-commerce tracks building future innovators.",
      gradient: "from-blue-600 to-indigo-700",
      lightBg: "bg-blue-50",
      textColor: "text-blue-700",
      href: `/${lang}/magic-courses`
    },
    {
      id: "camp",
      icon: Tent,
      title: isArabic ? "ماجيكا كامب" : "Magica Camp",
      subtitle: isArabic ? "مغامرات الوادي الملكي 2026" : "Royal Valley Adventure 2026",
      desc: isArabic ? "معسكرات صيفية تبني الاستقلالية، القوة البدنية، وروح الفريق." : "Summer camps building independence, grit, and teamwork.",
      gradient: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-50",
      textColor: "text-emerald-700",
      href: `/${lang}/magic-camp`
    },
    {
      id: "supplies",
      icon: ShoppingBag,
      title: isArabic ? "ماجيكا سبلايز" : "Magica Supplies",
      subtitle: isArabic ? "أدوات ذكية للقادة" : "Smart CEO Gear",
      desc: isArabic ? "حقائب مدرسية طبية فائقة التحمل وأدوات ابتكار متطورة." : "Ergonomic CEO backpacks and advanced innovation toolkits.",
      gradient: "from-rose-500 to-red-600",
      lightBg: "bg-rose-50",
      textColor: "text-rose-700",
      href: `/${lang}/magic-supplies`
    },
    {
      id: "games",
      icon: Gamepad2,
      title: isArabic ? "الألعاب الذهنية" : "Mind Games",
      subtitle: isArabic ? "تحديات المنطق والتداول" : "Logic & Trading Sim",
      desc: isArabic ? "ألعاب ذكاء وتداول تفاعلية لتعزيز سرعة البديهة وحل المشكلات." : "Interactive logic and trading games enhancing quick thinking.",
      gradient: "from-purple-500 to-violet-600",
      lightBg: "bg-purple-50",
      textColor: "text-purple-700",
      href: `/${lang}/magic-games`
    },
    {
      id: "bazar",
      icon: Store,
      title: isArabic ? "ماجيكا بازار" : "Magica Bazar",
      subtitle: isArabic ? "السوق الحقيقي للأبطال" : "Live Kid-Run Market",
      desc: isArabic ? "متاجر حقيقية يديرها الأطفال لتعلم ريادة الأعمال وحساب الأرباح." : "Real kid-run stores teaching entrepreneurship and profit calculation.",
      gradient: "from-orange-500 to-amber-600",
      lightBg: "bg-orange-50",
      textColor: "text-orange-700",
      href: `/${lang}/magic-bazar`
    },
    {
      id: "food",
      icon: UtensilsCrossed,
      title: isArabic ? "ماجيكا فود" : "Magica Food",
      subtitle: isArabic ? "وجبات الذكاء الخارق" : "Brain Bento Boxes",
      desc: isArabic ? "تغذية مصممة خصيصاً لزيادة التركيز والطاقة الإيجابية للأطفال." : "Nutrition specifically designed to boost focus and positive energy.",
      gradient: "from-lime-500 to-green-600",
      lightBg: "bg-lime-50",
      textColor: "text-lime-700",
      href: `/${lang}/magic-food`
    },
    {
      id: "podcast",
      icon: Mic,
      title: isArabic ? "ماجيكا بودكاست" : "Magica Podcast",
      subtitle: isArabic ? "صوت الأجيال والإرشاد" : "Youth Voice & Mentorship",
      desc: isArabic ? "منصة إعلامية ومحتوى صوتي تربوي للآباء والأبناء." : "Media platform and educational audio content for parents & kids.",
      gradient: "from-indigo-600 to-blue-800",
      lightBg: "bg-indigo-50",
      textColor: "text-indigo-700",
      href: `/${lang}/magic-podcast`
    },
    {
      id: "uniform",
      icon: Shirt,
      title: isArabic ? "ماجيكا يونيفورم" : "Magica Uniform",
      subtitle: isArabic ? "هوية الرواد" : "Founder Apparel",
      desc: isArabic ? "ملابس مصممة للفخامة والراحة، تعزز الانتماء وثقة الطفل بنفسه." : "Apparel designed for prestige and comfort, boosting confidence.",
      gradient: "from-slate-700 to-slate-900",
      lightBg: "bg-slate-100",
      textColor: "text-slate-800",
      href: `/${lang}/magic-uniform`
    },
    {
      id: "songs",
      icon: Music2,
      title: isArabic ? "أغاني وأناشيد" : "Songs & Anthems",
      subtitle: isArabic ? "مكتبة الإلهام الصوتي" : "Audio Inspiration Library",
      desc: isArabic ? "موسيقى وأناشيد حصرية لتحفيز الحماس وبناء القيم والأخلاق." : "Exclusive music and anthems to drive enthusiasm and build values.",
      gradient: "from-fuchsia-500 to-pink-600",
      lightBg: "bg-fuchsia-50",
      textColor: "text-fuchsia-700",
      href: `/${lang}/magic-songs`
    }
  ];

  return (
    <div className={`min-h-screen overflow-hidden ${isArabic ? "font-cairo text-right" : "font-sans text-left"}`} dir={isArabic ? "rtl" : "ltr"}>
      <MagicalBackground />
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>{isArabic ? "حيث تبدأ الريادة والتميز الإنساني" : "Where Human Excellence & Leadership Begin"}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-xl"
          >
            {isArabic ? (
              <>حيث نصنع من الأطفال <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-sm">قادة ورواد أعمال</span></>
            ) : (
              <>Where Children Become <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-sm">Leaders & Founders</span></>
            )}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium mb-12 leading-relaxed drop-shadow-md"
          >
            {isArabic 
              ? "نظام بيئي متكامل يجمع بين الثقافة المالية، التكنولوجيا، بناء الشخصية، والتهيئة الحقيقية لحياة مليئة بالنجاح والريادة."
              : "A complete ecosystem combining financial literacy, STEM, character building, and real-world preparation for a life of success."}
          </motion.p>
          
          {/* Bento Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: Users, val: "500+", label: isArabic ? "رائد صغير تخرج" : "Young Founders Trained" },
              { icon: Award, val: "9", label: isArabic ? "قطاعات متكاملة" : "Integrated Divisions" },
              { icon: ShieldCheck, val: "100%", label: isArabic ? "بيئة آمنة جاهزة" : "Future-Ready Safe Space" },
              { icon: Star, val: "4.9/5", label: isArabic ? "رضا أولياء الأمور" : "Parent Satisfaction" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl hover:bg-white/20 hover:-translate-y-1 transition-all">
                <stat.icon className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-1 drop-shadow-md">{stat.val}</div>
                <div className="text-sm font-bold text-gray-200 drop-shadow-md">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href={`/${lang}/register`} className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg">
              <span>{isArabic ? "سجل طفلك الآن" : "Register Your Child Now"}</span>
              <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
            <button onClick={() => document.getElementById('sectors')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-10 py-5 bg-white text-gray-800 font-bold rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 hover:-translate-y-1 transition-all text-lg">
              {isArabic ? "استكشف عالم ماجيكا ↓" : "Explore All 9 Sectors ↓"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. THE 9-SECTOR INTERACTIVE BENTO ECOSYSTEM */}
      <section id="sectors" className="py-24 bg-gray-50 relative px-4 md:px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{isArabic ? "نظام ماجيكا البيئي" : "The Magica Ecosystem"}</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">{isArabic ? "تسع قطاعات متخصصة تعمل معاً لبناء شخصية متكاملة وجاهزة للمستقبل." : "Nine specialized divisions working together to build a complete, future-ready personality."}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((sector, i) => (
              <motion.div 
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={sector.href} className="group block h-full bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/60 transition-all border border-gray-100 hover:border-gray-200 overflow-hidden relative">
                  <div className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-40 h-40 bg-gradient-to-br ${sector.gradient} opacity-5 group-hover:opacity-10 ${isArabic ? 'rounded-br-full' : 'rounded-bl-full'} transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${sector.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      <sector.icon className="w-8 h-8" />
                    </div>
                    <ArrowUpRight className={`w-6 h-6 text-gray-300 group-hover:text-gray-900 transition-colors ${isArabic ? '-scale-x-100' : ''}`} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`text-xs font-black px-4 py-1.5 rounded-full ${sector.lightBg} ${sector.textColor} inline-block mb-4 border border-current/10`}>
                      {sector.subtitle}
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{sector.title}</h3>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">{sector.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE MAGICA FORMULA */}
      <section className="py-32 bg-white relative px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm mb-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>{isArabic ? "المحاور الأربعة" : "The 4 Pillars"}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mt-6 mb-8 leading-tight">
                {isArabic ? "منهجية ماجيكا: كيف نصنع الفارق؟" : "The Magica Formula: How We Make a Difference"}
              </h2>
              <p className="text-gray-600 font-medium text-xl mb-12 leading-relaxed">
                {isArabic 
                  ? "منهجيتنا ليست مجرد دروس، بل هي أسلوب حياة يدمج بين العقل، الجسد، والتطبيق العملي لضمان تأثير حقيقي يلمسه الآباء."
                  : "Our methodology isn't just lessons—it's a lifestyle combining mind, body, and practical application to guarantee real impact."}
              </p>
              
              <div className="space-y-8">
                {[
                  { title: isArabic ? "العقلية التنفيذية" : "Executive Mindset", desc: isArabic ? "تنمية الثقافة المالية والثقة بالتحدث أمام الجمهور." : "Developing financial literacy and public speaking confidence." },
                  { title: isArabic ? "التطبيق السوقي الحقيقي" : "Real Marketplace Practice", desc: isArabic ? "التدريب على البيع، التسعير، وإدارة المتاجر." : "Training in sales, pricing, and live store management." },
                  { title: isArabic ? "القوة البدنية والاستقلالية" : "Physical Grit & Independence", desc: isArabic ? "بناء المرونة، العمل الجماعي، وتحمل المسؤولية." : "Building resilience, teamwork, and taking responsibility." },
                  { title: isArabic ? "الصحة المعرفية" : "Cognitive Health", desc: isArabic ? "تغذية مخصصة لدعم التركيز وطاقة التعلم." : "Customized nutrition supporting focus and learning energy." },
                ].map((pillar, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center shrink-0 text-xl border border-indigo-100">{i+1}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{pillar.title}</h4>
                      <p className="text-gray-600 font-medium text-base leading-relaxed">{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative">
              <div className="aspect-square bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-[3rem] p-10 relative shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent" />
                <div className="relative h-full flex flex-col justify-center items-center text-center z-10 gap-8">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner border border-white/30">
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-md leading-tight">{isArabic ? "شريك الآباء الموثوق" : "The Trusted Parent Partner"}</h3>
                  <p className="text-blue-100 font-medium text-lg md:text-xl max-w-sm drop-shadow-sm leading-relaxed">{isArabic ? "نحن نشاركك رحلة التربية ونقدم لك تقارير دورية وشفافية كاملة عن تطور طفلك." : "We share your parenting journey, offering regular reports and complete transparency on your child's growth."}</p>
                  <div className="flex items-center gap-3 mt-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-white font-bold shadow-lg">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    <span>{isArabic ? "موثق ومدعوم بأحدث الأبحاث التربوية" : "Backed by latest educational research"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARENT TESTIMONIALS */}
      <section className="py-32 bg-gray-900 text-white relative px-4 md:px-8 border-t border-gray-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">{isArabic ? "قصص نجاح من الواقع" : "Real Success Stories"}</h2>
            <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto">{isArabic ? "استمع لما يقوله الآباء عن التحول المذهل في شخصية أبنائهم." : "Hear what parents say about their children's incredible transformation."}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: isArabic ? "لقد لاحظت تغيراً جذرياً في ثقة ابني. أصبح قادراً على عرض أفكاره بشجاعة أمام الكبار!" : "I noticed a radical change in my son's confidence. He now presents his ideas bravely to adults!",
                author: isArabic ? "أم يوسف" : "Youssef's Mother",
                role: isArabic ? "أم لطفل 10 سنوات" : "Mother of 10-year-old"
              },
              {
                text: isArabic ? "تطبيق ماجيكا بازار جعل ابنتي تفهم قيمة المال وكيفية حساب الأرباح. تجربة لا تقدر بثمن." : "The Magica Bazar app made my daughter understand the value of money and profit. Invaluable.",
                author: isArabic ? "أبو ليلى" : "Laila's Father",
                role: isArabic ? "أب لطفلة 12 سنة" : "Father of 12-year-old"
              },
              {
                text: isArabic ? "التقارير الأسبوعية ومستوى الاحترافية في التعامل يشعرني بالأمان التام على مستقبل طفلي." : "The weekly reports and professionalism make me feel completely secure about my child's future.",
                author: isArabic ? "أم عمر" : "Omar's Mother",
                role: isArabic ? "أم لطفل 8 سنوات" : "Mother of 8-year-old"
              }
            ].map((test, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg lg:text-xl font-medium leading-relaxed mb-10 text-gray-200">&quot;{test.text}&quot;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-xl text-white">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white">{test.author}</div>
                    <div className="text-indigo-300 text-sm font-medium">{test.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL LEAD CONVERSION BANNER */}
      <section className="py-32 px-4 md:px-8 pb-48 bg-white"> 
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              {isArabic ? "جاهز لتبدأ رحلة طفلك؟" : "Ready to Start Your Child's Journey?"}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
              {isArabic 
                ? "انضم إلى مجتمع النخبة حيث نكتشف مواهبهم وننمي قدراتهم القيادية."
                : "Join the elite community where we discover their talents and develop their leadership potential."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href={`/${lang}/register`} className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-900 font-black rounded-full shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all text-xl flex items-center justify-center gap-3">
                {isArabic ? "ابدأ التسجيل الآن" : "Start Registration Now"}
              </Link>
              <a href="https://wa.me/201037377505" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white font-black rounded-full shadow-2xl hover:scale-105 hover:shadow-[#25D366]/20 transition-all text-xl flex items-center justify-center gap-3">
                <MessageCircle className="w-7 h-7" />
                <span>{isArabic ? "تواصل مع مستشارنا" : "Chat with Advisor"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
