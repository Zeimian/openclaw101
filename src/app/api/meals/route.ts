import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock meal history data
    const meals = [
      {
        id: '1',
        name: '早餐 - 燕麦粥',
        calories: 350,
        protein: 12,
        carbs: 58,
        fat: 8,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        mealType: 'breakfast'
      },
      {
        id: '2',
        name: '午餐 - 鸡胸肉沙拉',
        calories: 450,
        protein: 35,
        carbs: 25,
        fat: 18,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        mealType: 'lunch'
      },
      {
        id: '3',
        name: '晚餐 - 三文鱼配蔬菜',
        calories: 520,
        protein: 40,
        carbs: 30,
        fat: 22,
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        mealType: 'dinner'
      }
    ];

    return NextResponse.json({
      success: true,
      meals,
      total: meals.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取餐食记录失败' },
      { status: 500 }
    );
  }
}
