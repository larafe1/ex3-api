import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

import { EX3_STORAGE_KEYS } from '@/common/constants';
import api, { type ApiError, type ApiErrorData } from '@/lib/axios';

import type { DeleteAssetResponseData } from '../types';

export const DELETE = async (req: NextRequest) => {
  try {
    const assetSymbol = req.nextUrl.pathname.split('/').at(-1);
    if (!assetSymbol) throw new Error('Missing asset symbol');

    const authToken = cookies().get(EX3_STORAGE_KEYS.Token);
    if (!authToken?.value) throw new Error('Missing access token');

    const headers = {
      Authorization: `Bearer ${authToken.value}`
    };

    const { data, status, statusText } =
      await api.server.delete<DeleteAssetResponseData>(
        `/v1/asset/${assetSymbol}`,
        { headers }
      );

    return NextResponse.json<DeleteAssetResponseData>(data, {
      status,
      statusText
    });
  } catch (e) {
    const { message } = e as Error;
    const { status, statusText, ...error }: ApiError = JSON.parse(message);

    return NextResponse.json<ApiErrorData>(error, { status, statusText });
  }
};
