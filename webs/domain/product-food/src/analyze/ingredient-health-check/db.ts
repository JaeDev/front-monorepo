
export const GLYCEMIC_CRITERIA = {
    // 1-1. 직접적인 당분 (단맛이 나는 것)
    added_sugars: {
        label: '당류 및 시럽 (Added Sugars)',
        description: '설탕, 액상과당 등 즉각적으로 혈당을 올리는 감미료입니다.',
        risk_reason: '인슐린 스파이크의 주범이며, 과다 섭취 시 지방간과 당뇨의 원인이 됩니다.',
        keywords: ['sugar', 'sucrose', 'fructose', 'dextrose', 'glucose', 'syrup', 'corn syrup', 'hfcs', 'honey', 'agave nectar', 'maple syrup', 'fruit juice concentrate']
    },
    // 1-2. 정제된 곡물 가루 (밀가루 등)
    refined_grains: {
        label: '정제 탄수화물 (Refined Grains)',
        description: '껍질을 벗겨내어 흡수가 빨라진 곡물 가루입니다.',
        risk_reason: '식이섬유가 없어 설탕과 거의 유사한 속도로 혈당을 높입니다.',
        keywords: ['white flour', 'refined flour', 'wheat flour', 'enriched flour', 'white rice', 'rice flour', 'semolina', 'cereal flour']
    },
    // 1-3. 가공된 전분류 (끈적하거나 형태를 잡는 것)
    processed_starches: {
        label: '가공 전분 (Processed Starches)',
        description: '식감을 위해 첨가된 고농축 전분 성분입니다.',
        risk_reason: '조리/가공 과정을 거치며 소화 흡수율이 극대화되어 혈당을 빠르게 올립니다.',
        keywords: ['starch', 'modified starch', 'corn starch', 'potato starch', 'tapioca starch', 'maltodextrin', 'dextrin', 'potato flakes']
    }
};
export const SWEETENER_CRITERIA = {
    artificial: {
        label: '인공 감미료 및 당알코올',
        description: '화학 합성 감미료 및 칼로리가 낮은 당알코올입니다.',
        risk_reason: '대사 혼란을 야기할 수 있으며, 당알코올은 과다 섭취 시 설사를 유발합니다.',
        keywords: ['sucralose', 'aspartame', 'acesulfame k', 'saccharin', 'neotame', 'sorbitol', 'xylitol', 'erythritol', 'maltitol']
    },
    natural: {
        label: '천연 저칼로리 감미료',
        description: '자연 유래 성분에서 추출한 혈당에 영향이 적은 감미료입니다.',
        risk_reason: '설탕의 좋은 대안이지만, 과도한 단맛 중독에 주의해야 합니다.',
        keywords: ['stevia', 'monk fruit', 'allulose', 'rebaudioside']
    }
};


export const FAT_CRITERIA = {
    // 3-1. 피해야 할 지방
    unhealthy_fats: {
        label: '나쁜 기름 (Unhealthy Fats)',
        description: '팜유, 경화유 및 염증 유발 가능성이 높은 정제 식물성 기름입니다.',
        risk_reason: '혈중 LDL 콜레스테롤을 높이고 심혈관 질환과 체내 염증의 원인이 됩니다.',
        keywords: ['palm oil', 'palm kernel oil', 'canola oil', 'soybean oil', 'rapeseed oil', 'hydrogenated', 'shortening', 'margarine', 'vegetable fat']
    },
    // 3-2. 권장하는 지방
    healthy_fats: {
        label: '좋은 기름 (Healthy Fats)',
        description: '불포화 지방산이 풍부하고 가공이 적은 건강한 유지류입니다.',
        risk_reason: '적당량 섭취 시 심장 건강에 도움을 주고 염증을 완화하는 데 기여합니다.',
        keywords: ['extra virgin olive oil', 'olive oil', 'avocado oil', 'coconut oil', 'flaxseed oil', 'walnut oil', 'mct oil']
    }
};

export const ARTIFICIAL_CHEMICALS_CRITERIA = {
    // 1. 보존료 (Preservatives)
    preservatives: {
        label: '보존료',
        description: '미생물 증식을 억제하여 부패를 방지하는 성분입니다.',
        risk_reason: '아질산나트륨과 같은 일부 보존료는 체내에서 발암 물질로 전환될 가능성이 있으며, 장기 섭취 시 대사 기능에 영향을 줄 수 있습니다.',
        keywords: ['sodium benzoate', 'potassium sorbate', 'calcium propionate', 'sodium nitrite', 'sodium nitrate', 'sulfite', 'e211', 'e202', 'e250']
    },
    // 2. 산화방지제 (Antioxidants)
    antioxidants: {
        label: '산화방지제',
        description: '지방의 산패나 색상 변화를 막아 품질을 유지합니다.',
        risk_reason: 'BHA, BHT 같은 합성 산화방지제는 호르몬 체계를 교란할 수 있다는 연구 결과가 있으며, 과도한 섭취 시 알레르기 반응을 유발할 수 있습니다.',
        keywords: ['bha', 'bht', 'tbhq', 'propyl gallate', 'ascorbyl palmitate', 'e320', 'e321']
    },
    // 3. 착색료 (Artificial Colors)
    colorants: {
        label: '인공 색소',
        description: '시각적 효과를 위해 인위적으로 색을 입히는 성분입니다.',
        risk_reason: '일부 인공 색소는 어린이의 과잉 행동(ADHD)과 연관될 수 있으며, 민감한 사람에게는 피부 두드러기나 천식 증상을 악화시킬 수 있습니다.',
        keywords: ['color', 'colour', 'artificial color', 'titanium dioxide', 'tartrazine', 'red 40', 'yellow 5', 'blue 1', 'e171']
    },
    // 4. 향미증진제 (Flavor Enhancers)
    flavor_enhancers: {
        label: '향미증진제',
        description: '식품의 맛과 향을 더 진하게 느끼게 만드는 성분입니다.',
        risk_reason: 'MSG 등은 일시적인 두통이나 갈증을 유발할 수 있고, 뇌의 보상 체계를 자극하여 가공식품에 대한 중독과 과식을 유발하는 원인이 됩니다.',
        keywords: ['msg', 'monosodium glutamate', 'disodium inosinate', 'disodium guanylate', 'yeast extract', 'hydrolyzed protein']
    },
    // 5. 유화제 및 안정제 (Emulsifiers & Stabilizers)
    stabilizers: {
        label: '유화제 및 안정제',
        description: '기름과 물이 섞이게 하거나 식품의 형태와 질감을 유지합니다.',
        risk_reason: '카라기난이나 일부 유화제는 장 점막을 자극하여 장내 미생물 생태계를 교란하고, 만성 염증성 장질환의 위험을 높일 수 있다는 우려가 있습니다.',
        keywords: ['emulsifier', 'polysorbate', 'carrageenan', 'xanthan gum', 'guar gum', 'carboxymethyl cellulose', 'cmc', 'lecithin']
    }
};