import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Cart extends Model {
    public id!: string; 
    public userId!: string; 
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cart.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  
        primaryKey: true,  
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    tableName: 'carts',
    timestamps: true, 
});

export default Cart;
