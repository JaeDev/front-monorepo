export interface OpenFoodFactsProductService {
    getProductDetail(barcode: string): Promise<OpenFoodFactsApiResponse>;
    fetchProductList(keyword: string, page: number): Promise<any>;
}

// 전체 API 응답 타입 정의
export interface OpenFoodFactsApiResponse {
    code: string;
    status: number;
    status_verbose: string;
    product?: OpenFoodFactsProduct; // 제품이 발견되지 않을 경우 undefined일 수 있음
}

// product 객체 타입 정의 (분석기에 필요한 필드만)
export interface OpenFoodFactsProduct {
    code: string;
    product_name: string;
    brands?: string;
    image_url?: string;
    nutriscore_grade?: string;
    nova_group?: number;
    ingredients_text?: string;
    ingredients?: OpenFoodFactsIngredients[];
    additives_tags?: string[];
    nutriments: OpenFoodFactsNutriments; // 영양 성분 분석에 필수
}

// 핵심 영양소 타입 정의
interface OpenFoodFactsNutriments {
    [key: string]: number | string | undefined; // 유연성을 위해 인덱스 시그니처 사용
    'energy-kcal_100g'?: number;
    'sugars_100g'?: number;
    'salt_100g'?: number;
    // 필요한 다른 100g당 성분을 추가합니다.
}

type OpenFoodFactsBoolean = 'yes' | 'maybe' ;
interface OpenFoodFactsIngredients {
    id: string;
    is_in_taxonomy: boolean;
    percent_estimate: number;
    percent_max: number;
    percent_min: number;
    text: string;

    vegan?: OpenFoodFactsBoolean;
    vegetarian?: OpenFoodFactsBoolean;

    ciqual_food_code?: string;
    ecobalyse_code?: string;

    from_palm_oil?: OpenFoodFactsBoolean;
    processing?: string;
    quantity?: string;
    quantity_g?: number;
}
