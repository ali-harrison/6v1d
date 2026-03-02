export interface Inspiration {
  name: string;
  discipline: string;
  quote: string;
  image: string;
  audio: string;
}

export const inspirations: Inspiration[] = [
  {
    name: "J Cole",
    discipline: "Music",
    quote: "The only dream worth having is to dream that you will live while you're alive.",
    image: "https://i.pinimg.com/1200x/43/3a/1d/433a1dd1bd8b89101c54e96333988df9.jpg",
    audio: "/audio/jcole.mp3",
  },
  {
    name: "Virgil Abloh",
    discipline: "Design & Fashion",
    quote: "Find your voice, and use it. Don't imitate.",
    image: "https://i.pinimg.com/1200x/13/42/65/134265aa5e315602b15c02006bb79ed8.jpg",
    audio: "/audio/virgil.mp3",
  },
  {
    name: "Michael Jackson",
    discipline: "Performance",
    quote: "In a world filled with hate, we must still dare to hope.",
    image: "https://i.pinimg.com/736x/d0/4f/ac/d04facd26dd361cfba49848900c36267.jpg",
    audio: "/audio/michaeljackson.mp3",
  },
  {
    name: "Pharrell Williams",
    discipline: "Music & Creative Direction",
    quote: "I've always believed that if you don't stay moving, they will throw dirt on you.",
    image: "https://i.pinimg.com/1200x/6a/dd/f5/6addf59e020b7c85f68588f177025b63.jpg",
    audio: "/audio/pharrell.mp3",
  },
  {
    name: "Tame Iti",
    discipline: "Activism & Art",
    quote: "We are not protesters. We are protectors.",
    image: "https://i.pinimg.com/1200x/db/15/a7/db15a74faaf5f76211ee175b8b04f04f.jpg",
    audio: "/audio/tameiti.mp3",
  },
  {
    name: "Stan Lee",
    discipline: "Storytelling",
    quote: "With great power there must also come great responsibility.",
    image: "https://i.pinimg.com/736x/be/80/61/be80615074da4a95c36f7d4caf82271d.jpg",
    audio: "/audio/stanlee.mp3",
  },
];
