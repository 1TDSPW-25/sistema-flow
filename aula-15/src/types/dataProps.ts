

export type DataProps1 = {
    tituloProps:string;
    avisoProps:()=> void;
}

export type DataProps2 = {
    children:React.ReactNode;
    statusProps: "deployed" | "loading";
    valorProps: string | number;
}

export type DataProps3 = {
    tituloProps:string;
}

export type DataProps4 = {
    children:React.ReactNode;
    statusProps: "deployed" | "loading";
    valorProps: string | number;
}

export type DataProps5 = DataProps3 & DataProps4;
 

