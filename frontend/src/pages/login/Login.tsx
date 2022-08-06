import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useLogin from "./useLogin";
import { Container } from "react-bootstrap";
const Login = () => {
  const { register, handleSubmit, errors, submitLogin, loginError } =
    useLogin();
  return (
    <Container className="mx-auto mt-5 " fluid="sm">
      <Form onSubmit={handleSubmit(submitLogin)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="passowrd">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
        {Object.values(errors).map((data) => (
          <Alert variant="danger">{(data as any)?.message} </Alert>
        ))}
        {loginError && <Alert variant={"danger"}>{loginError}</Alert>}
      </Form>
    </Container>
  );
};

export default Login;
