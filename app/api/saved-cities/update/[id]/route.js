import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Place from "@/models/Place";

export const PATCH = async (req, { params }) => {
  await connectDB();

  try {
    const { id } = params;

    const currentDefaultCity = await Place.findOne({ isDefault: true });

    if (currentDefaultCity) {
      currentDefaultCity.isDefault = false;
      await currentDefaultCity.save();
    }

    const newDefaultCity = await Place.findById(id);

    if (!newDefaultCity) {
      return new Response("City not found", { status: 404 });
    }

    newDefaultCity.isDefault = true;
    await newDefaultCity.save();

    return NextResponse.json(newDefaultCity, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
