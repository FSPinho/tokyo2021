export interface HTMLProps {
    children: string;
}

export interface Element {
    tag: string;
    content: Array<string | Element>;
}
