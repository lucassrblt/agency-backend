import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Ad } from '../ad/ad.entity';
import { ENUM } from 'sequelize';
import { EnergyClass } from '../../interface/Ad.interface';



@Table({ tableName: "ad_metadata"})
export class AdMetadata extends Model {
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

  @Column({
    field: 'build_year',
    allowNull: false,
    type: DataType.INTEGER,
    validate: {
      notEmpty: true
    }
  })
  buildYear: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  floor: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  room: number;


  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  bedroom: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  bathroom: number;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  parking: boolean;


  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  toilet: number;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  cellar: boolean;

  @Column({
    field: 'energy_class',
    allowNull: false,
    type: DataType.ENUM(...Object.values(EnergyClass)),
  })
  energyClass: string;

  @Column({
    field: 'gas_class',
    allowNull: false,
    type: DataType.ENUM(...Object.values(EnergyClass)),
  })
  gasClass: string;

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