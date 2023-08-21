import Image from "next/image";
import yousicianHeader from "../assets/yousician-hero.png";
import yousicianHeader2x from "../assets/yousician-hero@2x.png";
import yousicianHeader3x from "../assets/yousician-hero@3x.png";

export default function Background() {
  return (
    <Image
      className="absolute top-0 left-0 right-0 bottom-0 z-0"
      aria-hidden="true"
      alt="header background"
      src={yousicianHeader}
      placeholder="blur"
      quality={100}
      fill
      sizes={`(min-resolution: 192dpi) ${yousicianHeader2x}, (min-resolution: 288dpi) ${yousicianHeader3x}, ${yousicianHeader}`}
      style={{
        objectFit: "cover",
      }}
    />
  );
}
