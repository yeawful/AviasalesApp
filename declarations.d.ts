declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.ttf' {
    const content: string;
    export default content;
}
