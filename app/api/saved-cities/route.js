import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Place from "@/models/Place";

export const GET = async (req, res) => {
  await connectDB();

  try {
    const places = await Place.find({});
    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
