import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, PencilLine, X } from 'lucide-react';

interface BarcodeInfoBarProps {
    barcode: string;
}

const BarcodeInfoBar = ({ barcode }: BarcodeInfoBarProps) => {

    return (
        <div className="w-full bg-white px-6 py-2 flex items-center justify-between border-b border-gray-50 min-h-[40px]">
            <div className="w-10 flex justify-end">
                <button className="p-2 text-gray-300">
                    <X size={18} className="opacity-0" /> {/* 균형용 빈공간 */}
                </button>
            </div>

            {/* 2. 중앙: 바코드 영역 */}
            <div className="flex-1 flex flex-col items-center px-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
                    Product Barcode
                </p>

                <div className="flex items-center gap-2 px-3 bg-gray-50 rounded-full active:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-mono font-bold text-gray-700 tracking-wider">
                        {barcode}
                    </span>
                </div>
            </div>

            {/* 3. 오른쪽: 액션 버튼 */}
            <div className="w-10 flex justify-end">
                <button className="p-2 text-gray-300">
                    <X size={18} className="opacity-0" /> {/* 균형용 빈공간 */}
                </button>
            </div>
        </div>
    );
};

export default BarcodeInfoBar;