import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Place from "@/models/Place";

export const GET = async (req) => {
  await connectDB();

  try {
    const place = await Place.findOne({ isDefault: true });
    return NextResponse.json(place, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
