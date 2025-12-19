'use client'

import React from 'react';

interface SweetenerReportProps {
    has_artificial_sweeteners: boolean;
    artificial_sweeteners_ingredients: string[];
    has_natural_sweeteners: boolean;
    natural_sweeteners_ingredients: string[];
}

const SweetenerReport = ({ has_artificial_sweeteners, artificial_sweeteners_ingredients, has_natural_sweeteners, natural_sweeteners_ingredients}: SweetenerReportProps) => {
  
    // 제로 슈거 제품인지 여부 (인공이나 자연 대체당이 있을 때)
  const isZeroSugarOption = has_artificial_sweeteners || has_natural_sweeteners;

  return (
    <div className="bg-white px-6 py-8 border-t border-gray-50">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🍯</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">감미료 구성</h2>
        </div>
        {has_artificial_sweeteners && (
          <span className="bg-purple-100 text-purple-600 text-[10px] px-2 py-1 rounded-md font-bold uppercase">
            Synthetic Sweet
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        설탕 대신 사용된 대체 감미료의 종류를 분석합니다. 인공 감미료는 장 건강과 대사에 영향을 줄 수 있습니다.
      </p>

      {/* 감미료 유형 대조 분석 */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* 1. 인공 감미료 및 당알코올 (주의군) */}
        <div className={`p-4 rounded-2xl border-2 transition-all ${
          has_artificial_sweeteners 
            ? 'border-purple-100 bg-purple-50/30' 
            : 'border-gray-50 bg-gray-50/30 opacity-50'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🧪</span>
            <span className="text-sm font-bold text-gray-800">인공 감미료 / 당알코올</span>
            {has_artificial_sweeteners && (
              <span className="ml-auto text-[10px] bg-purple-200 text-purple-700 px-1.5 py-0.5 rounded font-bold">주의</span>
            )}
          </div>
          
          {has_artificial_sweeteners ? (
            <div className="flex flex-wrap gap-1.5">
              {artificial_sweeteners_ingredients.map((item, idx) => (
                <span key={idx} className="px-2 py-1 bg-white text-purple-600 text-[11px] rounded-md border border-purple-100 font-medium">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">검출된 인공 감미료가 없습니다.</p>
          )}
        </div>

        {/* 2. 자연 유래 감미료 (안심군) */}
        <div className={`p-4 rounded-2xl border-2 transition-all ${
          has_natural_sweeteners 
            ? 'border-emerald-100 bg-emerald-50/30' 
            : 'border-gray-50 bg-gray-50/30 opacity-50'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🌿</span>
            <span className="text-sm font-bold text-gray-800">천연 저칼로리 감미료</span>
            {has_natural_sweeteners && (
              <span className="ml-auto text-[10px] bg-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded font-bold">비교적 안심</span>
            )}
          </div>
          
          {has_natural_sweeteners ? (
            <div className="flex flex-wrap gap-1.5">
              {natural_sweeteners_ingredients.map((item, idx) => (
                <span key={idx} className="px-2 py-1 bg-white text-emerald-600 text-[11px] rounded-md border border-emerald-100 font-medium">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">검출된 천연 감미료가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 코치의 요약 피드백 */}
      {isZeroSugarOption && (
        <div className="mt-8 flex gap-3 items-start bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
          <span className="text-xl">💡</span>
          <p className="text-xs text-indigo-900 leading-snug">
            {has_artificial_sweeteners 
              ? "인공 감미료가 포함되어 있습니다. 칼로리는 낮지만 장내 유익균에 영향을 줄 수 있으니 가끔 즐기는 것이 좋습니다."
              : "천연 감미료를 사용한 비교적 건강한 단맛 제품입니다. 혈당 영향이 적어 다이어트 중에도 적합합니다."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SweetenerReport;