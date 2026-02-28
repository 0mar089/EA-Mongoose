import { ProductModel, IProduct } from '../product.js';

export const ProductService = {

    // Crea y guarda el nuevo producto en la base de datos
    async create(productData: IProduct) {
        const newProduct = new ProductModel(productData);
        return await newProduct.save(); // .save() valida y guarda el documento
    },

    // Obtener el producto por su id
    async getById(id: string) {
        return await ProductModel.findById(id).populate('organization'); // .populate() se usa para que en vez de poner ObjectID ponga los datos de ese ObjectID (en este caso los datos de la organizacion)
    },

    // Actualizar un producto por su id
    async update(id: string, updateData: IProduct) {
        return await ProductModel.findByIdAndUpdate(id, updateData, { new: true }); // {new: true } sirve para que en vez de devolver el documento original, devuelva el documento actualizado
    },


    // Eliminar un producto por su id
    async delete(id: string) {
        return await ProductModel.findByIdAndDelete(id);
    },

    // Listar todos los productos con .lean()
    async listAll() {
        return await ProductModel.find().lean();
    }
}

export default ProductService;
