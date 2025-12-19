'use client'

import { ARTIFICIAL_CHEMICALS_CRITERIA, FAT_CRITERIA, GLYCEMIC_CRITERIA, IngredientHealthCheck, SWEETENER_CRITERIA } from '@my-webs/domain-product-food';
import React from 'react';

// 위에서 정의한 인터페이스를 타입으로 사용
export interface ProductSummaryProps {
  name: string;
  thumbnail?: string;
  brand?: string;
  checkResult?: IngredientHealthCheck;
}

const ProductSummary = ({ name, thumbnail, brand, checkResult }: ProductSummaryProps) => {

  type SafeStatus = '위험' | '주의' | '안전';

  const getGradeStatus = () => {
    const redFlags = [];
    const yellowFlags = [];

    // 1. 위험 항목 수집 (Red Flags)
    if (checkResult?.has_added_sugars) redFlags.push(GLYCEMIC_CRITERIA.added_sugars.risk_reason);
    if (checkResult?.has_refined_grains) redFlags.push(GLYCEMIC_CRITERIA.refined_grains.risk_reason);
    if (checkResult?.has_unhealthy_fats) redFlags.push(FAT_CRITERIA.unhealthy_fats.risk_reason);
    if (checkResult?.has_preservatives) redFlags.push(ARTIFICIAL_CHEMICALS_CRITERIA.preservatives.risk_reason);
    if (checkResult?.has_antioxidants) redFlags.push(ARTIFICIAL_CHEMICALS_CRITERIA.antioxidants.risk_reason);
    if (checkResult?.has_stabilizers) redFlags.push(ARTIFICIAL_CHEMICALS_CRITERIA.stabilizers.risk_reason);

    // 2. 주의 항목 수집 (Yellow Flags)
    if (checkResult?.has_processed_starches) yellowFlags.push(GLYCEMIC_CRITERIA.processed_starches.risk_reason);
    if (checkResult?.has_artificial_sweeteners) yellowFlags.push(SWEETENER_CRITERIA.artificial.risk_reason);
    if (checkResult?.has_colorants) yellowFlags.push(ARTIFICIAL_CHEMICALS_CRITERIA.colorants.risk_reason);

    // 3. 상태 결정 (우선순위: 위험 > 주의 > 안심)
    if (redFlags.length > 0) {
      return { label: '위험', color: 'bg-red-500', icon: '🚫', msgs: redFlags };
    }
    if (yellowFlags.length > 0) {
      return { label: '주의', color: 'bg-amber-500', icon: '⚠️', msgs: yellowFlags };
    }
    return { label: '안심', color: 'bg-emerald-500', icon: '✅', msgs: ['매우 깨끗한 성분입니다.'] };
  };

  const status = getGradeStatus();
  
  // 각 섹션별 상태 판별 로직
  const getSectionStatus = (type: 'glycemic' | 'sweetener' | 'fat' | 'chemical'): SafeStatus => {
    switch (type) {
      case 'glycemic':
        return checkResult?.has_added_sugars || checkResult?.has_refined_grains ? '위험' : (checkResult?.has_processed_starches ? '주의' : '안전');
      case 'sweetener':
        return checkResult?.has_artificial_sweeteners ? '주의' : '안전';
      case 'fat':
        return checkResult?.has_unhealthy_fats ? '위험' : '안전';
      case 'chemical':
        return checkResult?.has_preservatives || checkResult?.has_antioxidants || checkResult?.has_stabilizers ? '위험' : (checkResult?.has_colorants ? '주의' : '안전');
    }
  };

  return (
    <div className={`relative w-full text-white ${status.color} transition-colors duration-500`}>
      <div className="max-w-md mx-auto px-6 pt-12 pb-10">
        
        {/* 1. 제품 기본 정보 섹션 */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative shrink-0">
            {thumbnail ? (
              <img 
                src={thumbnail} 
                alt={name} 
                className="w-24 h-24 object-cover rounded-2xl shadow-lg border-2 border-white/30"
              />
            ) : (
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 text-3xl">📦</div>
            )}
            <div className="absolute -top-2 -left-2 bg-white text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-md">
              {status.icon}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">{brand || 'HEALTH COACH ANALYZED'}</p>
            <h1 className="text-xl font-extrabold leading-tight truncate mb-2">{name}</h1>
          </div>
        </div>

        {/* 메시지 영역: 여러 개의 메시지를 깔끔하게 노출 */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 mb-6 border border-white/10 shadow-inner">
          <div className="flex gap-4">
            <span className="text-4xl shrink-0">{status.icon}</span>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] opacity-70 font-black uppercase mb-2 tracking-widest text-white/90">
                주요 분석 결과 ({status.msgs.length})
              </p>
              
              {/* 메시지 리스트 또는 롤링 텍스트 */}
              <div className="space-y-3">
                {status.msgs.slice(0, 2).map((msg, idx) => ( // 상단에는 최대 2개만 노출
                  <p key={idx} className="text-sm font-bold leading-snug break-keep animate-fadeIn">
                    • {msg}
                  </p>
                ))}
                {status.msgs.length > 2 && (
                  <p className="text-[10px] opacity-60 font-medium italic">
                    외 {status.msgs.length - 2}개의 주의 사항이 더 있습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      
        {/* 4대 핵심 지표 대시보드 (Grid) */}
        <div className="grid grid-cols-2 gap-3 pb-10">
          <SectionBadge 
            icon="🩸" 
            label="혈당 관리" 
            status={getSectionStatus('glycemic')} 
          />
          <SectionBadge 
            icon="🍯" 
            label="감미료" 
            status={getSectionStatus('sweetener')} 
          />
          <SectionBadge 
            icon="🥑" 
            label="지방 품질" 
            status={getSectionStatus('fat')} 
          />
          <SectionBadge 
            icon="🧪" 
            label="첨가물" 
            status={getSectionStatus('chemical')} 
          />
        </div>
      </div>


      {/* 다음 섹션으로 유도하는 디자인 요소 */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-[32px] flex justify-center items-center">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mt-2 opacity-50"></div>
      </div>
    </div>
  );
};

// 지표 배지 서브 컴포넌트
const SectionBadge = ({ icon, label, status }: { icon: string, label: string, status: string }) => {
  
  const statusColor = {
    위험: 'text-red-200 bg-red-900/20 border-red-400/30',
    주의: 'text-amber-100 bg-amber-900/20 border-amber-400/30',
    안전: 'text-white bg-white/10 border-white/20',
  }[status] || 'bg-white/10 border-white/20';

  return (
    <div className={`flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-sm ${statusColor}`}>
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold opacity-70 leading-none mb-1">{label}</span>
        <span className="text-xs font-black tracking-tight">{status}</span>
      </div>
    </div>
  );
};

export default ProductSummary;