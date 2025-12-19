import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, PencilLine, X } from 'lucide-react';

interface BarcodeInfoBarProps {
    initialBarcode: string;
    onBarcodeChange: (newBarcode: string) => void;
}

const BarcodeInfoBar = ({ initialBarcode, onBarcodeChange }: BarcodeInfoBarProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [barcode, setBarcode] = useState(initialBarcode);
    const [tempBarcode, setTempBarcode] = useState(initialBarcode);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
        inputRef.current.focus();
        // 모바일에서 키보드가 올라올 때 입력을 돕기 위해 전체 선택
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
        }
    }, [isEditing]);

    const handleSave = () => {
        const _barcode = tempBarcode.trim();
        if (_barcode !== "" && _barcode !== initialBarcode) {
            setBarcode(_barcode)
            onBarcodeChange(_barcode);
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempBarcode(barcode);
        setIsEditing(false);
    };

    return (
        <div className="w-full bg-white px-6 py-4 flex items-center justify-between border-b border-gray-50 sticky top-0 z-50 min-h-[72px]">
            {/* 1. 왼쪽 영역: 평상시엔 뒤로가기, 수정시엔 취소(X) */}
            <div className="w-10">
                {isEditing ? (
                <button 
                    onClick={handleCancel} // 여기서 실행!
                    className="p-2 text-gray-400 active:bg-red-50 active:text-red-500 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
                ) : (
                <button className="p-2 -ml-2 text-gray-400 active:bg-gray-50 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </button>
                )}
            </div>

            {/* 2. 중앙: 바코드 영역 */}
            <div className="flex-1 flex flex-col items-center px-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                {isEditing ? 'Editing Mode' : 'Product Identifier'}
                </p>

                {isEditing ? (
                <div className="flex items-center w-full max-w-[200px] ">
                    <input
                    ref={inputRef}
                    type="tel" // 모바일에서 숫자 키패드 우선 노출 (바코드용)
                    pattern="[0-9]*"
                    value={tempBarcode}
                    onChange={(e) => setTempBarcode(e.target.value.replace(/[^0-9]/g, ''))} // 숫자만 입력 가능하게
                    onBlur={(e) => {
                        // 저장 버튼 클릭 시 blur 이벤트와 충돌 방지를 위해 지연 처리하거나 버튼으로만 저장하게 설정
                        if (e.relatedTarget === null) handleSave();
                    }}
                    className="w-full text-center font-mono font-bold text-emerald-600 bg-emerald-50 rounded-lg outline-none border-1 border-emerald-200"
                    />
                </div>
                ) : (
                <div 
                    onClick={() => setIsEditing(true)} // 모바일 배려: 한 번 터치로 수정 진입
                    className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full active:bg-gray-100 transition-colors cursor-pointer"
                >
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-mono font-bold text-gray-700 tracking-wider">
                        {barcode}
                    </span>
                    <PencilLine size={12} className="text-gray-400" />
                </div>
                )}
            </div>

            {/* 3. 오른쪽: 액션 버튼 */}
            <div className="w-10 flex justify-end">
                {isEditing ? (
                <button 
                    onMouseDown={(e) => e.preventDefault()} // Blur 방지
                    onClick={handleSave} 
                    className="p-2 bg-emerald-500 text-white rounded-xl shadow-sm active:scale-95 transition-transform"
                >
                    <Check size={18} />
                </button>
                ) : (
                <button className="p-2 text-gray-300">
                    <X size={18} className="opacity-0" /> {/* 균형용 빈공간 */}
                </button>
                )}
            </div>
        </div>
    );
};

export default BarcodeInfoBar;