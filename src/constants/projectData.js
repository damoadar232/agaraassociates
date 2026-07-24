import backGroundVideo from "@/assets/videos/background/agarabackground.mp4";
import kadthalVideo from "@/assets/videos/projects/kadthal.mp4";
import whiteridge from "@/assets/videos/projects/whiteridge.mp4";

import teamImg from "@/assets/images/team/team-img.png";
import img1 from "@/assets/images/journal/img-1.jpg";
import img2 from "@/assets/images/journal/img-2.jpg";
import img3 from "@/assets/images/journal/img-3.png";
import logo from "@/assets/images/logos/logo.png";
import map from "@/assets/images/maps/map.png";
import agaraAssociatesLogo from "@/assets/images/logos/Aagara Associates logo.png";

import project1Img from "../assets/images/projects/flat-no-102-narsingi-01/hero.jpg";
import project2Img from "../assets/images/projects/penthouse-hi-tech-city/hero.jpg";
import project3Img from "../assets/images/projects/farm-house-maheshwaram/hero.jpg";
import project4Img from "../assets/images/projects/villa-bowenpally/hero.png";
import project5Img from "../assets/images/projects/white-ridge-hotel-hi-tech-city/hero.jpg";
import project6Img from "../assets/images/projects/apartment-machilipatnam/hero.jpg";
import project7Img from "../assets/images/projects/apartment-kondapur/hero.png";
import project8Img from "../assets/images/projects/vasavika-brindavanam-layout-bengaluru/hero.jpg";
import project9Img from "../assets/images/projects/villa-layout-kadthal/hero.jpg";
import project10Img from "../assets/images/projects/chinthala-residence-bollaram/hero.jpg";
import project11Img from "../assets/images/projects/club-taberna-jubilee-hills/hero.jpg";
import project12Img from "../assets/images/projects/farmland-layout-kotra/floorplan.jpg";
import project13Img from "../assets/images/projects/landscape-layout-nagarkurnool/hero.jpg";
import project14Img from "../assets/images/projects/white-ridge-farm-house-yadadri/hero.jpg";

