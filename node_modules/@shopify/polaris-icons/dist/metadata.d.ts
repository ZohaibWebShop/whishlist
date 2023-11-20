export interface Icon {
  id: string;
  name: string;
  set: 'major' | 'minor';
  description: string;
  keywords: string[];
}

declare const metadata: {
  [iconId: string]: Icon;
};

export default metadata;