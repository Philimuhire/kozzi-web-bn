import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class CartItem extends Model {
    public id!: string; 
    public cartId!: string; 
    public productId!: string; 
    public quantity!: number; 
    public price!: number; 
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CartItem.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'carts', 
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, 
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false, 
    },
}, {
    sequelize,
    tableName: 'cart_items',
    timestamps: true,
});

export default CartItem;