import { UserState } from "@/lib/features/user/userSlice";
import axios from "axios";

export async function updateUser(user: UserState) {
  try {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, user, {
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

export async function updateLocation(coords: {
  latitude: number;
  longitude: number;
}) {
  const { latitude, longitude } = coords;
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update/location`,
        { longitude, latitude },
        {
          withCredentials: true,
        }
      )
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
