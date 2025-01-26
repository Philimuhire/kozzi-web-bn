import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { v4 as uuidv4 } from 'uuid';

class Product extends Model {
    public id!: string; 
    public name!: string;
    public categoryId!: string; 
    public price!: number;
    public description!: string;
    public imageUrl!: string; 
    public quantity!: number; 
    public createdAt!: Date;
    public updatedAt!: Date;
}

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID, 
        allowNull: false,
        references: {
            model: 'categories', 
            key: 'id',
        },
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
    },
}, {
    sequelize,
    tableName: 'products',
    timestamps: true, 
});

export default Product;