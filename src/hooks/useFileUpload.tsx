import { getBase64FromImage } from './getBase64FromImage';
import { usePostFiles } from '@/apis/common';
import { useCallback, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface UseImageUploadProps {
  /**
   * 파일 업로드가 완료되었을 때 실행할 함수를 지정합니다.
   */
  handleFileChange: (fileUrlList: string[]) => void;
  options?: {
    /**
     * 업로드할 파일의 타입을 지정합니다. (default: image/*)
     */
    accept?: string;
    /**
     * 다중 업로드를 허용할지 여부를 지정합니다. (default: false)
     */
    multiple?: boolean;
  };
}

export function useFileUpload(
  handleFileChange: UseImageUploadProps['handleFileChange'],
  options?: UseImageUploadProps['options']
) {
  const { mutate, isPending } = usePostFiles();
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const handleFileUploadClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = options?.accept || 'image/*';
    input.multiple = options?.multiple || false;
    input.onchange = async (event) => {
      const { files } = event.target as HTMLInputElement;
      if (!files) return;

      const base64 = await getBase64FromImage(files[0]);
      setPreviewImage(base64);

      mutate(
        { fileList: Array.from(files) },
        {
          onSuccess: (data) => {
            handleFileChange(data.fileUrlList);
          },
        }
      );
    };
    input.click();
  }, [handleFileChange, mutate, options?.accept, options?.multiple]);

  return {
    handleFileUploadClick,
    isPending,
    previewImage,
  };
}
