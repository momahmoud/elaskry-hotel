import styled from "styled-components";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const AccountStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 4.2rem;
  width: 120rem;
`;

function Account() {
  return (
    <AccountStyled>
      <Heading as="h1">Update your account</Heading>

      <Row style={{ alignItems: "start", width: "100%" }}>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row style={{ alignItems: "start", width: "100%" }}>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </AccountStyled>
  );
}

export default Account;
