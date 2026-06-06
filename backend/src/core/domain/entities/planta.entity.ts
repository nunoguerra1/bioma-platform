export class Planta {
    id: string;
    titulo: string;
    status: string;
    vitalidade: number;
    imagem: string;
    createdAt: Date;

    constructor(props: Partial<Planta>) {
        Object.assign(this, props);
    }
}