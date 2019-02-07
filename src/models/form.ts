import Sequelize from "sequelize"
import { SequelizeAttributes } from "./index.d";
import { ResumeInstance, ResumeAttributes } from "./resume";

enum FormType {
  Short_Answer = "Short_Answer",
  Long_Answer = "Long_Answer",
  Selector = "Seletor",
  Upload = "Upload"
}

enum JobType {
  Developer = "Developer",
  Designer = "Designer"
}

export interface FormAttributes {
  id: number;
  job: JobType;
  question_num: number;
  description?: string;
  type: FormType;
  created_at: Date;
  updated_at: Date;
}

export interface FormInstance extends Sequelize.Instance<FormAttributes>, FormAttributes {
  getResume: Sequelize.HasManyGetAssociationsMixin<ResumeInstance>;
  setResume: Sequelize.HasManySetAssociationsMixin<ResumeInstance, ResumeInstance['id']>;
  addResume: Sequelize.HasManyAddAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  createResume: Sequelize.HasManyCreateAssociationMixin<ResumeAttributes, ResumeInstance>;
  removeResume: Sequelize.HasManyRemoveAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  hasResume: Sequelize.HasManyHasAssociationMixin<ResumeInstance, ResumeInstance['id']>;
};

export const FormFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<FormInstance, FormAttributes> => {
  const attributes: SequelizeAttributes<FormAttributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    job: {
      type: DataTypes.ENUM(JobType.Developer, JobType.Designer)
    },
    question_num: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM(FormType.Short_Answer, FormType.Long_Answer, FormType.Selector, FormType.Upload)
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  };
  const Form = sequelize.define<FormInstance, FormAttributes>('Form', attributes);
  Form.associate = models => {
    Form.hasMany(models.Resume, {foreignKey: 'form_id'});
  }
  return Form;
};