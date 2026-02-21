import Image from "next/image";

export default function NavLogo() {
  return (
    <div className="w-full flex justify-center py-4">
      <Image
        src="/logo.png"
        alt="Namma Ooru Podi Logo"
        width={120}
        height={120}
        priority
        className="object-contain"
      />
    </div>
  );
}
