import { UserModel } from "./user.model.js";
import { TaskModel } from "./task.model.js";
import { ProfileModel } from "./profile.model.js";
import { TagModel } from "./tag.model.js";

UserModel.hasMany(TaskModel, { foreignKey: "userId" });
TaskModel.belongsTo(UserModel, { foreignKey: "userId" });

UserModel.hasOne(ProfileModel, { foreignKey: "userId" });
ProfileModel.belongsTo(UserModel, { foreignKey: "userId" });

TaskModel.belongsToMany(TagModel, {
  through: "TaskTags",
  foreignKey: "taskId",
});
TagModel.belongsToMany(TaskModel, { through: "TaskTags", foreignKey: "tagId" });
