import { OpenFoodFactsApiResponse } from "@my-webs/core-interfaces";
import { OpenFoodFactsProductServiceImpl } from "./OpenFoodFactsProductServiceImpl";
import { Environment } from "@my-webs/core-shared-types";

const OpenFoodFactsProductServiceImpl_getProductDetail = (env: Environment, barcode: string): Promise<OpenFoodFactsApiResponse> => {
    return new OpenFoodFactsProductServiceImpl(env).getProductDetail(barcode);
}

export const OPEN_FOOD_FACTS_API = {
    product: {
        getDetail: OpenFoodFactsProductServiceImpl_getProductDetail
    }
}