import Container from "@mui/material/Container";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
