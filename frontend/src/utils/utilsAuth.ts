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
export function handleRespData(data: any) {
  const { status, message } = data;
  if (status != 200) {
    if (message) throw new Error(message);
    throw new Error("something went wrong, try again ");
  }
  return data;
}
export function handleError(
  e: unknown,
  setError: (value: React.SetStateAction<string>) => void
) {
  console.log(e, "HANDLE");
  if (e instanceof Error) {
    setError(e.message);
    return;
  }
  setError("something went wrong, try again");
}
