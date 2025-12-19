'use client'

import React from 'react';

interface FatQualityReportProps {
    has_unhealthy_fats: boolean;
    unhealthy_fats_ingredients: string[];
    has_healthy_fats: boolean;
    healthy_fats_ingredients: string[];
}

const FatQualityReport = ({ has_healthy_fats, healthy_fats_ingredients, has_unhealthy_fats, unhealthy_fats_ingredients}: FatQualityReportProps) => {
  return (
    <div className="bg-white px-6 py-8 border-t border-gray-50">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🥑</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">지방 품질 리포트</h2>
        </div>
        {has_unhealthy_fats && (
          <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-md font-black uppercase">
            Bad Fats Detected
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        어떤 기름을 사용했느냐에 따라 체내 염증 수치와 심혈관 건강이 결정됩니다. 가공된 식물성 유지는 주의가 필요합니다.
      </p>

      {/* 지방 품질 비교 분석 */}
      <div className="space-y-4">
        
        {/* 1. 나쁜 기름 (Warning) */}
        <div className={`relative overflow-hidden p-5 rounded-2xl border ${
          has_unhealthy_fats 
            ? 'border-orange-200 bg-orange-50/20' 
            : 'border-gray-100 bg-gray-50 opacity-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg text-orange-500 font-bold">⚠️</span>
              <span className="text-sm font-extrabold text-gray-800">주의해야 할 기름</span>
            </div>
            {has_unhealthy_fats && (
              <span className="text-[10px] text-orange-600 font-bold underline underline-offset-2">염증 유발 가능성</span>
            )}
          </div>

          {has_unhealthy_fats ? (
            <div className="flex flex-wrap gap-2">
              {unhealthy_fats_ingredients.map((item, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white text-orange-700 text-[11px] rounded-xl shadow-sm border border-orange-100 font-bold">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">나쁜 기름이 발견되지 않았습니다.</p>
          )}
        </div>

        {/* 2. 좋은 기름 (Good) */}
        <div className={`relative overflow-hidden p-5 rounded-2xl border ${
          has_healthy_fats 
            ? 'border-emerald-200 bg-emerald-50/20' 
            : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg text-emerald-500 font-bold">✨</span>
              <span className="text-sm font-extrabold text-gray-800">권장하는 좋은 기름</span>
            </div>
            {has_healthy_fats && (
              <span className="text-[10px] text-emerald-600 font-bold">심혈관 보호</span>
            )}
          </div>

          {has_healthy_fats ? (
            <div className="flex flex-wrap gap-2">
              {healthy_fats_ingredients.map((item, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white text-emerald-700 text-[11px] rounded-xl shadow-sm border border-emerald-100 font-bold">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">좋은 기름 성분이 보이지 않습니다.</p>
          )}
        </div>
      </div>

      {/* 코치의 한마디 (동적 메시지) */}
      <div className="mt-8 p-4 bg-gray-900 rounded-2xl text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💬</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Coach's Insight</span>
        </div>
        <p className="text-sm leading-snug font-medium">
          {has_unhealthy_fats 
            ? "팜유나 가공유지는 LDL 콜레스테롤 수치를 높일 수 있어요. 가급적 엑스트라 버진 올리브유나 견과류에서 온 건강한 지방을 섭취하도록 노력해 보세요!"
            : "나쁜 기름이 없는 아주 깨끗한 구성이네요! 좋은 지방까지 포함되어 있다면 금상첨화입니다."}
        </p>
      </div>
    </div>
  );
};

export default FatQualityReport;