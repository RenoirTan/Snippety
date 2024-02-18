import { fetchProtectedJson } from "./fetching";
import { apiUsersListUrl } from "./urls";

export async function getUsersList() {
  const url = await apiUsersListUrl();
  const response = await fetchProtectedJson(url, "GET", {});
  return response;
}