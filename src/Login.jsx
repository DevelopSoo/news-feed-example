import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import styled from "styled-components";
import supabase from "./lib/supabaseClient";
import Form from "./components/Form";
import Input from "./components/Input";

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message === "Invalid login credentials") {
      return alert("이메일 또는 비밀번호를 확인해주세요.");
    }

    // 로그인 성공 시 UserProvider의 setUser에 자동으로 저장됩니다.
    navigate("/");
  };

  return (
    <StyledLoginContainer>
      <h1>로그인</h1>
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
        <Button type="submit">로그인</Button>
        <Button as={Link} to="/signup">
          회원가입하러 가기
        </Button>
      </Form>
    </StyledLoginContainer>
  );
};

export default Login;
