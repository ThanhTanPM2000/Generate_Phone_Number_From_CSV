import {
  Image
} from "@chakra-ui/react";

type propTypes = {
  isHomeLayout?: boolean;
  navSize?: string;
  onChangeNavSize?: () => void;
};

const NavBar = ({
}: propTypes) => {
  return (
    <>
      <Image src="/logo.webp" height="50px" />
    </>
  );
};

export default NavBar;
