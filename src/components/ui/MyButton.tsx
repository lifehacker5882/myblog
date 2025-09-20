import { Button } from "@mattilsynet/design/react";

type MyButtonProps = React.ComponentProps<typeof Button> & {
  onClick: () => void;
  children: React.ReactNode;
};

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  children,
  disabled,
  ...props
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
