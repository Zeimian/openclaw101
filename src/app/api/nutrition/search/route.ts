import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    // 验证请求参数
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的搜索关键词' },
        { status: 400 }
      );
    }

    // 模拟营养数据库查询
    const mockNutritionData = {
      query,
      results: [
        {
          name: query,
          calories: Math.floor(Math.random() * 300) + 50,
          protein: Math.floor(Math.random() * 30) + 5,
          carbs: Math.floor(Math.random() * 50) + 10,
          fat: Math.floor(Math.random() * 20) + 2,
          fiber: Math.floor(Math.random() * 10) + 1,
          servingSize: '100g',
        }
      ],
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(mockNutritionData);
  } catch (error) {
    console.error('Nutrition search error:', error);
    return NextResponse.json(
      { error: '搜索失败，请稍后重试' },
      { status: 500 }
    );
  }
}
