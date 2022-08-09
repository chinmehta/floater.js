export default interface FloaterConfig {
    data: string[],
    startTransitionTime: number,
    stopTransitionTime: number,
    transitionName: string,
    containerSelector: string,
    classes: string[],
    colors: string[],
    minSize: number,
    maxSize: number,
    rotation: boolean
}