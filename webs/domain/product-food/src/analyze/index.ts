const analysisKeywordsEn = {
    sugar: ['sugar', 'sucrose', 'fructose', 'dextrose', 'syrup', 'corn syrup', 'hfcs', 'glucose syrup', 'maltodextrin'],
    flour: ['flour', 'wheat', 'enriched flour', 'starch', 'modified starch', 'gluten'],
    badOil: ['palm oil', 'palm kernel oil', 'canola oil', 'soybean oil', 'rapeseed oil', 'hydrogenated', 'shortening'],
    chemicals: ['preservative', 'bha', 'bht', 'sodium benzoate', 'sorbate', 'color', 'artificial color', 'emulsifier', 'stabilizer', 'msg'],
    artificialSweeteners: ['sucralose', 'aspartame', 'acesulfame k', 'saccharin', 'neotame', 'sorbitol', 'xylitol', 'erythritol', 'maltitol'],
    naturalSweeteners: ['honey', 'maple syrup', 'agave nectar', 'stevia', 'monk fruit', 'dates'],
};

interface AnalysisResult {
    is_sugar_present: boolean;
    is_flour_present: boolean;
    is_bad_oil_present: boolean;
    is_artificial_chemicals_present: boolean;
    is_artificial_sweeteners_present: boolean;
    is_natural_sweeteners_present: boolean;
}

/**
 * 영어 재료 텍스트를 분석하여 6가지 요소를 체크합니다.
 * @param ingredientsText Open Food Facts API에서 받은 재료 텍스트 (영어)
 * @returns 분석 결과 객체
 */
export function analyzeIngredients(ingredientsText: string): AnalysisResult {
    // 텍스트를 소문자로 변환하고, 괄호 안의 내용(비율 정보 등)을 제거하여 정확도를 높입니다.
    const text = ingredientsText.toLowerCase().replace(/\([^)]*\)/g, '').replace(/[\s\.\,\;]/g, '');

    const result: AnalysisResult = {
        is_sugar_present: false,
        is_flour_present: false,
        is_bad_oil_present: false,
        is_artificial_chemicals_present: false,
        is_artificial_sweeteners_present: false,
        is_natural_sweeteners_present: false,
    };

    for (const [key, keywords] of Object.entries(analysisKeywordsEn)) {
        for (const keyword of keywords) {
            if (text.includes(keyword)) {
                // 키에 따라 해당하는 속성에 true 설정
                const resultKey = `is_${key}s_present` as keyof AnalysisResult;
                (result as any)[resultKey.replace('s_', '_')] = true; 
                // 키에 복수형 s가 붙어있을 수 있으므로 is_sugar_present 등으로 변환
                break; // 해당 카테고리에서 하나라도 발견되면 다음 카테고리로 이동
            }
        }
    }

    // 객체의 속성 이름이 올바르게 매핑되도록 최종 반환 전에 조정 (예: sugar -> is_sugar_present)
    return {
        is_sugar_present: result.is_sugar_present,
        is_flour_present: result.is_flour_present,
        is_bad_oil_present: result.is_bad_oil_present,
        is_artificial_chemicals_present: result.is_artificial_chemicals_present,
        is_artificial_sweeteners_present: result.is_artificial_sweeteners_present,
        is_natural_sweeteners_present: result.is_natural_sweeteners_present,
    };
}