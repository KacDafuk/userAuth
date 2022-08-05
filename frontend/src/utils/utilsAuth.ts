import { DateTime } from "luxon";

export function getAuthFetchOptions(data: any) {
  const curTime = DateTime.now().toFormat("MM-dd-yyyy hh:mm:ss");
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, curTime }),
  };
}
export async function handleRespData(response: any) {
  const data = await response.json();
  const { status, message } = data;
  console.log(data, "STATUS");
  if (status !== 200) {
    if (message) throw new Error(message);
    throw new Error("something went wrong, try again ");
  }
  return data;
}
export function handleError(
  e: unknown,
  setError: (value: React.SetStateAction<string>) => void
) {
  if (e instanceof Error) {
    setError(e.message);
    return;
  }
  setError("something went wrong, try again");
}
