declare module "*.json" {
  const value: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    types: string[];
    height: number;
    weight: number;
  }[];
  export default value;
}
