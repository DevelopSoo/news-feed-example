import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import styled from "styled-components";
import supabase from "./lib/supabaseClient";
import Form from "./components/Form";
import Input from "./components/Input";

export const StyledSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error?.message === "Password should be at least 6 characters") {
      return alert("비밀번호는 최소 6자 이상이어야 합니다.");
    }
    if (error?.message === "User already registered") {
      return alert("이미 가입된 이메일입니다.");
    }

    // 회원가입 성공 시 UserProvider의 setUser에 자동으로 저장됩니다.
    navigate("/");
  };

  return (
    <StyledSignupContainer>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmit}>
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Input
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요."
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          required
        />
        <Button type="submit">회원가입</Button>
        <Button as={Link} to="/login">
          로그인하러 가기
        </Button>
      </Form>
    </StyledSignupContainer>
  );
};

export default Signup;
