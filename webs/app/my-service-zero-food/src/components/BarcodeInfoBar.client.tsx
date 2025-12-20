import React from 'react';
import { X } from 'lucide-react';
import { SafeStatus } from './ProductSummary.client';

interface BarcodeInfoBarProps {
    barcode: string;
    status: SafeStatus;
}

const BarcodeInfoBar = ({ barcode, status }: BarcodeInfoBarProps) => {

    return (
        <div className={`w-full ${status === '위험' ? 'bg-red-500' : (status === '주의' ? 'bg-amber-500' : 'bg-emerald-500')} px-6 py-2 flex items-center justify-between min-h-[40px]`}>
            <div className="w-10 flex justify-end">
                <button className="p-2 text-white">
                    <X size={18} className="opacity-0" /> {/* 균형용 빈공간 */}
                </button>
            </div>

            {/* 2. 중앙: 바코드 영역 */}
            <div className="flex-1 flex flex-col items-center px-2">
                <p className="text-[9px] font-black text-white uppercase tracking-[0.2em] mt-1">
                    Product Barcode
                </p>

                <span className="text-sm font-mono font-bold text-white tracking-wider">
                    {barcode}
                </span>
            </div>

            {/* 3. 오른쪽: 액션 버튼 */}
            <div className="w-10 flex justify-end">
                <button className="p-2 text-white">
                    <X size={18} className="opacity-0" /> {/* 균형용 빈공간 */}
                </button>
            </div>
        </div>
    );
};

export default BarcodeInfoBar;