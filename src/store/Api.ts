import axios from "axios";
import { State } from "./store";

axios.defaults.baseURL = "http://recruitment01.vercel.app/api";

export interface FetchIdResponse {
  id: string;
  name: string;
  modified: number;
}

const Api = {
  fetchId: async () => {
    try {
      const response = await axios.get(`/init`);
      return response.data as FetchIdResponse;
    } catch (error) {
      throw error;
    }
  },
  fetchData: async (id: string) => {
    try {
      const response = await axios.get(`/project/${id}`);
      return response.data as State;
    } catch (error) {
      throw error;
    }
  },
};

export default Api;
