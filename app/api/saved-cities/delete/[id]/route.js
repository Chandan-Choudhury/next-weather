import connectDB from "@/config/database";
import Place from "@/models/Place";

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const deletedCity = await Place.findByIdAndDelete(id);

    if (!deletedCity) {
      return new Response("City not found", { status: 404 });
    }

    return new Response(JSON.stringify(deletedCity), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
