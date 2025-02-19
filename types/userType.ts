import { characterType } from "./characterType";

export type userType = {
    id: number | Date,
    email: string | null,
    name: string | null,
    selectedCharacter: characterType | null,
}