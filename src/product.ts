import { Schema, model, Types } from 'mongoose';

export interface IProduct { // Es la interficie que define la estructura de un producto 
    _id?: string;
    name: string;
    price: number;
    organization: Types.ObjectId; // Referencia a la coleccion de organizaciones
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
});

export const ProductModel = model<IProduct>('Product', productSchema);

