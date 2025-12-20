'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Camera, Barcode, Search, Image as ImageIcon  } from 'lucide-react';
import ProductSummary, { ProductSummaryProps } from '@/components/ProductSummary.client';
import { OPEN_FOOD_FACTS_API } from '@my-webs/infra-openfoodfacts-api';
import { performIngredientHealthCheck } from '@my-webs/domain-product-food';
import GlycemicReport from '@/components/GlycemicReport.client';
import SweetenerReport from '@/components/SweetnerReport.client';
import FatQualityReport from '@/components/FatQualityReport.client';
import ChemicalAdditivesReport from '@/components/ChemicalAdditivesReport.client';
import AnalysisLoading from '@/components/AnalysisLoading.client';

export default function Home() {

  const [summary, setSummary] = useState<ProductSummaryProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  
  // 리포트 섹션의 위치를 가리키는 레퍼런스
  const reportRef = useRef<HTMLDivElement>(null);

  // summary 데이터가 들어오면 자동으로 상단으로 스크롤 이동
  useEffect(() => {
    if (summary && !isLoading) {
      // 약간의 지연 시간을 주어 DOM이 렌더링된 후 스크롤이 작동하게 함
      const scrollTimeout = setTimeout(() => {
        reportRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // 섹션의 시작 부분이 화면 상단에 오도록
        });
      }, 100);

      return () => clearTimeout(scrollTimeout);
    }
  }, [summary]);


  // useEffect의 콜백 함수는 직접 async로 만들 수 없으므로,
  // 내부에 async 함수를 선언하고 호출합니다.
  const fetchOpenFoodFactsProductDetail = async (barcode: string) => {
    setIsLoading(true); // 로딩 시작!

    // API 서비스 로직이 변경되었으므로 'development' 인자를 제거합니다.
    try {
      const productDetail = await OPEN_FOOD_FACTS_API.product.getDetail('development', barcode);
      setIsLoading(false); // 로딩 시작!

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
        barcode: barcode,
        thumbnail: product.image_url,
        brand: product.brands,
        checkResult: result
      })

    } catch (e) {
      // 상품이 없음
    } finally {
      setIsLoading(false); // 로딩 시작!
    }
    
  };

  // 나중에 API 연결이나 페이지 이동 로직을 여기서 처리하면 돼!
  const handleAnalyze = (barcode: string) => {
    fetchOpenFoodFactsProductDetail(barcode);
  };

  const handleFile = (file: File) => {
    console.log(file);
  };

  return (
    <div>
      <div className="min-h-screen bg-white flex flex-col px-6 pt-20 pb-10">
        {/* 로딩 모션 노출 */}
        {isLoading && <AnalysisLoading />}

        {/* 1. 타이틀 & 브랜드 섹션 */} 
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-4">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">AI Food Coach</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">
            성분표 뒤에 숨겨진<br />
            <span className="text-emerald-500 text-4xl">진실을 찾으세요</span>
          </h1>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            바코드를 찍거나 번호를 입력하면<br />
            당신의 혈당과 혈관 건강을 분석해 드립니다.
          </p>
        </div>

        {/* 2. 메인 액션: 카메라 스캔 */}
        <div className="mt-12 flex flex-col gap-4">
          <ScanActionCard onScan={handleFile} />

          {/* 구분선 */}
          <div className="flex items-center gap-4 my-2">
            <div className="h-[1px] flex-1 bg-gray-100"></div>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">OR</span>
            <div className="h-[1px] flex-1 bg-gray-100"></div>
          </div>

          {/* 3. 서브 액션: 텍스트 입력 */}
          <BarcodeInputField onSubmit={handleAnalyze} />
        </div>

        {/* 4. 하단 보조 기능 */}
        <div className="mt-auto pt-10">
          <AlbumUploadButton onUpload={handleFile} />
        </div>
      </div>
      {
        summary && !isLoading && (
          <div ref={reportRef} className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <ProductSummary {...summary} />
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
          </div>
        )
      }
    </div>
  );
};

const ScanActionCard = ({ onScan }: { onScan: (f: File) => void }) => (
  <label className="relative group cursor-pointer">
    <input 
      type="file" accept="image/*" capture="environment" className="hidden" 
      onChange={(e) => e.target.files?.[0] && onScan(e.target.files[0])} 
    />
    <div className="w-full bg-gray-900 aspect-[4/3] rounded-[32px] flex flex-col items-center justify-center gap-4 transition-transform active:scale-[0.98] shadow-2xl shadow-gray-200 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 relative z-10">
        <Camera size={32} className="text-white" />
      </div>
      <div className="text-center relative z-10">
        <p className="text-white font-bold text-lg">바코드 스캔하기</p>
        <p className="text-gray-400 text-xs">카메라로 제품을 비추세요</p>
      </div>
    </div>
  </label>
);

const BarcodeInputField = ({ onSubmit }: { onSubmit: (b: string) => void }) => {
  const [val, setVal] = React.useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(val); }} className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
        <Barcode size={20} />
      </div>
      <input
        type="tel" pattern="[0-9]*" value={val}
        onChange={(e) => setVal(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder="바코드 번호를 직접 입력"
        className="w-full pl-14 pr-16 py-5 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-[24px] outline-none font-mono font-bold text-gray-800 transition-all"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-[18px] active:scale-90 transition-transform">
        <Search size={20} />
      </button>
    </form>
  );
};

const AlbumUploadButton = ({ onUpload }: { onUpload: (f: File) => void }) => (
  <label className="flex flex-col items-center gap-2 cursor-pointer group mx-auto w-fit">
    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-active:bg-gray-100 transition-colors">
      <ImageIcon size={20} className="text-gray-400" />
    </div>
    <span className="text-[11px] font-bold text-gray-400">앨범에서 찾기</span>
    <input 
      type="file" accept="image/*" className="hidden" 
      onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} 
    />
  </label>
);