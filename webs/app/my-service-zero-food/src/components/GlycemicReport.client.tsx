'use client'

import React from 'react';
import CoachTip from './CoachTip.client';

interface GlycemicReportProps {
    has_added_sugars: boolean;
    added_sugars_ingredients: string[];
    has_refined_grains: boolean;
    refined_grains_ingredients: string[];
    has_processed_starches: boolean;
    processed_starches_ingredients: string[];
}

const GlycemicReport = ({ has_added_sugars, added_sugars_ingredients, has_refined_grains, refined_grains_ingredients, has_processed_starches, processed_starches_ingredients }: GlycemicReportProps) => {

  // 전체적인 혈당 위험도 체크
  const isHighRisk = has_added_sugars || has_refined_grains;

  return (
    <div className="bg-white px-6 py-8">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🩸</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">혈당 관리 리포트</h2>
        </div>
        {isHighRisk && (
          <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-md font-black animate-pulse">
            HIGH SPIKE
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        설탕뿐만 아니라 정제된 가루 형태의 탄수화물은 혈당을 급격히 높여 체지방 축적을 유발합니다.
      </p>

      {/* 3대 혈당 빌런 상세 분석 */}
      <div className="space-y-6">
        {/* 1. 당류 */}
        <IngredientGroup 
          label="당류 및 시럽" 
          found={has_added_sugars} 
          ingredients={added_sugars_ingredients}
          dotColor="bg-red-500"
        />

        {/* 2. 정제 곡물 */}
        <IngredientGroup 
          label="정제 탄수화물 (가루)" 
          found={has_refined_grains} 
          ingredients={refined_grains_ingredients}
          dotColor="bg-orange-500"
        />

        {/* 3. 가공 전분 */}
        <IngredientGroup 
          label="가공 전분 및 추출물" 
          found={has_processed_starches} 
          ingredients={processed_starches_ingredients}
          dotColor="bg-amber-400"
        />
      </div>

      {/* 코치의 팁 박스 */}
      <CoachTip isVisible={isHighRisk} message={<>"당분과 정제 가루가 동시에 발견되었어요. 이 조합은 혈당을 가장 빠르게 올리는 <strong>'지방 축적 치트키'</strong>입니다. 가급적 섬유질이 풍부한 채소를 먼저 드신 후에 섭취하세요!"</>}/>

    </div>
  );
};

// 내부 컴포넌트: 성분 그룹 표시
const IngredientGroup = ({ label, found, ingredients, dotColor }: any) => {
  return (
    <div className={`group flex flex-col p-4 rounded-2xl transition-all ${
      found ? 'bg-red-50/30 border border-red-100/50' : 'bg-emerald-50/40 border border-emerald-100/50'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        {/* 상태 아이콘 */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
          found ? 'bg-red-500 shadow-sm shadow-red-200' : 'bg-emerald-500 shadow-sm shadow-emerald-200'
        }`}>
          {found ? (
            <span className="text-[10px] text-white font-bold">!</span>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <span className={`text-sm font-bold ${found ? 'text-red-900' : 'text-emerald-700'}`}>
          {label}
        </span>

        {/* 우측 상태 라벨 */}
        <div className="ml-auto">
          {found ? (
            <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {ingredients.length} Detected
            </span>
          ) : (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Clean
            </span>
          )}
        </div>
      </div>
      
      {/* 발견된 성분 태그 (붉은색 테마 적용) */}
      {found && (
        <div className="flex flex-wrap gap-1.5 pl-7">
          {ingredients.map((item: string, idx: number) => (
            <span key={idx} className="px-2.5 py-1 bg-white text-red-600 text-[11px] rounded-lg border border-red-200 font-bold shadow-sm shadow-red-100/50">
              {item}
            </span>
          ))}
        </div>
      )}

      {!found && (
        <p className="pl-7 text-[11px] text-emerald-600/70 font-medium italic">
          검출된 성분이 없습니다.
        </p>
      )}
    </div>
  );
};

export default GlycemicReport;