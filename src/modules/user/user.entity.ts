import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRole } from './userRole';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(64),
    unique: true,
    allowNull: false,
  })
  id: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  email: string


  @Column({
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  password: string


  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER, // Optionnel: Définit un rôle par défaut
  })
  role: UserRole;

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