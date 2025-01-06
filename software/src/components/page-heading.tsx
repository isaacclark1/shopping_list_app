import clsx from "clsx";
import { ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
  className?: string;
};

const PageHeading: React.FC<PageHeadingProps> = ({
  children,
  className = "",
}) => {
  const baseClasses = "text-3xl font-semibold";
  return <h1 className={clsx(baseClasses, className)}>{children}</h1>;
};

export default PageHeading;
