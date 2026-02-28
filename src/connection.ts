import mongoose from 'mongoose';
import { ProductModel } from './product.js';
import { OrganizationModel } from './organization.js';
import { ProductService } from './Services/productServices.js';
import { Types } from 'mongoose';

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

        console.log("----------------Producto Creado----------------")

        const productoCreado = await ProductService.create({
            name: 'Laptop HP',
            price: 1200,
            organization: new Types.ObjectId(orgs[0]._id)
        });

        console.log(productoCreado);

        console.log("----------------Producto Actualizado----------------")

        const productoActualizado = await ProductService.update(productoCreado._id, { // Le cambiamos todo, he visto que se puede usar Partial para cambiar solo x cosa en concreto pero no lo uso
            name: 'MacBook Pro',  
            price: 2000,
            organization: new Types.ObjectId(orgs[1]._id)
        });

        console.log(productoActualizado);

        console.log("----------------Productos Listados----------------")

        const productosListados = await ProductService.listAll();

        console.log(productosListados);

        console.log("----------------Producto Eliminado----------------")

        const productoEliminado = await ProductService.delete(productoCreado._id);

        console.log(productoEliminado);

        console.log("----------------Producto Creado Otra Vez----------------")

        const productoCreadoDeNuevo = await ProductService.create({
            name: 'IPad Air',
            price: 1800,
            organization: new Types.ObjectId(orgs[1]._id)
        });

        console.log(productoCreadoDeNuevo);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('----------------Disconnected----------------');
    }
}

runDemo();