import { Schema, model, models } from "mongoose";

const PlaceSchema = new Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    latlong: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    current: {
      time: {
        type: Date,
        required: true,
      },
      temperature2m: {
        type: Number,
        required: true,
      },
      apparentTemperature: {
        type: Number,
        required: true,
      },
      isDay: {
        type: Boolean,
        required: true,
      },
      precipitation: {
        type: Number,
        required: true,
      },
      rain: {
        type: Number,
        required: true,
      },
      weatherCode: {
        type: Number,
        required: true,
      },
      windSpeed10m: {
        type: Number,
        required: true,
      },
    },
    daily: {
      time: {
        type: [Date],
        required: true,
      },
      weatherCode: {
        type: [Number],
        required: true,
      },
      temperature2mMax: {
        type: [Number],
        required: true,
      },
      temperature2mMin: {
        type: [Number],
        required: true,
      },
      uvIndexMax: {
        type: [Number],
        required: true,
      },
      precipitationProbabilityMax: {
        type: [Number],
        required: true,
      },
      precipitationProbabilityMin: {
        type: [Number],
        required: true,
      },
      precipitationProbabilityMean: {
        type: [Number],
        required: true,
      },
    },
    hourly: {
      time: {
        type: [Date],
        required: true,
      },
      temperature2m: {
        type: [Number],
        required: true,
      },
      weatherCode: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Place = models.Place || model("Place", PlaceSchema);

export default Place;
