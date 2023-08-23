import { instance } from "@/entities/song/api/base-axios";

const getSongs = async (url: string, parameters?: object) => {
  const response = await instance.get(url, {
    params: parameters,
  });

  return response.data;
};

export default getSongs;
