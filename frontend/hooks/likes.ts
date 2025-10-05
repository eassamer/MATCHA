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

export async function addLike(receiverId: string) {
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/relations/like`,
        { id: receiverId },
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

export async function addDislike(receiverId: string) {
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/relations/dislike`,
        { id: receiverId },
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

export async function addSuperLike(receiverId: string) {
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/relations/superlike`,
        { id: receiverId },
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
