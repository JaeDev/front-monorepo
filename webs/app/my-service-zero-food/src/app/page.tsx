'use client'

import ChemicalAdditivesReport from "@/components/ChemicalAdditivesReport.client";
import FatQualityReport from "@/components/FatQualityReport.client";
import GlycemicReport from "@/components/GlycemicReport.client";
import ProductSummary, { ProductSummaryProps } from "@/components/ProductSummary.client";
import SweetenerReport from "@/components/SweetnerReport.client";
import { performIngredientHealthCheck } from "@my-webs/domain-product-food";
import { OPEN_FOOD_FACTS_API } from "@my-webs/infra-openfoodfacts-api";
import { useEffect, useState } from "react";

export default function Home() {

  const [summary, setSummary] = useState<ProductSummaryProps | undefined>(undefined);

  useEffect(() => {

    fetchOpenFoodFactsProductDetail();

  }, [])

  // useEffect의 콜백 함수는 직접 async로 만들 수 없으므로,
  // 내부에 async 함수를 선언하고 호출합니다.
  const fetchOpenFoodFactsProductDetail = async () => {
    // API 서비스 로직이 변경되었으므로 'development' 인자를 제거합니다.
    const productDetail = await OPEN_FOOD_FACTS_API.product.getDetail('development', '04963406');
    if (productDetail.status !== 1) {
      // error
      alert(`[ERROR] ${productDetail.status_verbose}`);
      return;
    }

    const product = productDetail.product;
    if (product === undefined || product === null ) {
      alert(`[ERROR] No Product Data`)
      return;
    }

    const result = performIngredientHealthCheck(product);
    console.log(product.ingredients)

    setSummary({
      name: product.product_name,
      thumbnail: product.image_url,
      brand: product.brands,
      checkResult: result
    })
  };

  return (
    <div>
      {
        summary && <>
          <div>
            <ProductSummary {...summary} />
          </div>
          <div>
            <GlycemicReport {...summary.checkResult!} />
          </div>
          <div>
            <SweetenerReport {...summary.checkResult!} />
          </div>
          <div>
            <FatQualityReport {...summary.checkResult!} />
          </div>
          <div>
            <ChemicalAdditivesReport {...summary.checkResult!} />
          </div>
        </>
      }
    </div>
  );
}
