'use client'

import { IngredientHealthCheck } from '@my-webs/domain-product-food';
import React from 'react';

// 위에서 정의한 인터페이스를 타입으로 사용
export interface ProductSummaryProps {
  name: string;
  thumbnail?: string;
  brand?: string;
  checkResult?: IngredientHealthCheck;
}

const ProductSummary = ({ name, thumbnail, brand, checkResult }: ProductSummaryProps) => {

  // 종합 등급 및 상태 계산
  const getGradeStatus = () => {
    const dangerScore = [
      checkResult?.has_added_sugars,
      checkResult?.has_unhealthy_fats,
      checkResult?.has_preservatives,
      checkResult?.has_refined_grains
    ].filter(Boolean).length;

    if (dangerScore >= 3) return { label: '위험', color: 'bg-red-500', icon: '🚫', msg: '섭취를 권장하지 않습니다.' };
    if (dangerScore >= 1) return { label: '주의', color: 'bg-amber-500', icon: '⚠️', msg: '성분을 확인하고 섭취하세요.' };
    return { label: '안심', color: 'bg-emerald-500', icon: '✅', msg: '매우 깨끗한 성분입니다.' };
  };

  console.log(checkResult);
  const status = getGradeStatus();

  return (
    <div className={`relative w-full text-white ${status.color} transition-colors duration-500`}>
      <div className="max-w-md mx-auto px-6 pt-10 pb-8">
        
        {/* 1. 상품 이미지 & 브랜드 정보 */}
        <div className="flex flex-col items-center mb-6">
          {thumbnail ? (
            <div className="relative w-32 h-32 mb-4">
              <img 
                src={thumbnail} 
                alt={name} 
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20"
              />
              {/* 등급 미니 배지 (이미지 위에 오버레이) */}
              <div className="absolute -bottom-2 -right-2 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-black shadow-lg">
                {status.label}
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
              <span className="text-3xl">📦</span>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1 font-bold">
              {brand || 'Unknown Brand'}
            </p>
            <h1 className="text-2xl font-extrabold leading-tight px-4 break-keep">
              {name}
            </h1>
          </div>
        </div>

        {/* 2. 상태 메시지 카드 */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 mb-6 border border-white/10 shadow-inner">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{status.icon}</span>
            <div>
              <p className="text-sm opacity-80 font-medium">코치의 분석 결과</p>
              <p className="text-lg font-bold">{status.msg}</p>
            </div>
          </div>
        </div>

        {/* 3. 핵심 지표 퀵 배지 (가로형 그리드) */}
        <div className="grid grid-cols-3 gap-3">
          <BadgeItem 
            title="혈당" 
            value={checkResult?.has_added_sugars ? '위험' : (checkResult?.has_refined_grains ? '주의' : '안전')}
          />
          <BadgeItem 
            title="지방" 
            value={checkResult?.has_unhealthy_fats ? '위험' : '안전'} 
          />
          <BadgeItem 
            title="첨가물" 
            value={checkResult?.has_artificial_chemicals ? '경고' : '안전'} 
          />
        </div>
      </div>

      {/* 하단 곡선 디자인 (상세 페이지로 이어지는 느낌) */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-white rounded-t-[32px]"></div>
    </div>
  );
};

// 퀵 배지 서브 컴포넌트
const BadgeItem = ({ title, value }: { title: string, value: string }) => {
  const getColors = () => {
    if (value === '위험') return 'bg-red-600/30 text-red-100 border-red-300/30';
    if (value === '주의' || value === '경고') return 'bg-amber-600/30 text-amber-100 border-amber-300/30';
    return 'bg-emerald-600/30 text-emerald-100 border-emerald-300/30';
  };

  return (
    <div className={`flex flex-col items-center justify-center py-3 rounded-2xl border backdrop-blur-sm ${getColors()}`}>
      <span className="text-[10px] font-bold opacity-70 mb-1">{title}</span>
      <span className="text-sm font-black">{value}</span>
    </div>
  );
};

export default ProductSummary;