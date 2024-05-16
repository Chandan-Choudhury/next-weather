import connectDB from "@/config/database";
import Place from "@/models/Place";

export const PATCH = async (req, { params }) => {
  try {
    await connectDB();

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

    return new Response(JSON.stringify(newDefaultCity), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
