import connectDB from "@/config/database";
import Place from "@/models/Place";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const place = await Place.findOne({ isDefault: true });
    return new Response(JSON.stringify(place), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
