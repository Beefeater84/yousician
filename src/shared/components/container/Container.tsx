type ContainerProps = {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  classes?: string;
};

function Container({ children, classes = "" }: ContainerProps) {
  const containerClasses = `mx-auto max-w-[100%] w-[var(--desktop)] h-[100%] px-4 ${classes}`;

  return <div className={containerClasses}>{children}</div>;
}

export default Container;
