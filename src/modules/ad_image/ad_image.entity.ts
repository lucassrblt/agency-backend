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
    field: 'annonce_id',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  annonceId: string;

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
}