import { NextResponse } from 'next/server';

export const vapiResponse = (toolCallId: string, result: object) =>
  NextResponse.json({
    results: [{ toolCallId, result: JSON.stringify(result) }],
  });
