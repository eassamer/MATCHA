import axios from "axios";

export async function getLikes() {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/relations/likes`, {
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

export async function addLike(receiverId: number) {
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/relations/likes`,
        { receiverId },
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

export async function dislike(receiverId: number) {
  try {
    const response = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/relations/likes/${receiverId}`,
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
