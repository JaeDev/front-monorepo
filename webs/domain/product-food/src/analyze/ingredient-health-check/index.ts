import { OpenFoodFactsProduct } from "@my-webs/core-interfaces";
import { ARTIFICIAL_CHEMICALS_CRITERIA, FAT_CRITERIA, GLYCEMIC_CRITERIA, SWEETENER_CRITERIA } from "./db";

export interface IngredientHealthCheck {
    // 1. 혈당 관리 (GLYCEMIC_CRITERIA)
    has_added_sugars: boolean;
    added_sugars_ingredients: string[];
    has_refined_grains: boolean;
    refined_grains_ingredients: string[];
    has_processed_starches: boolean;
    processed_starches_ingredients: string[];

    // 2. 감미료 구분 (SWEETENER_CRITERIA)
    has_artificial_sweeteners: boolean;
    artificial_sweeteners_ingredients: string[];
    has_natural_sweeteners: boolean;
    natural_sweeteners_ingredients: string[];

    // 3. 유지류 품질 (FAT_CRITERIA)
    has_unhealthy_fats: boolean;
    unhealthy_fats_ingredients: string[];
    has_healthy_fats: boolean;
    healthy_fats_ingredients: string[];

    // 4. 인공 화학물 세분화 (ARTIFICIAL_CHEMICALS_CRITERIA)
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

/**
 * 영어 재료 텍스트를 분석하여 6가지 요소를 체크합니다.
 * @param product Open Food Facts API에서 받은 제품 정보
 * @returns 분석 결과 객체
 */
export function performIngredientHealthCheck(product: OpenFoodFactsProduct): IngredientHealthCheck | undefined {
    if (!product?.ingredients?.length) {
        return undefined;
    }

    const getAllIngredientsText = (ingredients: any[]): string => {
        return ingredients.map(ingredient => {
            const text = ingredient.text || '';
            const childText = (ingredient.ingredients && Array.isArray(ingredient.ingredients))
                ? getAllIngredientsText(ingredient.ingredients)
                : '';
            return `${text} ${childText}`;
        }).join(' ');
    };

    const ingredientsText = getAllIngredientsText(product.ingredients);

    // 텍스트를 소문자로 변환하고, 괄호 안의 내용(비율 정보 등)을 제거하여 정확도를 높입니다.
    const text = ingredientsText.toLowerCase().replace(/\([^)]*\)/g, '');

    // 키워드 검출을 위한 헬퍼 함수
    const getDetected = (keywords: readonly string[]) => keywords.filter(keyword => text.includes(keyword));

    // 각 카테고리별 데이터 추출
    const addedSugars = getDetected(GLYCEMIC_CRITERIA.added_sugars.keywords);
    const refinedGrains = getDetected(GLYCEMIC_CRITERIA.refined_grains.keywords);
    const processedStarches = getDetected(GLYCEMIC_CRITERIA.processed_starches.keywords);

    const artSweeteners = getDetected(SWEETENER_CRITERIA.artificial.keywords);
    const natSweeteners = getDetected(SWEETENER_CRITERIA.natural.keywords);

    const badOils = getDetected(FAT_CRITERIA.unhealthy_fats.keywords);
    const goodOils = getDetected(FAT_CRITERIA.healthy_fats.keywords);

    // 기존에 있던 인공 화학물 로직 유지 (필요 시 별도 CRITERIA 객체 참조)
    const preservatives = getDetected(ARTIFICIAL_CHEMICALS_CRITERIA.preservatives.keywords);
    const antioxidants = getDetected(ARTIFICIAL_CHEMICALS_CRITERIA.antioxidants.keywords);
    const colorants = getDetected(ARTIFICIAL_CHEMICALS_CRITERIA.colorants.keywords);
    const flavorEnhancers = getDetected(ARTIFICIAL_CHEMICALS_CRITERIA.flavor_enhancers.keywords);
    const stabilizers = getDetected(ARTIFICIAL_CHEMICALS_CRITERIA.stabilizers.keywords);

    return {// 혈당 관리
        has_added_sugars: addedSugars.length > 0,
        added_sugars_ingredients: addedSugars,

        has_refined_grains: refinedGrains.length > 0,
        refined_grains_ingredients: refinedGrains,

        has_processed_starches: processedStarches.length > 0,
        processed_starches_ingredients: processedStarches,

        // 감미료
        has_artificial_sweeteners: artSweeteners.length > 0,
        artificial_sweeteners_ingredients: artSweeteners,

        has_natural_sweeteners: natSweeteners.length > 0,
        natural_sweeteners_ingredients: natSweeteners,

        // 지방
        has_unhealthy_fats: badOils.length > 0,
        unhealthy_fats_ingredients: badOils,

        has_healthy_fats: goodOils.length > 0,
        healthy_fats_ingredients: goodOils,

        // 화학 첨가물
        has_preservatives: preservatives.length > 0,
        preservatives_ingredients: preservatives,

        has_antioxidants: antioxidants.length > 0,
        antioxidants_ingredients: antioxidants,

        has_colorants: colorants.length > 0,
        colorants_ingredients: colorants,

        has_flavor_enhancers: flavorEnhancers.length > 0,
        flavor_enhancers_ingredients: flavorEnhancers,

        has_stabilizers: stabilizers.length > 0,
        stabilizers_ingredients: stabilizers,
    };
}