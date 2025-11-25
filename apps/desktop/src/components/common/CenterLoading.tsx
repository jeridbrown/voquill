import { CircularProgress } from "../ui/progress";

export const CenterLoading = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center pb-16 gap-4">
      <CircularProgress />
    </div>
  );
};
