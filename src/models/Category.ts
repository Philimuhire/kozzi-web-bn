import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Category extends Model {
    public id!: string; 
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'categories',
    timestamps: true,
});

export default Category;