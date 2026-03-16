import { Show, SignInButton, SignUpButton, UserButton} from '@clerk/react'

const HomePage = () => {
  return (
    <>
      <header>
        <Show when="signed-in">
          <UserButton/>HomePage
        </Show>
      </header>
    </>
  );
};

export default HomePage;
