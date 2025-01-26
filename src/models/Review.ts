import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

class Review extends Model {
  public id!: string; 
  public productId!: string; 
  public userId!: string; 
  public rating!: number; 
  public comment!: string; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  }
);

export default Review;