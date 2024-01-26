import publicApi from '../config/publicApi';
import { compressImage } from '@/utils/compressImage';

import type { FilesRequest, FilesResponse } from '.';

export const postFiles = async ({ fileList }: FilesRequest) => {
  const formData = new FormData();

  alert('파일 업로드 중입니다. 잠시만 기다려주세요.');

  const compressedFileList = await Promise.all(fileList.map((file) => compressImage(file)));

  alert('파일 업로드가 완료되었습니다.');
  compressedFileList.forEach((file) => {
    formData.append('fileList', file);
  });
  alert('파일 업로드 중입니다. 잠시만 기다려주세요.2222');

  return publicApi.post<FilesResponse>('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
