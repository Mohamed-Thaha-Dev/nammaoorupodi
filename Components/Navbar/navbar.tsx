import NavLogo from "./logo";
import MenuBar from "./Nav";

export default function Navbar() {
  return (
    <>
      {/* <NavLogo /> */}
      <div className="sticky top-0 z-50">
        <MenuBar />
      </div>
    </>
  );
}