const project1_Images = Object.values(
  import.meta.glob("../assets/images/projects/flat-no-102-narsingi-01/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project2_Images = Object.values(
  import.meta.glob("../assets/images/projects/penthouse-hi-tech-city/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project3_Images = Object.values(
  import.meta.glob("../assets/images/projects/farm-house-maheshwaram/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project4_Images = Object.values(
  import.meta.glob("../assets/images/projects/villa-bowenpally/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project5_Images = Object.values(
  import.meta.glob(
    "../assets/images/projects/white-ridge-hotel-hi-tech-city/*.{png,jpg,jpeg,svg}",
    { eager: true }
  )
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

project5_Images.unshift({
  type: "video",
  src: whiteridge,
});

const project6_Images = Object.values(
  import.meta.glob("../assets/images/projects/apartment-machilipatnam/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project7_Images = Object.values(
  import.meta.glob("../assets/images/projects/apartment-kondapur/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project8_Images = Object.values(
  import.meta.glob(
    "../assets/images/projects/vasavika-brindavanam-layout-bengaluru/*.{png,jpg,jpeg,svg}",
    { eager: true }
  )
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project9_Images = Object.values(
  import.meta.glob("../assets/images/projects/villa-layout-kadthal/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project10_Images = Object.values(
  import.meta.glob(
    "../assets/images/projects/chinthala-residence-bollaram/*.{png,jpg,jpeg,svg}",
    { eager: true }
  )
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project11_Images = Object.values(
  import.meta.glob(
    "../assets/images/projects/club-taberna-jubilee-hills/*.{png,jpg,jpeg,svg}",
    { eager: true }
  )
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project13_Images = Object.values(
  import.meta.glob(
    "../assets/images/projects/landscape-layout-nagarkurnool/*.{png,jpg,jpeg,svg}",
    { eager: true }
  )
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

const project14_Images = Object.values(
  import.meta.glob(
    "../assets/images/projects/white-ridge-farm-house-yadadri/*.{png,jpg,jpeg,svg}",
    { eager: true }
  )
).map((module) => ({
  type: "image",
  src: module?.default || module,
}));

project9_Images.unshift({
  type: "video",
  src: kadthalVideo,
});

export const IMAGE_SOURCES = {
  teamImg,
  img1,
  img2,
  img3,
  logo,
  agaraAssociatesLogo,
  map,
};

export const VIDEO_SOURCES = {
  backGroundVideo,
};

export const project_info = [
  {
    id: 1,
    title: "Flat No 102, Narsingi",
    subTittle: "Residential",
    plotArea: "420 SQ.YD",
    location: "Narsingi, Hyderabad",
    img: project1Img,
    images: project1_Images,
    description: `A refined residential interior that blends timeless elegance with modern functionality. 
    Classic detailing and rich materials create a space that is both sophisticated and inviting. Every corner is thoughtfully designed to enhance comfort while maintaining a sense of luxury.
    Warm tones and layered textures bring depth and character to the home. This project is a celebration of enduring style, craftsmanship, and graceful living.`,
  },

  {
    id: 2,
    title: "Penthouse, Hi-tech city",
    subTittle: "Mixed Use",
    plotArea: "1800 SQ.FT",
    location: "Hi-Tech City, Hyderabad",
    img: project2Img,
    images: project2_Images,
    description: `This mixed-use penthouse embraces a rustic design language that blends natural charm with contemporary living.
     Exposed textures, earthy tones, and raw finishes create an atmosphere that feels grounded yet luxurious. The spatial planning seamlessly integrates functionality with aesthetic warmth. 
     Thoughtful material choices and handcrafted details add character and depth to every corner. The result is a timeless retreat that celebrates organic beauty and modern sophistication.`,
  },

  {
    id: 3,
    title: "Farm House, Maheswaram",
    subTittle: "Residential",
    plotArea: "6500 SQ.YD",
    location: "Maheshwaram, Hyderabad",
    img: project3Img,
    images: project3_Images,
    description: `This modern villa is designed as a serene retreat, seamlessly merging architecture with expansive landscape. 
        Open spaces and large green vistas create a harmonious connection between indoor comfort and outdoor living. The design emphasizes simplicity and elegance, with clean lines and contemporary forms. 
        Natural light and flowing spatial layouts enhance the sense of openness and tranquility. It’s a sophisticated escape that celebrates modern living amidst nature’s vast beauty.`,
  },
  {
    id: 13,
    title: "Landscape layout, Nagarkurnool",
    subTittle: "Residential",
    plotArea: "3200 SQ.YD",
    location: "Nagarkurnool",
    img: project13Img,
    images: project13_Images,
    description: `This modern landscape project transforms public space into a vibrant and welcoming environment. Thoughtfully designed parks, recreational areas, and open spaces encourage community engagement and outdoor activity.
     The layout balances aesthetics with functionality, creating a harmonious blend of greenery and amenities. Pathways, seating areas, and landscaping elements are curated to enhance user experience and visual appeal.
      This Park stands as a testament to contemporary landscape design that promotes both leisure and connectivity.
      `,
  },

  {
    id: 5,
    title: "White Ridge Hotel, Hi-tech City",
    subTittle: "Hospitality",
    plotArea: "5400 SQ.FT",
    location: "Hi-Tech City, Hyderabad",
    img: project5Img,
    images: project5_Images,
    description: `A landmark in luxury hospitality, this project embodies refined design and impeccable construction.
         Every space is crafted to deliver an elevated guest experience, combining sophistication with comfort. Premium materials, elegant detailing, and thoughtful spatial planning define the hotel’s timeless character.
        The architecture seamlessly integrates functionality with grandeur, creating an inviting yet distinguished ambiance. White Ridge stands as a testament to premium design excellence and world-class craftsmanship.`,
  },

  {
    id: 14,
    title: "White ridge farmhouse, Yadagiri",
    subTittle: "Residential",
    plotArea: "7200 SQ.YD",
    location: "Yadadri",
    img: project14Img,
    images: project14_Images,
    description: `This elegant residential project offers a serene countryside retreat that blends rustic charm with modern comforts. Thoughtfully designed living spaces, open landscapes, and natural surroundings create an atmosphere of tranquility and privacy.
     The layout balances aesthetics with functionality, providing a seamless connection between indoor and outdoor areas. Architecture, materials, and sustainable elements are curated to enhance comfort, beauty, and long-term value.
      This farmhouse stands as a testament to timeless design that promotes relaxation, luxury, and a closer connection to nature.`,
  },

  {
    id: 4,
    title: "Villa–Bowenpally, Hyderabad",
    subTittle: "Residential",
    plotArea: "380 SQ.YD",
    location: "Bowenpally, Hyderabad",
    img: project4Img,
    images: project4_Images,
    description: `This residence showcases a refined transformation through thoughtfully renovated interiors with a modern touch.
     Sleek finishes and contemporary design elements breathe new life into the villa while preserving its original charm. Open layouts and curated material palettes create a seamless flow between spaces.
      Every detail is crafted to enhance comfort, functionality, and aesthetic appeal. The result is a timeless home that blends classic character with modern sophistication.`,
  },

  {
    id: 6,
    title: "Aparatment, Machilipatnam",
    subTittle: "Residential",
    plotArea: "2600 SQ.YD",
    location: "Machilipatnam",
    img: project6Img,
    images: project6_Images,
    description: `This residential project stands out with a striking modern elevation that blends innovation with visual appeal.
        The use of MS box sections, jaali brickwork, and textured finishes creates a dynamic architectural language. Each façade is thoughtfully detailed, offering depth, rhythm, and character from every angle.
         The design balances contemporary aesthetics with structural integrity and durability. It’s a bold statement in modern residential architecture, combining creativity with lasting functionality.`,
  },

  // {
  //   id: 7,
  //   title: "Apartment, Kondapur",
  //   subTittle: "Residential",
  //   img: project7Img,
  //   images: project7_Images,
  //   description: `This modern residential project showcases innovative space planning within a compact urban footprint. Designed with G+4 floors, it features efficiently planned 1BHK units on the lower levels and an exclusive private duplex on the top floor.
  //    The architecture optimizes vertical space while maintaining comfort, functionality, and aesthetic balance. Clean lines, modern finishes, and smart layouts enhance both usability and visual appeal.
  //    It’s a testament to thoughtful design that transforms a narrow site into a sophisticated urban living experience.`
  // },

  {
    id: 8,
    title: "Vasavika Brindavanam Layout, Bengaluru",
    subTittle: "Hospitality",
    plotArea: "1800 SQ.FT",
    location: "Bengaluru",
    img: project8Img,
    images: project8_Images,
    description: `This hospitality project embodies modern design principles that blend elegance with functionality. 
         Clean lines, contemporary finishes, and thoughtfully planned spaces create an inviting and sophisticated environment. Every detail, from interiors to exteriors, is curated to enhance guest comfort and experience. 
         The architecture balances style with practicality, resulting in a visually striking yet welcoming atmosphere. Vasavika Brindavanam stands as a testament to modern hospitality excellence.`,
  },
  {
    id: 9,

    title: "Villa Layout, Kadthal",
    subTittle: "Residential",
    plotArea: "4500 SQ.YD",
    location: "Kadthal",
    img: project9Img,
    images: project9_Images,
    description: `This residential plotted layout is thoughtfully designed to offer a harmonious living environment with all modern amenities.
          Each plot is strategically positioned to optimize space, light, and connectivity within the community. The design emphasizes seamless integration of landscapes, roads, and utility infrastructure for a comfortable lifestyle.
           Attention to detail ensures both functionality and aesthetic appeal throughout the layout. It’s a comprehensive residential plan that combines convenience, elegance, and modern living standards.`,
  },
  {
    id: 10,
    title: "Chinthala Residence, Bollaram",
    subTittle: "Residential",
    plotArea: "500 SQ.YD",
    location: "Bollaram",
    img: project10Img,
    images: project10_Images,
    description: `This modern residential project combines striking elevation with luxurious, spacious interiors. Thoughtful layouts and contemporary design elements create a sense of openness and sophistication.
        Every space is meticulously planned to balance comfort, functionality, and elegance. 
        Premium finishes and attention to detail enhance the overall aesthetic appeal. Chinthala Residence exemplifies refined living through modern architecture and timeless design`,
  },

  {
    id: 11,
    title: "Club Taberna, Jublee Hills",
    subTittle: "F&B Interior",
    plotArea: "1200 SQ.FT",
    location: "Jubilee Hills, Hyderabad",
    img: project11Img,
    images: project11_Images,
    description: `This F&B interior project revitalizes the space with a striking elevation design complemented by carefully executed interior renovations.
         Subtle updates and refined detailing enhance the overall ambiance while maintaining the venue’s character. The design balances aesthetic appeal with functionality, creating an inviting atmosphere for patrons.
          Thoughtful material choices and finishes elevate the experience without overwhelming the existing charm. Club Taberna stands as a blend of contemporary style and refined hospitality design.`,
  },

  {
    id: 12,
    title: "Farmland Layout, Kotra",
    subTittle: "Residential",
    plotArea: "2800 SQ.YD",
    location: "Kotra",
    img: project12Img,
    images: project2_Images,
    description: `This residential farmland layout is thoughtfully designed to optimize land use while maintaining a natural, open environment.
     Each plot is strategically positioned to ensure accessibility, light, and connectivity across the site. The design integrates practical infrastructure with the serene beauty of the landscape.
      Careful planning enhances both functionality and aesthetic appeal for future owners. It’s a well-conceived layout that balances modern living requirements with the tranquility of rural surroundings.
  `,
  },
];
