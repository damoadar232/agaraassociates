import home_vd from './assets/videos/home_vd.mp4';
import backGroundVideo from './assets/videos/agarabackground.mp4';
import kadthalVideo from './assets/videos/kadthal.mp4';
import whiteridge from './assets/videos/whiteridge.mp4';

import teamImg from './assets/images/team-img.png';
import img1 from './assets/images/img-1.jpg';
import img2 from './assets/images/img-2.jpg';
import img3 from './assets/images/img-3.png';
import logo from './assets/images/logo.png';
import map from './assets/images/map.png';

import servimg4 from './assets/images/servimg4.jpg';
import servimg2 from './assets/images/servimg2.jpg';
import servimg3 from './assets/images/servimg3.jpg';
import servimg1 from './assets/images/servimg1.jpg';
import agaraAssociatesLogo from './assets/images/Aagara Associates logo.png';
import project1Img from './assets/images/project_images/FLAT_NO_102_NARSINGI_01/hero.jpg';
import project2Img from './assets/images/project_images/PENTHOUSE_HI_TECH_CITY/hero.jpg';
import project3Img from './assets/images/project_images/FARM_HOUSE_MAHESHWARAM/hero.jpg';
import project4Img from './assets/images/project_images/VILLA_BOWENPALLY/hero.png'
import project5Img from './assets/images/project_images/WHITE_RIDGE_HOTEL_HI_TECH_CITY/hero.jpg';
import project6Img from './assets/images/project_images/APARTMENT_MACHILIPATNAM/hero.jpg'
import project7Img from './assets/images/project_images/APARTMENT_KONDAPUR/hero.png';
import project8Img from './assets/images/project_images/VASAVIKA_BRINDAVANAM_LAYOUT_BENGALURU/hero.jpg'
import project9Img from './assets/images/project_images/VILLA_LAYOUT_KADTHAL/hero.jpg';
import project10Img from './assets/images/project_images/CHINTHALA RESIDENCE_BOLLARAM/hero.jpg';
import project11Img from './assets/images/project_images/CLUB_TABERNA_JUBLIEE HILLS/hero.jpg';
import project12Img from './assets/images/project_images/FARMLAND_LAYOUT_KOTRA/floorplan.jpg';
import project13Img from './assets/images/project_images/LANDSCAPE_LAYOUT_NAGARKURNOOL/hero.jpg';
import project14Img from './assets/images/project_images/WHITE_RIDGE_FARM_HOUSE_YADADRI/hero.jpg';




