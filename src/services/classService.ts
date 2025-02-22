import api from "../utils/api";

// Fetch class list
export const getClassList = async () => {
  try {
    const response:any = await api.get("/class");
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Fetch class list error:", error);
    const errorMessage = error?.response?.data?.message || "Failed to fetch class list";
    return { success: false, message: errorMessage };
  }
};
