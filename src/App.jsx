import { AppShell } from "@mantine/core";
import Router from "./Router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar
        p="md"
        withBorder={false}
        style={{ backgroundColor: "#292931" }}
      >
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