const project1_Images = Object.values(
  import.meta.glob('./assets/images/project_images/FLAT_NO_102_NARSINGI_01/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));
console.log('project1_Images: ,......................,khjgfh', project1_Images);


const project2_Images = Object.values(
  import.meta.glob('./assets/images/project_images/PENTHOUSE_HI_TECH_CITY/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));

const project3_Images = Object.values(
  import.meta.glob('./assets/images/project_images/FARM_HOUSE_MAHESHWARAM/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));

const project4_Images = Object.values(
  import.meta.glob('./assets/images/project_images/VILLA_BOWENPALLY/*.{png,jpg,jpeg,svg}', { eager: true })
).
  map((module) => ({
    type: "image",
    src: module?.default || module
  }));




const project5_Images = Object.values(
  import.meta.glob('./assets/images/project_images/WHITE_RIDGE_HOTEL_HI_TECH_CITY/*.{png,jpg,jpeg,svg}', { eager: true })
).
  map((module) => ({
    type: "image",
    src: module?.default || module
  }));

project5_Images.unshift({
  type: "video",
  src: whiteridge
})



const project6_Images = Object.values(
  import.meta.glob('./assets/images/project_images/APARTMENT_MACHILIPATNAM/*.{png,jpg,jpeg,svg}', { eager: true })
).
  map((module) => ({
    type: "image",
    src: module?.default || module
  }));


const project7_Images = Object.values(
  import.meta.glob('./assets/images/project_images/APARTMENT_KONDAPUR/*.{png,jpg,jpeg,svg}', { eager: true })
).
  map((module) => ({
    type: "image",
    src: module?.default || module
  }));



const project8_Images = Object.values(
  import.meta.glob('./assets/images/project_images/VASAVIKA_BRINDAVANAM_LAYOUT_BENGALURU/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));

const project9_Images = Object.values(
  import.meta.glob('./assets/images/project_images/VILLA_LAYOUT_KADTHAL/*.{png,jpg,jpeg,svg}',
    { eager: true }))
  .map((module) => ({
    type: "image",
    src: module?.default || module
  }));

const project10_Images = Object.values(
  import.meta.glob('./assets/images/project_images/CHINTHALA RESIDENCE_BOLLARAM/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));

const project11_Images = Object.values(
  import.meta.glob('./assets/images/project_images/CLUB_TABERNA_JUBLIEE HILLS/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));


const project13_Images = Object.values(
  import.meta.glob('./assets/images/project_images/LANDSCAPE_LAYOUT_NAGARKURNOOL/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));

const project14_Images = Object.values(
  import.meta.glob('./assets/images/project_images/WHITE_RIDGE_FARM_HOUSE_YADADRI/*.{png,jpg,jpeg,svg}', { eager: true })
).map((module) => ({
  type: "image",
  src: module?.default || module
}));




// import project_icon from './assets/images/Navbar_icons/project_icon.jpg';
// import services_icon from './assets/images/Navbar_icons/services_icon.jpg';
import services_icon from './assets/images/Navbar_icons/services_icon.png';
import projects_icon from './assets/images/Navbar_icons/projects_ico.png';
import aboutus_icon from './assets/images/Navbar_icons/aboutUs_icon.png';
import contact_icon from './assets/images/Navbar_icons/contactus_icon.png';


project9_Images.unshift({
  type: "video",
  src: kadthalVideo
});


export const nav_icons = {
  projects_icon,
  services_icon,
  contact_icon,
  aboutus_icon
}



export const IMAGE_SOURCES = {
  teamImg,
  img1,
  img2,
  img3,
  logo,
  agaraAssociatesLogo,
  map,


};

export const Services_Images = [
  { img: servimg1, tittle: "ARCHITECTURE", desc: "The art and science of designing buildings and spaces, balancing creativity, functionality, and structural integrity to shape the built environment." },
  { img: servimg2, tittle: "INTERIOR DESIGN", desc: "Enhancing indoor spaces through creative layouts, colors, lighting, and materials to make environments both functional and aesthetically pleasing." },
  { img: servimg3, tittle: "LANDSCAPE DESIGN", desc: "Designing outdoor spaces by blending natural elements like plants, water, and terrain with built structures to create harmonious, functional, and beautiful environments." },
  { img: servimg4, tittle: "CONSTRUCTION", desc: "The process of planning, designing, and building structures with durability, safety, and efficiency as the foundation." },

]

export const VIDEO_SOURCES = {
  backGroundVideo,
};


export const project_info = [
  {
    id: 1,
    title: "Flat No 102, Narsingi",
    subTittle: "Residential",
    img: project1Img, images: project1_Images,
    description: `A refined residential interior that blends timeless elegance with modern functionality. 
    Classic detailing and rich materials create a space that is both sophisticated and inviting. Every corner is thoughtfully designed to enhance comfort while maintaining a sense of luxury.
    Warm tones and layered textures bring depth and character to the home. This project is a celebration of enduring style, craftsmanship, and graceful living.`
  },

  {
    id: 2,
    title: "Penthouse, Hi-tech city",
    subTittle: "Mixed Use",
    img: project2Img, images: project2_Images,
    description: `This mixed-use penthouse embraces a rustic design language that blends natural charm with contemporary living.
     Exposed textures, earthy tones, and raw finishes create an atmosphere that feels grounded yet luxurious. The spatial planning seamlessly integrates functionality with aesthetic warmth. 
     Thoughtful material choices and handcrafted details add character and depth to every corner. The result is a timeless retreat that celebrates organic beauty and modern sophistication.`
  },

  {
    id: 3,
    title: "Farm House, Maheswaram",
    subTittle: "Residential",
    img: project3Img, images: project3_Images,
    description: `This modern villa is designed as a serene retreat, seamlessly merging architecture with expansive landscape. 
        Open spaces and large green vistas create a harmonious connection between indoor comfort and outdoor living. The design emphasizes simplicity and elegance, with clean lines and contemporary forms. 
        Natural light and flowing spatial layouts enhance the sense of openness and tranquility. It’s a sophisticated escape that celebrates modern living amidst nature’s vast beauty.`
  },
  {
    id: 13,
    title: "Landscape layout, Nagarkurnool",
    subTittle: "Residential",
    img: project13Img,
    images: project13_Images,
    description: `This modern landscape project transforms public space into a vibrant and welcoming environment. Thoughtfully designed parks, recreational areas, and open spaces encourage community engagement and outdoor activity.
     The layout balances aesthetics with functionality, creating a harmonious blend of greenery and amenities. Pathways, seating areas, and landscaping elements are curated to enhance user experience and visual appeal.
      This Park stands as a testament to contemporary landscape design that promotes both leisure and connectivity.
      `},


  {
    id: 5,
    title: "White Ridge Hotel, Hi-tech City",
    subTittle: "Hospitality",
    img: project5Img, images: project5_Images,
    description: `A landmark in luxury hospitality, this project embodies refined design and impeccable construction.
         Every space is crafted to deliver an elevated guest experience, combining sophistication with comfort. Premium materials, elegant detailing, and thoughtful spatial planning define the hotel’s timeless character.
        The architecture seamlessly integrates functionality with grandeur, creating an inviting yet distinguished ambiance. White Ridge stands as a testament to premium design excellence and world-class craftsmanship.`
  },

  {
    id: 14,
    title: "White ridge farmhouse, Yadagiri",
    subTittle: "Residential",
    img: project14Img,
    images: project14_Images,
    description: `This elegant residential project offers a serene countryside retreat that blends rustic charm with modern comforts. Thoughtfully designed living spaces, open landscapes, and natural surroundings create an atmosphere of tranquility and privacy.
     The layout balances aesthetics with functionality, providing a seamless connection between indoor and outdoor areas. Architecture, materials, and sustainable elements are curated to enhance comfort, beauty, and long-term value.
      This farmhouse stands as a testament to timeless design that promotes relaxation, luxury, and a closer connection to nature.`},




  {
    id: 4,
    title: "Villa–Bowenpally, Hyderabad",
    subTittle: "Residential",
    img: project4Img,
    images: project4_Images,
    description: `This residence showcases a refined transformation through thoughtfully renovated interiors with a modern touch.
     Sleek finishes and contemporary design elements breathe new life into the villa while preserving its original charm. Open layouts and curated material palettes create a seamless flow between spaces.
      Every detail is crafted to enhance comfort, functionality, and aesthetic appeal. The result is a timeless home that blends classic character with modern sophistication.`
  },





  {
    id: 6,
    title: "Aparatment, Machilipatnam",
    subTittle: "Residential",
    img: project6Img, images: project6_Images,
    description: `This residential project stands out with a striking modern elevation that blends innovation with visual appeal.
        The use of MS box sections, jaali brickwork, and textured finishes creates a dynamic architectural language. Each façade is thoughtfully detailed, offering depth, rhythm, and character from every angle.
         The design balances contemporary aesthetics with structural integrity and durability. It’s a bold statement in modern residential architecture, combining creativity with lasting functionality.`
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
    img: project8Img,
    images: project8_Images,
    description: `This hospitality project embodies modern design principles that blend elegance with functionality. 
         Clean lines, contemporary finishes, and thoughtfully planned spaces create an inviting and sophisticated environment. Every detail, from interiors to exteriors, is curated to enhance guest comfort and experience. 
         The architecture balances style with practicality, resulting in a visually striking yet welcoming atmosphere. Vasavika Brindavanam stands as a testament to modern hospitality excellence.`
  },
  {
    id: 9,

    title: "Villa Layout, Kadthal",
    subTittle: "Residential",
    img: project9Img,
    images: project9_Images,
    description: `This residential plotted layout is thoughtfully designed to offer a harmonious living environment with all modern amenities.
          Each plot is strategically positioned to optimize space, light, and connectivity within the community. The design emphasizes seamless integration of landscapes, roads, and utility infrastructure for a comfortable lifestyle.
           Attention to detail ensures both functionality and aesthetic appeal throughout the layout. It’s a comprehensive residential plan that combines convenience, elegance, and modern living standards.`
  },
  {
    id: 10,
    title: "Chinthala Residence, Bollaram",
    subTittle: "Residential",
    img: project10Img,
    images: project10_Images,
    description: `This modern residential project combines striking elevation with luxurious, spacious interiors. Thoughtful layouts and contemporary design elements create a sense of openness and sophistication.
        Every space is meticulously planned to balance comfort, functionality, and elegance. 
        Premium finishes and attention to detail enhance the overall aesthetic appeal. Chinthala Residence exemplifies refined living through modern architecture and timeless design`
  },



  {
    id: 11,
    title: "Club Taberna, Jublee Hills",
    subTittle: "F&B Interior",
    img: project11Img,
    images: project11_Images,
    description: `This F&B interior project revitalizes the space with a striking elevation design complemented by carefully executed interior renovations.
         Subtle updates and refined detailing enhance the overall ambiance while maintaining the venue’s character. The design balances aesthetic appeal with functionality, creating an inviting atmosphere for patrons.
          Thoughtful material choices and finishes elevate the experience without overwhelming the existing charm. Club Taberna stands as a blend of contemporary style and refined hospitality design.`},

  {
    id: 12,
    title: "Farmland Layout, Kotra",
    subTittle: "Residential",
    img: project12Img,
    images: project2_Images,
    description: `This residential farmland layout is thoughtfully designed to optimize land use while maintaining a natural, open environment.
     Each plot is strategically positioned to ensure accessibility, light, and connectivity across the site. The design integrates practical infrastructure with the serene beauty of the landscape.
      Careful planning enhances both functionality and aesthetic appeal for future owners. It’s a well-conceived layout that balances modern living requirements with the tranquility of rural surroundings.
  `},





]


export const teamData = {
  description: {
    title: "About us",
    text: `
    In Sanskrit, ‘Agara’ means home or dwelling - a symbol of origin and shelter. At Agara Associates, it reflects our focus on designing 
    functional, enduring, and meaningful spaces.
    we believe great architecture goes beyond buildings - it creates experiences that inspire, connect and last.
`,
  },
  teamImage: teamImg, // ✅ big group photo
  members: [

  ],
};
