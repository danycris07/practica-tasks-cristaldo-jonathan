import { UserModel } from "./user.model.js";
import { TaskModel } from "./task.model.js";
import { ProfileModel } from "./profile.model.js";
import { TagModel } from "./tag.model.js";

//onDelete sirve para boorar en cascada, osea si borro el usuario, borro todas sus tareas
UserModel.hasMany(TaskModel, { foreignKey: "userId", onDelete: "CASCADE" });
TaskModel.belongsTo(UserModel, { foreignKey: "userId" });

UserModel.hasOne(ProfileModel, { foreignKey: "userId", onDelete: "CASCADE" });
ProfileModel.belongsTo(UserModel, { foreignKey: "userId" });

TaskModel.belongsToMany(TagModel, {
  through: "TaskTags",
  foreignKey: "taskId",
  onDelete: "CASCADE",
});
TagModel.belongsToMany(
  TaskModel,
  {
    through: "TaskTags",
    foreignKey: "tagId",
    onDelete: "CASCADE",
  },
  { paranoid: true },
);
