import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "./@types/sequelize.type";

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public category!: string;
  public publicationDate!: Date;
  public pages!: number;
  public price!: number;
  public inStock!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    sequelize, // Passing the `sequelize` instance is required
  }
);

export default Book;
