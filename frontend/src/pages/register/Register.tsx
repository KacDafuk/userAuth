import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useRegister from "./useRegister";
import { Alert } from "react-bootstrap";
const Register = () => {
  const { register, handleSubmit, errors, submitRegister, registerError } =
    useRegister();
  return (
    <>
      <Form onSubmit={handleSubmit(submitRegister)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name ..."
            {...register("name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email ..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password ..."
            {...register("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {Object.values(errors).map((data) => (
          <Alert variant="danger">{(data as any)?.message} </Alert>
        ))}
        {registerError && <Alert variant={"danger"}>{registerError}</Alert>}
      </Form>
    </>
  );
};

export default Register;
