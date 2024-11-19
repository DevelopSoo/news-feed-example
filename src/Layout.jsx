import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserProvider";
import { useContext } from "react";
import supabase from "./lib/supabaseClient";

// TODO: 레이아웃으로 변경 필요
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--outline-color);
  background-color: white;
`;

const StyledAuthButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Layout = () => {
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <StyledNav>
        <div>
          <img src={"/logo.svg"} alt="logo" />
        </div>
        <StyledAuthButtons>
          {user ? (
            <>
              <div>{user.email}</div>
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login">
                로그인
              </Button>
              <Button as={Link} to="/signup">
                회원가입
              </Button>
            </>
          )}
        </StyledAuthButtons>
      </StyledNav>
      <Outlet />
    </>
  );
};

export default Layout;
