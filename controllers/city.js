import { cityModel } from "../models/CityName.js";
function capitalizeWords(str) {
    if (!str) return "";
    return str
        .trim()
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

export async function HandleCityAdded({ source, destination }) {
    try {
        const formattedSource = capitalizeWords(source);
        const formattedDestination = capitalizeWords(destination);


        await cityModel.updateOne(
            {},
            { $addToSet: { cityName: { $each: [formattedSource, formattedDestination] } } },
            { upsert: true }
        );

    } catch (error) {
        console.error("Error adding cities:", error);
    }
}


export async function viewAllCityName(req, res) {
    try {
        const allCity = await cityModel.find({})
        return res.status(200).json({ city: allCity })
    } catch (error) {
        return res.status(400).json({ data: "sorry to forward the city name" })
    }
}