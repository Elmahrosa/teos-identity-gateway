"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { resolveTeosName } from "@/lib/sovereign-resolver";

export default function SovereignProfile() {
  const params = useParams();
  const name = String(params?.name || "name").toLowerCase();
  const [id, setId] = useState<{exists:boolean;owner?:string}|null>(null);
  
  useEffect(() => { 
    resolveTeosName(name + ".teos").then(setId).catch(() => setId({exists:false})); 
  }, [name]);

  const status = !id ? "جاري التحقق من السيادة..." : 
    (id.owner?.includes("Mainnet") ? "موثق على شبكة Solana الرئيسية" : 
    (id.owner?.includes("Genesis") ? "مسجل ومحمي في سجل التكوين (Genesis)" : "متاح للمطالبة السيادية"));

  return (
    <div dir="rtl" className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 font-sans">
      {/* الختم السيادي */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-b from-red-900 to-black border-2 border-amber-600 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-6">
        🔱
      </div>

      {/* الاسم والحالة */}
      <h1 className="text-4xl sm:text-5xl text-amber-500 font-bold mt-2 tracking-wider text-center">
        {name.toUpperCase()}.TEOS
      </h1>
      <p className="text-slate-400 mt-3 text-sm tracking-wide text-center max-w-lg">
        {status}
      </p>
      
      {/* بطاقة القيمة الملموسة للعميل */}
      <div className="mt-8 max-w-md w-full border border-amber-700/40 bg-[#12100c] rounded-xl p-6 text-center shadow-2xl">
        <h2 className="text-xl text-white font-semibold">هويتك الرقمية السيادية</h2>
        <p className="text-amber-500 text-xs mt-2 font-medium">ملكية مطلقة • لا إيجار • لا إلغاء</p>
        
        <p className="text-slate-300 text-sm mt-5 leading-relaxed">
          هذا النطاق ملكك بالكامل على شبكة Solana. 
          يمكنك الآن نقل موقعك القديم إليه بضغطة زر واحدة عبر أداة TEOS، 
          لتصبح مالكاً للبنية التحتية الخاصة بك، وليس مجرد مستأجر.
        </p>
        
        {/* شارة ميزة النسخ */}
        <div className="mt-6 pt-5 border-t border-amber-700/30">
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 py-2 px-4 rounded-full mx-auto w-fit border border-emerald-800/50">
            <span>⚡</span>
            <span>جاهز لنسخ موقعك الحالي ونقل ملكيته إليك (Clone Ready)</span>
          </div>
        </div>

        {/* أزرار التواصل */}
        <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
          <a href="#" className="hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">تواصل مع المؤسس</a>
          <a href="#" className="hover:text-amber-500 transition-colors underline decoration-amber-500/30 underline-offset-4">وثائق TEOS</a>
        </div>
      </div>

      {/* التذييل القانوني الواضح */}
      <footer className="mt-12 text-[10px] text-slate-600 text-center max-w-lg px-4 leading-relaxed">
        <p className="mb-2">
          أسماء TEOS هي هويات رقمية سيادية داخل نظام TEOS على شبكة Solana. 
          هي ليست نطاقات إنترنت تقليدية (TLDs)، ولا تتبع لأي هيئة حكومية أو ICANN.
        </p>
        <p className="mt-3 text-slate-700">© 2026 Elmahrosa International - الإسكندرية، مصر</p>
      </footer>
    </div>
  );
}