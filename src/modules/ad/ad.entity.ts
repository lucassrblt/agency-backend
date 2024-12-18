import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { AdMetadata } from '../ad_metadata/ad_metadata.entity';
import { AdImage } from '../ad_image/ad_image.entity';

enum AdType {
  SALE = 'VENTE',
  RENT = 'LOCATION',
}

@Table({
  tableName: 'ad',
})
export class Ad extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(64),
    unique: true,
    allowNull: false,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
    validate: {
      notEmpty: true
    }
  })
  title: string

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  description: string

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  price: number

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  zipcode: string

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  city: string

  @Column({
    type: DataType.ENUM(...Object.values(AdType)),
    allowNull: false,
    defaultValue: AdType.SALE,
  })
  type: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  squarefoot: number


  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @HasMany(() => AdImage)
  images: AdImage[];

  @HasOne(() => AdMetadata)
  metadata: AdMetadata;
}

