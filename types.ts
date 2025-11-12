
export interface Color {
  hex: string;
  name: string;
  usage: string;
}

export interface FontPairing {
  headerFont: string;
  bodyFont: string;
}

export interface BrandBible {
  primaryLogo: string; // base64 string
  secondaryMarks: string[]; // array of base64 strings
  colorPalette: Color[];
  fontPairing: FontPairing;
  companyName: string;
}
