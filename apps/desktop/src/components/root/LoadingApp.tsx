import { CircularProgress } from "../ui/progress";

export const LoadingApp = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};
