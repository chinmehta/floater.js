export default interface FloaterConfig {
    data: string[],
    startTransitionTimeInMs: number,
    stopTransitionTimeInMs: number,
    transitionName: string,
    containerSelector: string,
    classes: string[],
    colors: string[],
    minTextSizeInPx: number,
    maxTextSizeInPx: number,
    rotation: boolean
}