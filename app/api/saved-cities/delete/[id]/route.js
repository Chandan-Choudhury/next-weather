import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Place from "@/models/Place";

export const DELETE = async (req, { params }) => {
  await connectDB();

  try {
    const { id } = params;
    const deletedCity = await Place.findByIdAndDelete(id);

    if (!deletedCity) {
      return NextResponse.json("City not found", { status: 404 });
    }

    return NextResponse.json(deletedCity, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
