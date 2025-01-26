import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { v4 as uuidv4 } from 'uuid';

class Contact extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public phoneNumber!: string; 
    public message!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Contact.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'contacts',
    timestamps: true,
});

export default Contact;