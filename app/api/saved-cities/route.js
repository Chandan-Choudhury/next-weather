import connectDB from "@/config/database";
import Place from "@/models/Place";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const places = await Place.find({});
    return new Response(JSON.stringify(places), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
