export interface CountrySmall {
  name:         Name;
  cca3:         string;
  altSpellings: string[];
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  grn: Grn;
  spa: Grn;
}

export interface Grn {
  official: string;
  common:   string;
}
