export type StatProps = {
  label: string;
  value: number;
};

export const Stat = ({ label, value }: StatProps) => {
  return (
    <div className="flex flex-col gap-1 items-center text-center">
      <h3 className="text-4xl font-bold">
        {value.toLocaleString()}
      </h3>
      <p className="text-xl text-muted-foreground">
        {label}
      </p>
    </div>
  );
};
