const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

/**
 * This function returns the list of saved cities.
 *
 * @returns {array} The list of saved cities.
 */
async function fetchAllSavedCities() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/saved-cities`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch saved cities");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * This function returns the default city.
 *
 * @returns {array} The default city.
 */
async function fetchSavedDefaultCity() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/default-city`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch saved cities");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { fetchAllSavedCities, fetchSavedDefaultCity };
