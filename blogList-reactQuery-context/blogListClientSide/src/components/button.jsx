import { Button } from "react-bootstrap";

const CustomButton = () => {
  return (
    <>
      <style type="text/css">
        {`
    .btn-var {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>

      <Button variant="var" size="xxl"></Button>
    </>
  );
};

export default CustomButton;
