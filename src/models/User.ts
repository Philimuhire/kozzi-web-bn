import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

class User extends Model {
  public id!: string; 
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User .init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'buyer', 
    },
  },
  {
    sequelize,
    modelName: 'User ',
    tableName: 'users',
  }
);

export default User;