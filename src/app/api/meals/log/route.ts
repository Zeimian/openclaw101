import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必需字段
    if (!body.name || !body.calories) {
      return NextResponse.json(
        { error: '缺少必需字段：name 和 calories' },
        { status: 400 }
      );
    }

    // 模拟保存餐食记录
    const mealLog = {
      id: Date.now().toString(),
      name: body.name,
      calories: body.calories,
      protein: body.protein || 0,
      carbs: body.carbs || 0,
      fat: body.fat || 0,
      fiber: body.fiber || 0,
      timestamp: new Date().toISOString(),
      success: true
    };

    return NextResponse.json(mealLog, { status: 200 });
  } catch (error) {
    console.error('记录餐食失败:', error);
    return NextResponse.json(
      { error: '记录餐食失败' },
      { status: 500 }
    );
  }
}
