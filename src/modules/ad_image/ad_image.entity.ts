import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Ad } from '../ad/ad.entity';

@Table({ tableName: "ad_image"})
export class AdImage extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(64),
    unique: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Ad)
  @Column({
    field: 'ad_id',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  adId: string;

  @BelongsTo(() => Ad)
  ad: Ad;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  name: string;

  @Column({
    type: DataType.BLOB('long'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  data: Blob;

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
}