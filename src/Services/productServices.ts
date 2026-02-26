import { ProductModel, IProduct } from '../product.js';

export const ProductService = {

    // Crea y guarda el nuevo producto en la base de datos
    async create(productData: IProduct) {
        const newProduct = new ProductModel(productData);
        return await newProduct.save();
    },

    // Obtiene el producto por su id
    async getById(id: string) {
        return await ProductModel.findById(id).populate('organization').exec();
    },

    // Actualiza un producto por su id
    async update(id: string, updateData: Partial<IProduct>) {
        return await ProductModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    },

    // Elimina el producto por su id
    async delete(id: string) {
        return await ProductModel.findByIdAndDelete(id).exec();
    },

    // Lista todos los productos con .lean()
    async listAll() {
        return await ProductModel.find().lean().exec();
    }
}

export default ProductService;
