import Image from "next/image";
import { BREAKPOINTS } from "@/application/constants/constants";
import yousicianHeader from "../assets/yousician-hero.png";
import yousicianHeader2x from "../assets/yousician-hero@2x.png";
import yousicianHeader3x from "../assets/yousician-hero@3x.png";
import yousicianHeaderMobile from "../assets/yousician-hero-mobile.png";
import yousicianHeaderMobile2x from "../assets/yousician-hero-mobile@2x.png";
import yousicianHeaderMobile3x from "../assets/yousician-hero-mobile@3x.png";

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
      sizes={`
        (min-resolution: 192dpi) and (max-width: ${
          BREAKPOINTS.tablet - 1
        }px) ${yousicianHeaderMobile3x},
        (min-resolution: 144dpi) and (max-width: ${
          BREAKPOINTS.tablet - 1
        }px) ${yousicianHeaderMobile2x},
        (max-width: ${BREAKPOINTS.tablet - 1}px) ${yousicianHeaderMobile},
        (min-resolution: 192dpi) ${yousicianHeader3x},
        (min-resolution: 144dpi) ${yousicianHeader2x},
        ${yousicianHeader}
      `}
      style={{
        objectFit: "cover",
      }}
    />
  );
}
