import { Button as CButton } from "@chakra-ui/react";

export const Button = ({ clickFn, ...props }) => (
  <CButton
    colorScheme="teal"
    onClick={clickFn}
    {...props}
    margin={5}
    shadow="lg"
  >
    {props.children}
  </CButton>
);
