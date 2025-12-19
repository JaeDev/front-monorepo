import React from 'react';

interface ChemicalReportProps {
    has_preservatives: boolean;
    preservatives_ingredients: string[];
    has_antioxidants: boolean;
    antioxidants_ingredients: string[];
    has_colorants: boolean;
    colorants_ingredients: string[];
    has_flavor_enhancers: boolean;
    flavor_enhancers_ingredients: string[];
    has_stabilizers: boolean;
    stabilizers_ingredients: string[];
}

const ChemicalAdditivesReport = ({ 
    has_preservatives, has_antioxidants, has_colorants, has_flavor_enhancers, has_stabilizers,
    preservatives_ingredients, antioxidants_ingredients, colorants_ingredients, flavor_enhancers_ingredients, stabilizers_ingredients
}: ChemicalReportProps) => {
  // 발견된 총 화학물 카테고리 수 계산
  const detectedCount = [
    has_preservatives,
    has_antioxidants,
    has_colorants,
    has_flavor_enhancers,
    has_stabilizers
  ].filter(Boolean).length;

  return (
    <div className="bg-white px-6 py-8 border-t border-gray-50 pb-20"> {/* 하단 여백 추가 */}
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🧪</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">인공 화학물 리포트</h2>
        </div>
        <div className="text-right">
          <span className={`text-xs font-black px-2 py-1 rounded ${
            detectedCount >= 3 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {detectedCount} / 5 CATEGORIES
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        식품의 유통기한, 색상, 맛을 인위적으로 조절하는 첨가물입니다. 과도한 섭취는 장내 환경에 영향을 줄 수 있습니다.
      </p>

      {/* 5대 첨가물 체크리스트 */}
      <div className="space-y-3">
        <ChemicalRow 
          label="보존료 (Preservatives)" 
          found={has_preservatives} 
          ingredients={preservatives_ingredients} 
          icon="🛡️"
        />
        <ChemicalRow 
          label="산화방지제 (Antioxidants)" 
          found={has_antioxidants} 
          ingredients={antioxidants_ingredients} 
          icon="⏳"
        />
        <ChemicalRow 
          label="인공 색소 (Colorants)" 
          found={has_colorants} 
          ingredients={colorants_ingredients} 
          icon="🎨"
        />
        <ChemicalRow 
          label="향미증진제 (Flavor)" 
          found={has_flavor_enhancers} 
          ingredients={flavor_enhancers_ingredients} 
          icon="👅"
        />
        <ChemicalRow 
          label="유화제 및 안정제 (Stabilizers)" 
          found={has_stabilizers} 
          ingredients={stabilizers_ingredients} 
          icon="🏗️"
        />
      </div>

      {/* 가공도 총평 박스 */}
      <div className="mt-10 p-5 bg-blue-50 rounded-3xl border border-blue-100 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-blue-900 font-bold text-sm mb-2">코치의 가공도 평가</h4>
          <p className="text-blue-800 text-xs leading-normal opacity-80">
            {detectedCount >= 3 
              ? "여러 종류의 화학 첨가물이 발견되었습니다. 전형적인 '초가공식품'의 특징을 보이고 있으니 빈도를 줄이는 것이 좋습니다."
              : detectedCount > 0 
              ? "필요 최소한의 첨가물만 들어있거나 비교적 깔끔한 편입니다. 안심하고 드셔도 좋습니다."
              : "화학 첨가물이 거의 없는 아주 깨끗한 클린 라벨 제품입니다! 최고의 선택이에요."}
          </p>
        </div>
        {/* 배경에 큰 아이콘 살짝 노출 */}
        <span className="absolute -bottom-2 -right-2 text-6xl opacity-10 grayscale">🧪</span>
      </div>
    </div>
  );
};

// 첨가물 행 컴포넌트
const ChemicalRow = ({ label, found, ingredients, icon }: any) => {
  return (
    <div className={`p-4 rounded-2xl transition-all border ${
      found ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-transparent opacity-40'
    }`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <div className="flex-1">
          <h3 className={`text-sm font-bold ${found ? 'text-gray-800' : 'text-gray-400'}`}>
            {label}
          </h3>
          {found && (
            <div className="mt-2 flex flex-wrap gap-1">
              {ingredients.map((ing: string, i: number) => (
                <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {found ? (
            <span className="text-red-500 text-xs font-black">DETECTED</span>
          ) : (
            <span className="text-gray-300 text-xs font-medium italic">NONE</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemicalAdditivesReport;