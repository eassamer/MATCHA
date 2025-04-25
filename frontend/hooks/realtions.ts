import axios from "axios";

export async function getRelations() {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/relations/`, {
        withCredentials: true,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch (error) {
    return error;
  }
}
