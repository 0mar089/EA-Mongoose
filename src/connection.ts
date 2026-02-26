import mongoose from 'mongoose';
import { ProductModel } from './product.js';
import { OrganizationModel } from './organization.js';
import { ProductService } from './Services/productServices.js';

async function runDemo() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/EA_ejercicio');
        console.log('----------------Connectedo----------------');

        await ProductModel.deleteMany({});
        await OrganizationModel.deleteMany({});
        console.log('----------------Database Limpiada----------------');

        const orgs = await OrganizationModel.insertMany([
            { name: 'HP Technology', country: 'USA' },
            { name: 'Apple Inc.', country: 'USA' }
        ]);

        const productoCreado = await ProductService.create({
            name: 'Laptop HP',
            price: 1200,
            organization: orgs[0]._id
        } as any);

        console.log('----------------Product Creado----------------');
        console.log(productoCreado);

        const productoGeteado = await ProductService.getById(productoCreado._id.toString());
        console.log('----------------Product Geteado----------------');
        console.log(productoGeteado);

        const productoActualizado = await ProductService.update(productoCreado._id.toString(), { price: 1500 });
        console.log('----------------Product Actualizado----------------');
        console.log(productoActualizado);

        const todosLosProductos = await ProductService.listAll();
        console.log('----------------Todos los Productos----------------');
        console.log(todosLosProductos);

        const productoEliminado = await ProductService.delete(productoCreado._id.toString());
        console.log('----------------Product Eliminado----------------');
        console.log(productoEliminado);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('----------------Disconnected----------------');
    }
}

runDemo();