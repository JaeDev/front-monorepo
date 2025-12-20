'use client'

import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const AnalysisLoading = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-10 animate-in fade-in duration-300">
      {/* 분석 아이콘 애니메이션 */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center animate-pulse">
          <Sparkles size={40} className="text-emerald-500 animate-bounce" />
        </div>
        {/* 주변을 도는 로더 */}
        <div className="absolute inset-x-0 -bottom-2 flex justify-center">
          <Loader2 className="animate-spin text-emerald-200" size={24} />
        </div>
      </div>

      {/* 텍스트 메시지 */}
      <div className="text-center">
        <h2 className="text-xl font-black text-gray-900 mb-2">성분을 해독하는 중...</h2>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400 font-medium animate-pulse">
            식품 첨가물과 당 함량을 대조하고 있어요
          </p>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-4">
            AI Food Intelligence
          </p>
        </div>
      </div>

      {/* 진행바 형태의 데코레이션 */}
      <div className="w-48 h-1 bg-gray-50 rounded-full mt-10 overflow-hidden">
        <div className="h-full bg-emerald-500 w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]" />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default AnalysisLoading;