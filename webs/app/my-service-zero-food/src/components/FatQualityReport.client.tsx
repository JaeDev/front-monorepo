'use client'

import React from 'react';
import CoachTip from './CoachTip.client';

interface FatQualityReportProps {
    has_unhealthy_fats: boolean;
    unhealthy_fats_ingredients: string[];
    has_healthy_fats: boolean;
    healthy_fats_ingredients: string[];
}

const FatQualityReport = ({ has_healthy_fats, healthy_fats_ingredients, has_unhealthy_fats, unhealthy_fats_ingredients}: FatQualityReportProps) => {
  
  const isHighVesselRisk = has_unhealthy_fats;
  
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

        {/* 혈당의 HIGH SPIKE와 대칭되는 위험 배지 */}
        {isHighVesselRisk && (
          <span className={`text-[10px] px-2 py-1 rounded-md font-black animate-pulse ${
            isHighVesselRisk ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
          }`}>
            {isHighVesselRisk ? 'VESSEL DANGER' : 'BAD FAT ALERT'}
          </span>
        )}
      </div>
      

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        체내 염증을 유발할 수 있는 가공 유지의 포함 여부를 분석합니다.
      </p>

      {/* 지방 품질 그룹 */}
      <div className="space-y-4">
        
        {/* 1. 주의해야 할 기름 (나쁜 기름) */}
        <FatGroup 
          label="주의해야 할 가공 유지"
          found={has_unhealthy_fats}
          ingredients={unhealthy_fats_ingredients}
          type="unhealthy"
        />

        {/* 2. 권장하는 좋은 기름 (좋은 기름) */}
        <FatGroup 
          label="권장하는 건강한 유지"
          found={has_healthy_fats}
          ingredients={healthy_fats_ingredients}
          type="healthy"
        />
      </div>

      {/* 하단 코치 팁 (블랙 박스) */}
      <CoachTip
        isVisible={true}
        message={
          has_unhealthy_fats 
            ? "혈관 건강에 부담을 줄 수 있는 가공 유지가 포함되어 있습니다. 자주 섭취하기보다는 가끔 즐기는 것이 혈관 건강에 좋습니다."
            : has_healthy_fats 
            ? '와우! 나쁜 기름은 전혀 없고, 몸에 좋은 건강한 지방이 포함되어 있네요. 혈관을 깨끗하게 해주는 아주 훌륭한 구성입니다! ✨'
            : '나쁜 기름 걱정 없는 아주 깔끔한 구성입니다! 여기에 견과류나 올리브유 같은 건강한 지방까지 곁들여진다면 완벽한 식단이 되겠네요.'

            
        }
      />
    </div>
  );
};

// 내부 컴포넌트: 지방 그룹
const FatGroup = ({ label, found, ingredients, type }: any) => {
  // 상태에 따른 컬러 결정 로직
  const isUnhealthy = type === 'unhealthy';
  
  return (
    <div className={`p-4 rounded-2xl transition-all border ${
      found 
        ? (isUnhealthy ? 'bg-red-50/30 border-red-100/50' : 'bg-emerald-50/30 border-emerald-100/50')
        : (isUnhealthy ? 'bg-emerald-50/40 border-emerald-100/50' : 'bg-gray-50/30 border-gray-100/50 opacity-60')
    }`}>
      <div className="flex items-center gap-2 mb-3">
        {/* 상태 아이콘: 나쁜 기름이 없으면 초록색 체크! */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
          found 
            ? (isUnhealthy ? 'bg-red-500' : 'bg-emerald-500') 
            : (isUnhealthy ? 'bg-emerald-500' : 'bg-gray-300')
        }`}>
          {found ? (
            <span className="text-[10px] text-white font-bold">!</span>
          ) : isUnhealthy ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          )}
        </div>

        <span className={`text-sm font-bold ${
          found ? (isUnhealthy ? 'text-red-900' : 'text-emerald-900') : (isUnhealthy ? 'text-emerald-700' : 'text-gray-400')
        }`}>
          {label}
        </span>

        <div className="ml-auto">
          {found ? (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
              isUnhealthy ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {ingredients.length} Detected
            </span>
          ) : isUnhealthy ? (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Clean & Clear
            </span>
          ) : (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Not Found
            </span>
          )}
        </div>
      </div>

      {found ? (
        <div className="flex flex-wrap gap-1.5 pl-7">
          {ingredients.map((ing: string, i: number) => (
            <span key={i} className={`px-2.5 py-1 bg-white text-[11px] rounded-lg border font-bold shadow-sm ${
              isUnhealthy ? 'text-red-600 border-red-200 shadow-red-100/50' : 'text-emerald-600 border-emerald-200'
            }`}>
              {ing}
            </span>
          ))}
        </div>
      ) : isUnhealthy ? (
        <p className="pl-7 text-[11px] text-emerald-600/70 font-medium italic">
          염증 유발 가능성이 있는 유지가 발견되지 않았습니다.
        </p>
      ) : null}
    </div>
  );
};
export default FatQualityReport;