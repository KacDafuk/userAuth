import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useLogin from "./useLogin";

const Login = () => {
  const { register, handleSubmit, errors, submitLogin, loginError } =
    useLogin();
  return (
    <Form onSubmit={handleSubmit(submitLogin)}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          {...register("email")}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passowrd">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {Object.values(errors).map((data) => (
        <Alert variant="danger">{(data as any)?.message} </Alert>
      ))}
      {loginError && <Alert variant={"danger"}>{loginError}</Alert>}
    </Form>
  );
};

export default Login;
