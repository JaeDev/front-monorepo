// @/shared/utils/barcode.ts
import { BrowserMultiFormatReader, DecodeHintType } from '@zxing/library';

const reader = new BrowserMultiFormatReader();

// 바코드 인식 속도와 정확도를 높이기 위한 힌트 설정
const hints = new Map();
hints.set(DecodeHintType.POSSIBLE_FORMATS, null); // 모든 포맷 지원

export const scanBarcodeFromImage = async (file: File): Promise<string> => {
  const imageUrl = URL.createObjectURL(file);
  
  try {
    const result = await reader.decodeFromImageUrl(imageUrl);
    return result.getText();
  } catch (error) {
    throw new Error('바코드를 인식하지 못했습니다.');
  } finally {
    URL.revokeObjectURL(imageUrl); // 메모리 해제
  }
};