export class Product implements IProduct {
    name: string;
    uuid: string;
    isActive: boolean;
    images: Array<string>;
    timestampAdded: Date;

    constructor(x: IProduct) {
        this.name = x.name;
        this.uuid = x.uuid;
        this.isActive = x.isActive;
        this.images = x.images;
        this.timestampAdded = x.timestampAdded;
    }

    static fromFirestore(
        doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    ): Product | null {
        const data = doc.data();

        if (!data) return null;

        return new Product({
            name: data['name'] ?? '',
            uuid: doc.id,
            isActive: data['isActive'] ?? false,
            images: data['images'] ?? [],
            timestampAdded: new Date(),
        });
    }

    toJson(x: Product): Record<string, any> {
        return {
            name: x.name,
            uuid: x.uuid,
            isActive: x.isActive,
            images: x.images,
            timestampAdded: x.timestampAdded,
        };
    }
}

interface IProduct {
    name: string;
    uuid: string;
    isActive: boolean;
    images: Array<string>;
    timestampAdded: Date;
}
