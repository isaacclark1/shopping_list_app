import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className="flex flex-col items-center mt-20 w-full gap-5">
      <LoaderCircle className="animate-spin size-10" />
      <p className="animate-pulse">Loading...</p>
    </div>
  );
}

export default Loading;
