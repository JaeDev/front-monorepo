'use client'

import React from 'react';
import CoachTip from './CoachTip.client';

interface SweetenerReportProps {
  has_artificial_sweeteners: boolean;
  artificial_sweeteners_ingredients: string[];
  has_natural_sweeteners: boolean;
  natural_sweeteners_ingredients: string[];
}

const SweetenerReport = ({ has_artificial_sweeteners, artificial_sweeteners_ingredients, has_natural_sweeteners, natural_sweeteners_ingredients}: SweetenerReportProps) => {
  
  // 제로 슈거 제품인지 여부 (인공이나 자연 대체당이 있을 때)
  const hasArtificial = has_artificial_sweeteners;
  const isHighChemicalSweet = hasArtificial && artificial_sweeteners_ingredients.length >= 2;
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

        {/* 혈당/지방과 통일된 위험 배지 UI */}
        {hasArtificial && (
          <span className={`text-[10px] px-2 py-1 rounded-md font-black animate-pulse ${
            isHighChemicalSweet ? 'bg-red-600 text-white' : 'bg-orange-400 text-white'
          }`}>
            {isHighChemicalSweet ? 'ZERO-CAL TRAP' : 'SYNTHETIC SWEET'}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        설탕 대신 사용된 대체 감미료를 분석합니다. 인공 감미료 유무를 확인하세요.
      </p>

      {/* 감미료 상세 그룹 */}
      <div className="space-y-4">
        {/* 1. 인공 감미료 / 당알코올 */}
        <SweetenerGroup 
          label="인공 감미료 및 당알코올"
          found={has_artificial_sweeteners}
          ingredients={artificial_sweeteners_ingredients}
          type="artificial"
        />

        {/* 2. 천연 유래 감미료 */}
        <SweetenerGroup 
          label="천연 유래 저칼로리 감미료"
          found={has_natural_sweeteners}
          ingredients={natural_sweeteners_ingredients}
          type="natural"
        />
      </div>

      {/* 하단 코치 팁 (블랙 박스) */}
      <CoachTip
        isVisible={isZeroSugarOption}
        message={
          has_artificial_sweeteners 
            ? "인공 감미료가 발견되었습니다. 칼로리는 낮지만 장내 환경에는 영향을 줄 수 있으니 가끔씩만 즐기는 게 좋아요!"
            : "인공 감미료 없는 깨끗한 단맛이네요. 혈당 걱정 없이 즐기기에 아주 좋은 선택입니다."
        }
      />
    </div>
  );
};

// 내부 컴포넌트: 감미료 그룹
const SweetenerGroup = ({ label, found, ingredients, type }: any) => {
  return (
    <div className={`p-4 rounded-2xl transition-all border ${
      found 
        ? (type === 'artificial' ? 'bg-red-50/30 border-red-100/50' : 'bg-blue-50/30 border-blue-100/50')
        : 'bg-emerald-50/40 border-emerald-100/50'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        {/* 상태 아이콘 */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
          found ? (type === 'artificial' ? 'bg-red-500' : 'bg-blue-500') : 'bg-emerald-500'
        }`}>
          {found ? (
            <span className="text-[10px] text-white font-bold">!</span>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <span className={`text-sm font-bold ${found ? 'text-gray-800' : 'text-emerald-700'}`}>
          {label}
        </span>

        <div className="ml-auto">
          {found ? (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
              type === 'artificial' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {ingredients.length} Detected
            </span>
          ) : (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold">
              SAFE & CLEAN
            </span>
          )}
        </div>
      </div>

      {found ? (
        <div className="flex flex-wrap gap-1.5 pl-7">
          {ingredients.map((ing: string, i: number) => (
            <span key={i} className={`px-2.5 py-1 bg-white text-[11px] rounded-lg border font-bold shadow-sm ${
              type === 'artificial' ? 'text-red-600 border-red-200' : 'text-blue-600 border-blue-200'
            }`}>
              {ing}
            </span>
          ))}
        </div>
      ) : (
        <p className="pl-7 text-[11px] text-emerald-600/70 font-medium italic">
          불필요한 감미료가 포함되어 있지 않습니다.
        </p>
      )}
    </div>
  );
};

export default SweetenerReport;