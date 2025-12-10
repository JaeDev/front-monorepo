'use client'

import { OPEN_FOOD_FACTS_API } from "@my-webs/infra-openfoodfacts-api";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {

    fetchProduct();

  }, [])

  // useEffect의 콜백 함수는 직접 async로 만들 수 없으므로,
  // 내부에 async 함수를 선언하고 호출합니다.
  const fetchProduct = async () => {
    // API 서비스 로직이 변경되었으므로 'development' 인자를 제거합니다.
    const productDetail = await OPEN_FOOD_FACTS_API.product.getDetail('development', '5449000214799');
    console.log(productDetail);
  };

  return (
    <div>
      
    </div>
  );
}
