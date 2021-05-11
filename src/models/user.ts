export class User implements IUser {
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isAdmin: boolean;
    timestampRegister: Date;
    uuid: string;
    profileImage: string;

    constructor(x: IUser) {
        this.email = x.email;
        this.firstName = x.firstName;
        this.lastName = x.lastName;
        this.isActive = x.isActive;
        this.isAdmin = x.isAdmin;
        this.timestampRegister = x.timestampRegister;
        this.uuid = x.uuid;
        this.profileImage = x.profileImage;
    }

    static fromFirestore(
        doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    ): User | null {
        const data = doc.data();

        if (!data) return null;

        return new User({
            email: data['email'] ?? '',
            firstName: data['firstName'] ?? '',
            lastName: data['lastName'] ?? '',
            isActive: data['isActive'] ?? false,
            isAdmin: data['isAdmin'] ?? false,
            timestampRegister: data['timestampRegister'] ?? '',
            uuid: doc.id,
            profileImage: data['profileImage'] ?? '',
        });
    }

    toJson(x: User): Record<string, any> {
        return {
            email: x.email,
            firstName: x.firstName,
            lastName: x.lastName,
            isActive: x.isActive,
            isAdmin: x.isAdmin,
            timestampRegister: x.timestampRegister,
            uuid: x.uuid,
            profileImage: x.profileImage,
        };
    }
}

interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isAdmin: boolean;
    timestampRegister: Date;
    uuid: string;
    profileImage: string;
}
